var viewer = document.getElementById('viewer'),
    slides = viewer.getElementsByClassName('item');

console.log("in content.js: " + slides.length);
slides;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var domInfo = {
      total:   document.querySelectorAll('*').length,
      inputs:  document.querySelectorAll('input').length,
      buttons: document.querySelectorAll('button').length
    };

    // Directly respond to the sender (popup),
    // through the specified callback */
    response(domInfo);
  }
});
