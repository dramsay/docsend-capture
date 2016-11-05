'use strict';

function getSlides() {
  try {
    var viewer = document.getElementById('myCarousel'),
        slides = viewer.getElementsByClassName('item');
    return slides;
  } catch(e) {
    return [];
  }
}

function nextSlide(index) {
  alert("capturing slide " + index);
  var slides = getSlides();
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  slides[index].classList.add('active');
  return true;
}

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
