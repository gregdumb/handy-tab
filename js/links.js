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
		
		// Styles will be applied after links are loaded
		loadStyle();
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
	
	let card = $('<div/>', {class: "link-card"});
	
    //let imageDiv = $('<div/>', {class: "link-div"})
    //.css({
    //    "background-image": "url(\"" + linkData.image + "\")"
	//});

	const link = $('<a/>', { href: linkData.href, class: 'link-a' });
	const image = $('<img/>', { src: linkData.image, class: 'link-img' });
	
	if(linkData.image == "") {
		link.append($("<p/>", {class: "link-text"}).html(linkData.name || link.data.href));
	}
	else {
		link.append(image);
	}

	card.append(link);
	
	card.on("contextmenu", function(e) {
		e.preventDefault();
		openLinkModal(linkData);
	});
	
    return card;
}

