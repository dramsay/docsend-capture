var screenshots = [],
    activeTab;

// function openTargetTab(newUrl, targetId) {
//   chrome.tabs.create({url: newUrl}, function(tab) {
//     targetId = tab.id;
//   });
// }

function captureSlides(num_slides) {

}

chrome.browserAction.onClicked.addListener(function(tab) {
  alert("button clicked");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {message: "get_slides"}, function(num_slides) {
      alert("capturing " + num_slides + " slides");
      for (var i = 0; i < num_slides; i++) {
        chrome.tabs.sendMessage(activeTab.id, {message: 'next_slide', slide_index: i}, function() {
          chrome.tabs.captureVisibleTab(null, function(screenshotUrl) {
            screenshots.splice(i, 0, screenshotUrl);
          });
        });
        alert("" + i + ": " + screenshotUrl);
      }
      console.log(screenshots.join('\n'));
    });
  });
});
