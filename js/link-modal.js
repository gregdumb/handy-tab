
function openModal(linkData) {
	
	let title = "";
	
	if(linkData != null) {
		currentLink = linkData;
		initFields(linkData);
		title = "Edit";
	}
	else {
		currentLink = null;
		clearFields();
		title = "New";
	}
	
	clearValidation();
	$("#modal-title").html(title);
	$("#link-modal").css({display: "block"});
}

function closeModal() {
	$("#link-modal").css({display: "none"});
}

// Close modal on background click
$("#link-modal").on("click", function(e) {
	if(e.target.id === "link-modal") {
		closeModal();
	}
});

$("#input-submit").on("click", function() {
	newLink = {};
	newLink.name = $("#input-name").val();
	newLink.href = $("#input-href").val();
	newLink.image = $("#input-image").val();
	
	if(performValidation()) {
		if(currentLink) {
			// Edit current link
			currentLink.name = newLink.name;
			currentLink.href = newLink.href;
			currentLink.image = newLink.image;
		}
		else {
			// Create new link
			if(links != null) {
				links.push(newLink);
			}
		}
		
		saveAndReloadLinks();
		closeModal();
	}
});

$("#input-delete").on("click", function() {
	if(currentLink != null) {
		let index = links.indexOf(currentLink);
		if(index != -1) {
			console.log("Deleting at", index);
			links.splice(index, 1);
		}
		
		saveAndReloadLinks();
		closeModal();
	}
});

function performValidation() {
	var valid = true;
	
	if($("#input-name").val() == "") {
		$("#input-name").addClass("validation-failed");
		valid = false;
	}
	if($("#input-href").val() == "") {
		$("#input-href").addClass("validation-failed");
		valid = false;
	}
	if($("#input-image").val() == "") {
		$("#input-image").addClass("validation-failed");
		valid = false;
	}
	
	return valid;
}

function clearValidation() {
	$("#input-name").removeClass("validation-failed");
	$("#input-href").removeClass("validation-failed");
	$("#input-image").removeClass("validation-failed");
}

function clearFields() {
	$("#input-name").val("");
	$("#input-href").val("");
	$("#input-image").val("");
}

function initFields(linkData) {
	$("#input-name").val(linkData.name);
	$("#input-href").val(linkData.href);
	$("#input-image").val(linkData.image);
}