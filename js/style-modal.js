
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

$("#input-link-spacing").on("input", function(e) {
    console.log(e.target.value);
    defaults.layout.linkMargin = e.target.value;
    styleLinks();
});