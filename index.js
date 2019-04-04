var _painter = document.getElementById('painter');
var ctx = _painter.getContext('2d');
var _color = document.getElementById('color');

var mode, mini_mode;
var curColor, backgroundColor, pencilWidth, shapeWidth, eraserWidth;
var startPoint, radius;

var imgArray, lastImg;

var barPencil, barEraser, barShape, barFont, text;
var selectFont;
var fontFace, fontSize, fontWeight, fontStyle;

function initCanvas() {
  mode = 1;
  mini_mode = 1;               // 畫筆為鉛筆
  ctx.lineCap = 'butt';        // 畫筆為平頭
  pencilWidth = 1;             // 畫筆寬度為 1
  shapeWidth = 3;              // 圖形寬度為 3
  eraserWidth = 3;             // 橡皮擦寬度為 3
  fontSize = 20;               // 字體 20px
  fontFace = 'sans-serif';     // 字型 sans-serif
  fontWeight = '300';            // 字重 300
  imgArray = new Array();
  lastImg = -1;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 800, 600);
  pushImg();                   // 推入空白畫布
  curColor = '#000000';
  ctx.strokeStyle = curColor;  // 畫筆顏色為黑色
  ctx.fillStyle = curColor;
  backgroundColor = '#FFFFFF'; // 畫布為白色

  // barPencil = document.getElementById('pencil-width');
  barEraser = document.getElementById('eraser-width');
  barShape = document.getElementById('shape-width');
  barFont = document.getElementById('font-size');
  text = document.getElementById('text');
  selectFont = document.getElementById('font-face');
  // barPencil.value = pencilWidth;
  barEraser.value = eraserWidth;
  barShape.value = shapeWidth;
  barFont.value = fontSize;

  fontStyle = 'oblique ' + String(fontSize) + 'px ' + fontFace;
  startPoint = {x: 100, y: 100};
}

// 初始化畫布狀態
initCanvas();

function pushImg() {
  lastImg++;
  if (lastImg < imgArray.length) imgArray.length = lastImg;
  imgArray.push(_painter.toDataURL());
}

async function showImg() {
  var canvasPic = new Image();
  canvasPic.src = imgArray[lastImg];
  canvasPic.onload = function () {
    ctx.clearRect(0, 0, _painter.width, _painter.height);
    ctx.drawImage(canvasPic, 0, 0);
  }
}

function undo() {
  if (lastImg > 0) {
    lastImg--;
    showImg();
  }
}

function redo() {
  if (lastImg < imgArray.length-1) {
    lastImg++;
    showImg();
  }
}

document.getElementById('upload-img').onchange = function(e) {
  var img = new Image();
  img.onload = draw;
  img.onerror = failed;
  console.log(this);
  img.src = URL.createObjectURL(this.files[0]);
  img.style.zIndex = -1;
};

function upload(e) {
  var img = new Image();
  img.onload = draw;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);
  img.style.zIndex = -1;
}
function draw() {
  this.height = _painter.height/2;
  this.width = _painter.width/2;
  ctx.drawImage(this,0, 0);
}
function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}

function download() {
  var image = _painter.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href=image;
}

function changeMode(m, n) {
  mode = m;
  mini_mode = n;
  switch(mode) {
    // pencil.
    case 1:
      ctx.strokeStyle = curColor;
      switch(mini_mode) {
        case 1:
          ctx.lineCap = 'butt';
          ctx.lineWidth = pencilWidth;
          _painter.style.cursor = 'url("assets/png/pencil.png"), auto';
        break;
        case 2:
          ctx.lineCap = 'round';
          ctx.lineWidth = 8;
          _painter.style.cursor = 'url("assets/png/marker.png"), auto';
        break;
      }
      break;
    case 2:
      switch(mini_mode) {
        case 1:
        ctx.strokeStyle = backgroundColor;
        ctx.lineWidth = eraserWidth;
        _painter.style.cursor = 'url("assets/png/eraser.png"), auto';
        break;
      }
      break;
    case 3:
    case 4:
    case 5:
      ctx.lineWidth = shapeWidth;
      ctx.fillStyle = curColor;
      _painter.style.cursor = 'pointer';
    break;
    case 6:
      _painter.style.cursor = 'text';
      createFont();
    break;
    case 10:
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, _painter.width, _painter.height);
      break;
  }
}

function changeColor(color) {
  curColor = color;
  if (mode !== 2) {
    ctx.strokeStyle = curColor;
    ctx.fillStyle = curColor;
  }
}

function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function modifyFont() {
  fontStyle = fontWeight + ' ' + String(fontSize) + 'px ' + fontFace;
  console.log(fontStyle);
}

barEraser.onchange = function() {
  eraserWidth = this.value;
  changeMode(mode, mini_mode);
}

barShape.onchange = function() {
  shapeWidth = this.value;
  changeMode(mode, mini_mode);
}

barFont.onchange = function() {
  fontSize = this.value;
  modifyFont();
}
selectFont.onchange = function() {
  fontFace = this.value;
  modifyFont();
}

function createFont() {
  ctx.fillStyle = curColor;
  ctx.font = fontStyle;
  console.log(ctx.font);
  ctx.fillText(text.value, startPoint.x, startPoint.y);
  pushImg();
}

