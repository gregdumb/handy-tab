
$('#settings-button').on('click', () => {
  chrome.tabs.update({url:'chrome://settings'});
});

$('#extensions-button').on('click', () => {
  chrome.tabs.update({url:'chrome://extensions'});
});

$('#history-button').on('click', () => {
  chrome.tabs.update({url:'chrome://history'});
});

$('#style-button').on('click', () => {
  openStyleModal();
});

$('#addlink-button').on('click', e => {
  openLinkModal(null);
});