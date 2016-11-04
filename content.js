function getSlides() {
  var viewer = document.getElementById('myCarousel'),
      slides = viewer.getElementsByClassName('item');
  return slides;
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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "get_slides") {
      alert("getting slides");
      sendResponse(getSlides().length);
    } else if (request.message === "next_slide") {
      alert("next slide");
      nextSlide(request.slide_index)
    }
  }
);

console.log("aloha");
console.log(getSlides().length);
