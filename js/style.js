
var style = null;

console.log("STYLE RUNNING");

// Retrieve style from chrome sync, or from defaults if sync is empty
function getStyle(callback) {
	chrome.storage.sync.get(['style'], function(result) {
		callback((result.style != undefined) ? result.style : defaults.layout);
	});
}

function loadStyle() {
	getStyle(function(newStyle) {
		style = newStyle;
		styleLinks();
	});
}

function saveStyle() {
	if(style != null) {
		chrome.storage.sync.set({style: style}, function() {
			
		});
	}
}

// Apply style to link elements
function styleLinks() {
	
	let columnWidth = (100 / style.columns) + "%";
	let rowHeight = style.rowHeight + "em";
	let padding = style.linkMargin + "em";
	let borderWidth = style.linkPadding + "em";
	let borderRadius = style.linkBorderRadius + "em";

	$(".link-spacer").css({
		width: columnWidth,
		height: rowHeight,
		padding: padding
	});

	$(".link-div").css({
		'border-width': borderWidth,
		'border-radius': borderRadius
	});
}