// 一旦移動滑鼠
async function mouseMove(evt) {
  var mousePos = getMousePos(_painter, evt);
  if (mode === 1 || mode === 2) pencil(mousePos);
  else if (mode === 3 || mode === 4 || mode === 5) await shape(mousePos);
};

// tools.

// 1. pencil
function pencil(mousePos) {
  if (mini_mode === 3) {
    var r = shapeWidth*8;
    ctx.lineWidth = 1;
    for (var i = 0; i < 5; i++) {
      var x = mousePos.x+Math.floor(Math.random() * r), y = mousePos.y+Math.floor(Math.random() * r);
      ctx.moveTo(x, y);
      ctx.arc(x, y, 1, 0, Math.PI*2, true);
      ctx.stroke();
    }
    Math.floor(Math.random() * r);
    return;
  }
  else if (mode === 2 && mini_mode === 2) {
    return;
  }
  // ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(mousePos.x, mousePos.y);
  ctx.stroke();
}

// 2. draw a circle
async function shape(mousePos) {
  radius = Math.sqrt((mousePos.x-startPoint.x)*(mousePos.x-startPoint.x) + (mousePos.y-startPoint.y)*(mousePos.y-startPoint.y));
  var canvasPic = new Image();
  canvasPic.src = imgArray[lastImg];
  canvasPic.onload = function () {
    return new Promise(function(resolve, reject) {
      ctx.drawImage(canvasPic, 0, 0);
      console.log('draw');
    })
  }
  ctx.beginPath();
  if (mode === 3) {
    ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI*2, true);
    if (mini_mode === 2) ctx.fill();
  } else if (mode === 4) {
    console.log(mini_mode);
    if (mini_mode === 1) ctx.strokeRect(Math.min(startPoint.x, mousePos.x), Math.min(startPoint.y, mousePos.y), Math.abs(startPoint.x - mousePos.x), Math.abs(startPoint.y - mousePos.y));
    else ctx.fillRect(Math.min(startPoint.x, mousePos.x), Math.min(startPoint.y, mousePos.y), Math.abs(startPoint.x - mousePos.x), Math.abs(startPoint.y - mousePos.y));
  } else if (mode === 5) {
    var edge = radius * Math.sqrt(3) / 2;
    ctx.moveTo(startPoint.x, startPoint.y - radius);
    ctx.lineTo(startPoint.x + edge, startPoint.y + radius / 2);
    ctx.lineTo(startPoint.x - edge, startPoint.y + radius / 2);
    if (mini_mode === 2) ctx.fill();
  }
  ctx.closePath();
  setTimeout(() => { ctx.stroke(); }, 10);
  // ctx.stroke();
  console.log('out');
}

_color.addEventListener('mousedown',function(e) {
  if (e.target.className==="other-color") {
    changeColor(e.target.style.backgroundColor);
  }
})

// 監聽 canvas，一旦被按就啟動 mouseMove 的監聽
_painter.addEventListener('mousedown', function(evt) {
  startPoint = getMousePos(_painter, evt);
  evt.preventDefault();
  if (mode === 1 || mode === 2) {
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
  }
  _painter.addEventListener('mousemove', mouseMove, false);
});
_painter.addEventListener('mouseup', function(evt) {
  var mousePos = getMousePos(_painter, evt);
  if (mode === 2 && mini_mode === 2) {
    ctx.lineWidth = shapeWidth;
    ctx.strokeStyle = curColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
  }
  if (mode === 3 || mode === 4 || mode === 5) {
    ctx.beginPath();
    if (mode === 3) {
      ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI*2, true);
      if (mini_mode === 2) ctx.fill();
    }
    else if (mode === 4) {
      var left = Math.min(startPoint.x, mousePos.x);
      var right = Math.max(startPoint.x, mousePos.x);
      var top = Math.min(startPoint.y, mousePos.y);
      var bottom = Math.max(startPoint.y, mousePos.y);
      ctx.moveTo(left, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right, bottom);
      ctx.lineTo(left, bottom);
      if (mini_mode === 2) ctx.fill();
      // if (mini_mode === 1) ctx.strokeRect(Math.min(startPoint.x, mousePos.x), Math.min(startPoint.y, mousePos.y), Math.abs(startPoint.x - mousePos.x), Math.abs(startPoint.y - mousePos.y));
      // else ctx.fillRect(Math.min(startPoint.x, mousePos.x), Math.min(startPoint.y, mousePos.y), Math.abs(startPoint.x - mousePos.x), Math.abs(startPoint.y - mousePos.y));
    }
    else if (mode === 5) {
      var edge = radius * Math.sqrt(3) / 2;
      ctx.moveTo(startPoint.x, startPoint.y - radius);
      ctx.lineTo(startPoint.x + edge, startPoint.y + radius / 2);
      ctx.lineTo(startPoint.x - edge, startPoint.y + radius / 2);
      if (mini_mode === 2) ctx.fill();
    }
    ctx.closePath();
    ctx.stroke(); 
  }
  pushImg();
  radius = 0;
  // console.log(imgArray, lastImg);
  _painter.removeEventListener('mousemove', mouseMove, false);
}, false);