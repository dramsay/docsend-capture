'use strict';

var activeTab, numSlides, myPort, screenshots = [];

function connected(p) {
  myPort = p;
  //myPort.postMessage({greeting: "hi there content script, from background!"});
  myPort.onMessage.addListener(function(m) {
    //console.log("In background script, received message from content script");
    if (m.capture_slide) {
      chrome.tabs.captureVisibleTab(function(screenshotUrl) {
        alert("capturing screenshot");
        screenshots.splice(m.index, 0, screenshotUrl);
        myPort.postMessage({next_slide: true, index: (m.index+1)});
      });
    } else if (m.generate_slideshow) {
      alert("About to capture " + screenshots.length + " slides");
      alert(screenshots.join("\n"));
    }
  });
}

chrome.runtime.onConnect.addListener(connected);

chrome.browserAction.onClicked.addListener(function() {
  myPort.postMessage({next_slide: true, index: 0});
});
