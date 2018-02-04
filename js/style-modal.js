
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
	$("#input-link-spacing").val(style.linkMargins);
	$("#input-image-padding").val(style.linkPadding);
	$("#input-num-columns").val(style.columns);
	$("#input-border-radius").val(style.linkBorderRadius);
	$("#input-row-height").val(style.rowHeight);
	$("#input-page-margins").val(style.pageMargins);
}

$("#input-link-spacing").on("input", function(e) {
    style.linkMargins = parseFloat(e.target.value);
    styleLinks();
});

$("#input-image-padding").on("input", function(e) {
    style.linkPadding = parseFloat(e.target.value);
    styleLinks();
});

$("#input-num-columns").on("input", function(e) {
	style.columns = parseFloat(e.target.value);
	styleLinks();
});

$("#input-border-radius").on("input", function(e) {
	style.linkBorderRadius = parseFloat(e.target.value);
	styleLinks();
});

$("#input-row-height").on("input", function(e) {
	style.rowHeight = parseFloat(e.target.value);
	styleLinks();
});

$("#input-page-margins").on("input", function(e) {
	style.pageMargins = parseFloat(e.target.value);
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
	/*let keys = Object.keys(defaults.layout);
	
	for(let i = 0; i < keys.length; i++) {
		let key = keys[i];
		style[key] = defaults.layout[key];
	}*/
	style = JSON.parse(JSON.stringify(defaults.layout));
	
	/*style.columns = defaults.columns;
	style.rowHeight = defaults.rowHeight;
	style.linkMargins*/
	
	styleLinks();
	initStyleInputs();
});