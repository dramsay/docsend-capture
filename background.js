var activeTab, numSlides, myPort, screenshots = [];

function connected(p) {
  myPort = p;
  myPort.postMessage({greeting: "hi there content script!"});
  myPort.onMessage.addListener(function(m) {
    console.log("In background script, received message from content script");
    if (m.greeting) {
      console.log(m.greeting);
    } else if (m.numSlides) {
      numSlides = msg.numSlides;
      console.log("received msg, slides: " + numSlides);
    }
  });
}

chrome.runtime.onConnect.addListener(connected);

chrome.browserAction.onClicked.addListener(function() {
  myPort.postMessage({greeting: "they clicked the button!"});
});
