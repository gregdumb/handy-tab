
/** Syncing */

var style = defaults.layout;

/** ********* Modal ********* */

function openStyleModal() {
    $("#style-modal").css({display: "block"});
}

function closeStyleModal() {
    $("#style-modal").css({display: "none"});
}

$("#style-modal").on("click", function(e) {
	if(e.target.id === "style-modal") {
		closeStyleModal();
	}
});

/** ********* Input Form ********* */

function initStyleInputs() {
    $("#input-link-spacing").val(style.linkMargin);
}

$("#input-link-spacing").on("input", function(e) {
    style.linkMargin = e.target.value;
    styleLinks();
});

$("#input-image-padding").on("input", function(e) {
    style.linkPadding = e.target.value;
    styleLinks();
});