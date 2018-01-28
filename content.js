//$("#root").html("DOM manipulated by jquery");
console.log("New tab page script running");

var defaultLinks = [{
    name: "Google",
    image: "https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
    href: "https://google.com"
}, {
    name: "Wikipedia",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png",
    href: "https://wikipedia.org"
}];

chrome.storage.sync.set({'links': defaultLinks}, function() {
    console.log("Message saved");
});

chrome.storage.sync.get(['links'], function(result) {
    console.log(result.links);
    for(let i = 0; i < result.links.length; i++) {
        let href = result.links[i].href;
        let name = result.links[i].name;

        linkElement = $('<a/>', {
            href: href
        }).html(name);

        $("#links").append(createLink(result.links[i]));
    }
});

function createLink(linkData) {

    outerDiv = $('<div/>', {class: "link-div"})
    .css({
        "background-image": "url(\"" + linkData.image + "\")"
    });

    link = $('<a/>', {href: linkData.href});

    image = $('<img/>', {
        src: linkData.image,
        class: 'link-img'
    });

    link.append(outerDiv);
    //outerDiv.append(link);
    return link;
}