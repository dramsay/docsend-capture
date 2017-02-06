'use strict';

function getSlides() {
  try {
    var viewer = document.getElementById('viewer'),
        slides = viewer.getElementsByClassName('item');
    return slides;
  } catch(e) {
    return [];
  }
}

function dispatchMouseEvent(target, var_args) {
  var e = document.createEvent("MouseEvent");
  // If you need clientX, clientY, etc., you can call
  // initMouseEvent instead of initEvent
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};

function nextSlide(index) {
  console.log("capturing slide " + index);
  var nextBtn = document.getElementById('nextPageButton');
  dispatchMouseEvent(nextBtn, 'mouseover', true, true);
  dispatchMouseEvent(nextBtn, 'mousedown', true, true);
  dispatchMouseEvent(nextBtn, 'click', true, true);
  dispatchMouseEvent(nextBtn, 'mouseup', true, true);

  // var event = new MouseEvent('click', {
  //   view: window,
  //   bubbles: false,
  //   cancelable: true
  // });
  // var nextBtn = document.getElementById('nextPageButton');
  // var cancelled = !nextBtn.dispatchEvent(event);
  // if (cancelled) {
  //   // A handler called preventDefault.
  //   console.log("cancelled");
  // } else {
  //   // None of the handlers called preventDefault.
  //   console.log("not cancelled");
  // }
  // var slides = getSlides();
  // for (var i = 0; i < slides.length; i++) {
  //   slides[i].classList.remove('active');
  // }
  // slides[index].classList.add('active');
  return true;
}

console.log("HERE");

var myPort = chrome.runtime.connect();
var numSlides = getSlides().length;
//myPort.postMessage({numSlides: getSlides().length});
myPort.onMessage.addListener(function(msg) {
  if (msg.next_slide) {
    alert("next slide message received");
    if (msg.index < numSlides) {
      nextSlide(msg.index);
      myPort.postMessage({capture_slide: true, index: msg.index});
    } else {
      myPort.postMessage({generate_slideshow: true});
    }
  }
});
