function addScreenshotUrl(url) {
  var target = document.getElementById('target');
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  target.appendChild(elem);
}
