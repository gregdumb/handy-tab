
var style = null;

// Retrieve style from chrome sync, or from defaults if sync is empty
function getStyle(callback) {
	chrome.storage.sync.get(['style'], function(result) {
		callback((result.style != undefined) ? result.style : JSON.parse(JSON.stringify(defaults.layout)));
	});
}

function loadStyle() {
	getStyle(function(newStyle) {
		style = newStyle;
		applyStyle();
	});
}

function saveStyle() {
	if(style != null) {
		delete style.columns;
		delete style.rowHeight;
		delete style.linkMargins;
		delete style.linkPadding;
		delete style.linkBorderRadius;
		delete style.pageMargins;
		chrome.storage.sync.set({ style });
	}
}

// Apply style to link elements
function applyStyle() {
	
	console.log("Performing style with settings:", style);

	const bg = style.backgroundImage ? `url(${style.backgroundImage})` : 'none';
	
	$('body').css({
		'background-image': bg,
	});
}