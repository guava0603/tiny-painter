var container = document.getElementById('color');
var _painter = document.getElementById('painter');
var ctx = _painter.getContext('2d');

var colorId = ['black', 'red', 'red-2', 'green-2', 'green',' purple-2', 'purple', 'pink', 'blue-3',' yellow-2', 'blue', 'yellow', 'blue-2'];
var colorValues = [
  {r: 0, g: 0, b: 0}, {r: 255, g: 0, b: 0}, {r: 198, g: 123, b: 123}, {r: 123, g: 198, b: 123}, {r: 0, g: 255, b: 0},
  {r: 123, g: 123, b: 198}, {r: 123, g: 70, b: 123},{r: 255, g: 0, b: 255}, {r: 70, g: 123, b: 123},  {r: 123, g: 123, b: 70},
  {r: 0, g: 0, b: 255}, {r: 255, g: 255, b: 0},{r: 0, g: 255, b: 255}
]

for (var i = 0; i < colorValues.length; i++) {
  var ele = document.createElement("DIV");
  ele.style.display = 'flex';
  ele.style.flexDirection = 'row';
  ele.setAttribute('class', 'color ' + ele.id);
  ele.id = colorId[i];
  container.appendChild(ele);
  for (var j = 1; j< 4; j++) {
    var small = document.createElement("DIV");
    r = colorValues[i].r;
    g = colorValues[i].g;
    b = colorValues[i].b;
    small.style.width = '20%';
    small.style.height = '100%';
    small.style.background = 'rgb(' + (r / 4 * j) + ', ' + (g / 4 * j) + ', ' + (b / 4 * j);
    small.setAttribute('class', 'other-color');
    ele.appendChild(small);
  }
  for (var j = 0; j< 3; j++) {
    var small = document.createElement("DIV");
    r = colorValues[i].r;
    g = colorValues[i].g;
    b = colorValues[i].b;
    small.style.width = '20%';
    small.style.height = '100%';
    small.style.background = 'rgb(' + (r + (255 - r) / 3 * j) + ', ' + (g + (255 - g) / 3 * j) + ', ' + (b + (255 - b) / 3 * j);
    small.setAttribute('class', 'other-color');
    ele.appendChild(small);
  }
}

// var blackOne = document.getElementById('black');
// var startPos = blackOne.getClientRects().left;
// var width = blackOne.getClientRects().right - startPos;