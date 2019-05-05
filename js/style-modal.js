/** ********* Modal ********* */

function openStyleModal() {
	$("#style-modal").css({visibility: 'visible', opacity: 1});
	initStyleInputs();
}

function closeStyleModal() {
    $("#style-modal").css({visibility: 'hidden', opacity: 0});
}

$("#style-modal").on("click", function(e) {
	if(e.target.id === "style-modal") {
		closeStyleModal();
		saveStyle();
	}
});

/** ********* Input Form ********* */

function initStyleInputs() {
	$('#input-bg').val(style.backgroundImage);
}

$('#input-bg').on('input', function(e) {
	style.backgroundImage = String(e.target.value).trim();
	applyStyle();
})

/** ********* Buttons ********* */

$("#input-apply-style").on("click", function() {
	closeStyleModal();
	saveStyle();
});

$("#input-cancel-style").on("click", function() {
	closeStyleModal();
	loadStyle();
});

$("#input-default-style").on("click", function() {
	
	style = JSON.parse(JSON.stringify(defaults.layout));
	
	applyStyle();
	initStyleInputs();
});