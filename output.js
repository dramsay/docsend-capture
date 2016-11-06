function addScreenshots(screenshots) {
  var target = document.getElementById('target');
  for (var i = 0; i < screenshots.length; i++) {
    var img = document.createElement("img");
    img.setAttribute("src", screenshots[i]);
    img.setAttribute("style", "width: 100%");
    target.appendChild(img);
  }
}
