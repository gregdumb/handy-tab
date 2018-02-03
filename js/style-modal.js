
/** Syncing */

//var style = defaults.layout;

/** ********* Modal ********* */

function openStyleModal() {
	$("#style-modal").css({display: "block"});
	initStyleInputs();
}

function closeStyleModal() {
    $("#style-modal").css({display: "none"});
}

$("#style-modal").on("click", function(e) {
	if(e.target.id === "style-modal") {
		closeStyleModal();
		saveStyle();
	}
});

/** ********* Input Form ********* */

function initStyleInputs() {
	$("#input-link-spacing").val(style.linkMargin);
	$("#input-image-padding").val(style.linkPadding);
	$("#input-num-columns").val(style.columns);
	$("#input-border-radius").val(style.linkBorderRadius);
	$("#input-row-height").val(style.rowHeight);
}

$("#input-link-spacing").on("input", function(e) {
    style.linkMargin = e.target.value;
    styleLinks();
});

$("#input-image-padding").on("input", function(e) {
    style.linkPadding = e.target.value;
    styleLinks();
});

$("#input-num-columns").on("input", function(e) {
	style.columns = e.target.value;
	styleLinks();
});

$("#input-border-radius").on("input", function(e) {
	style.linkBorderRadius = e.target.value;
	styleLinks();
});

$("#input-row-height").on("input", function(e) {
	style.rowHeight = e.target.value;
	styleLinks();
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
	styleLinks();
});