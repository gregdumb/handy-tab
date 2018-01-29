//$("#root").html("DOM manipulated by jquery");
console.log("New tab page script running");

$("#settings-button").on("click", function() {
	chrome.tabs.update({url:'chrome://settings'});
});

$("#extensions-button").on("click", function() {
	chrome.tabs.update({url:'chrome://extensions'});
});

var defaultLinks = [{
    name: "Google",
    image: "https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
	href: "https://google.com"
}, {
    name: "Wikipedia",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png",
	href: "https://wikipedia.org"
}, {
	name: "Facebook",
	image: "https://cdn.worldvectorlogo.com/logos/facebook-2.svg",
	href: "https://facebook.com"
}];

/*chrome.storage.sync.set({'links': defaultLinks}, function() {
    console.log("Message saved");
});*/

buildLinks();

var links = null;
var currentLink = null;

function buildLinks() {
	$("#links").empty();
	chrome.storage.sync.get(['links'], function(result) {
		console.log(JSON.stringify(result.links));
		links = result.links;
		for(let i = 0; i < result.links.length; i++) {
			let href = result.links[i].href;
			let name = result.links[i].name;
	
			linkElement = $('<a/>', {
				href: href
			}).html(name);
	
			$("#links").append(createLink(result.links[i]));
		}
	});
}

function saveAndReloadLinks() {
	if(links != null) {
		chrome.storage.sync.set({links: links}, function() {
			links = null;
			buildLinks();
		});
	}
}

function createLink(linkData) {

	let marginDiv = $('<div/>', {class: "link-spacer"});
	
    let imageDiv = $('<div/>', {class: "link-div"})
    .css({
        "background-image": "url(\"" + linkData.image + "\")"
    });

    link = $('<a/>', {href: linkData.href});

	link.append(imageDiv);
	marginDiv.append(link);
	
	link.on("contextmenu", function(e) {
		e.preventDefault();
		console.log("Clicked", linkData.name);
		openModal(linkData);
	});
	
	console.log("Created link", linkData.image);
	
    return marginDiv;
}

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
	$("#modal").css({display: "block"});
}

function closeModal() {
	$("#modal").css({display: "none"});
}

// Close modal on background click
$("#modal").on("click", function(e) {
	if(e.target.id === "modal") {
		closeModal();
	}
});

$("#addlink-button").on("click", function(e) {
	openModal(null);
});

$("#input-submit").on("click", function() {
	newLink = {};
	newLink.name = $("#input-name").val();
	newLink.href = $("#input-href").val();
	newLink.image = $("#input-image").val();
	
	if(performValidation()) {
		if(currentLink) {
			// Edit current link
			console.log("Replacing", currentLink.name);
			console.log("with", newLink);
			currentLink.name = newLink.name;
			currentLink.href = newLink.href;
			currentLink.image = newLink.image;
		}
		else {
			// Create new link
			console.log("Would create", newLink);
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