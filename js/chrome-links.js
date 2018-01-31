
$("#settings-button").on("click", function() {
	chrome.tabs.update({url:'chrome://settings'});
});

$("#extensions-button").on("click", function() {
	chrome.tabs.update({url:'chrome://extensions'});
});

$("#history-button").on("click", function() {
    chrome.tabs.update({url:'chrome://history'});
});

$("#style-button").on("click", function() {
	openStyleModal();
});

$("#addlink-button").on("click", function(e) {
	openLinkModal(null);
});