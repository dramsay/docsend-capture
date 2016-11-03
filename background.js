// Listen for a click on the icon. On that click, take a screenshot.

var screenshots = []

function openTargetTab(newUrl, targetId) {
  chrome.tabs.create({url: newUrl}, function(tab) {
    targetId = tab.id;
  });
}

function captureSlide(viewTabUrl, targetId) {
  // alert(viewTabUrl);
  // chrome.tabs.captureVisibleTab(function(screenshotUrl) {
  //   screenshots.push(screenshotUrl);
  // });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var id = 234933;
  var viewTabUrl = chrome.extension.getURL('output.html?id=' + id);
  var targetId = null;

  openTargetTab(viewTabUrl, targetId);

  chrome.tabs.executeScript(null, {code: "var viewer = document.getElementById('viewer'), slides = viewer.getElementsByClassName('item');"}, function(slides) {
    for (var i = 0; i < slides.length; i++) {
      alert('slide: ' + slides[0].innerHTML);
      chrome.tabs.captureVisibleTab(function(screenshotUrl) {
        screenshots.push(screenshotUrl);
      });
    }
  });

  // chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
  //   // We are waiting for the tab we opened to finish loading.
  //   // Check that the tab's id matches the tab we opened,
  //   // and that the tab is done loading.
  //   if (tabId != targetId || changedProps.status != "complete")
  //     return;
  //
  //   // Passing the above test means this is the event we were waiting for.
  //   // There is nothing we need to do for future onUpdated events, so we
  //   // use removeListner to stop getting called when onUpdated events fire.
  //   chrome.tabs.onUpdated.removeListener(listener);
  //
  //   // Look through all views to find the window which will display
  //   // the screenshot.  The url of the tab which will display the
  //   // screenshot includes a query parameter with a unique id, which
  //   // ensures that exactly one view will have the matching URL.
  //   var views = chrome.extension.getViews();
  //   for (var i = 0; i < views.length; i++) {
  //     var view = views[i];
  //     if (view.location.href == viewTabUrl) {
  //       view.addScreenshotUrl(screenshots.join(''););
  //       break;
  //     }
  //   }
  // });
});
