var links = null;
var currentLink = null;

buildLinks();

// Retrieve links from chrome sync, or from defaults if sync is empty
function getLinks(callback) {
	chrome.storage.sync.get(['links'], function(result) {
		callback((result.links != undefined) ? result.links : defaults.links);
	});
}

// Create link elements on DOM
function buildLinks() {
	$("#links").empty();
	getLinks(function (newLinks) {
		links = newLinks;

		for(let i = 0; i < newLinks.length; i++) {
			$("#links").append(createLink(newLinks[i]));
		}

		styleLinks();
	});
}

// Apply style to link elements
function styleLinks() {

	let columnWidth = (100 / defaults.layout.columns) + "%";
	let rowHeight = defaults.layout.rowHeight + "em";

	console.log("Margin", defaults.layout.linkMargin);

	$(".link-spacer").css({
		width: columnWidth,
		height: rowHeight,
		padding: defaults.layout.linkMargin + "em"
	});

	$(".link-div").css({
		'border-width': defaults.layout.linkPadding + "em"
	});
}

// Apply changes made to global 'links' variable
function saveAndReloadLinks() {
	if(links != null) {
		chrome.storage.sync.set({links: links}, function() {
			links = null;
			buildLinks();
		});
	}
}

// Return a complete link element
function createLink(linkData) {
	
	let marginDiv = $('<div/>', {class: "link-spacer"});
	
    let imageDiv = $('<div/>', {class: "link-div"})
    .css({
        "background-image": "url(\"" + linkData.image + "\")"
	});
	
	if(linkData.image == "") {
		imageDiv.append($("<p/>", {class: "link-name"}).html(linkData.name));
	}

    link = $('<a/>', {href: linkData.href});

	link.append(imageDiv);
	marginDiv.append(link);
	
	link.on("contextmenu", function(e) {
		e.preventDefault();
		openLinkModal(linkData);
	});
	
    return marginDiv;
}