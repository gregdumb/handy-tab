import $ from 'jquery';
import defaults from './defaults';

var links = null;
var currentLink = null; 

import { linkStorage } from './storage';

export default class Links {

  static async buildLinks() {
    $('#links').empty();
    const newLinks = await linkStorage.get();
    console.log(newLinks);
    links = newLinks;

    for(let i = 0; i < newLinks.length; i++) {
      $('#links').append(createLink(newLinks[i]));
    }

    $('#links').append(createAddCard());
    
    // Styles will be applied after links are loaded
    loadStyle();
  }
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
  
  const card = $('<div/>', { class: 'link-slot link-card', title: linkData.name });

  const link = $('<a/>', { href: linkData.href, class: 'link-a' });
  
  if(linkData.image == '') {
    const text = $('<p/>', { class: 'link-text' }).html(linkData.name || link.data.href)
    link.append(text);
  }
  else {
    const image = $('<img/>', { src: linkData.image, class: 'link-img' });
    link.append(image);
  }

  card.append(link);
  
  card.on('contextmenu', function(e) {
    e.preventDefault();
    openLinkModal(linkData);
  });
  
    return card;
}

function createAddCard() {
  const card = $('<div>', { class: 'link-slot link-card', title: 'Add new link' });

  let plus = $('<i>', { class: 'fas fa-plus fa-5x link-plus' });

  card.append(plus);
  card.on('click', () => openLinkModal(null));

  return card;
}

window.exportLinks = function () {
  chrome.storage.sync.get(['links'], function(result) {
    console.log(result);
  });
}