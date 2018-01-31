
$("#settings-button").on("click", function() {
	chrome.tabs.update({url:'chrome://settings'});
});

$("#extensions-button").on("click", function() {
	chrome.tabs.update({url:'chrome://extensions'});
});

$("#history-button").on("click", function() {
    chrome.tabs.update({url:'chrome://history'});
});

$("#addlink-button").on("click", function(e) {
	openModal(null);
});