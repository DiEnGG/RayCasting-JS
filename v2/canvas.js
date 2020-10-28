var c;
var canvas;

function createCanvas(width, heigh) {
    var element = document.createElement('canvas');

    element.id = "canvas";
    element.width = width;
    element.height = heigh;
    element.style.zIndex = 8;
    element.style.position = "absolute";
    element.style.border = "1px solid";

    document.getElementsByTagName("body")[0].appendChild(element);

    c = document.getElementById("canvas");
    canvas = c.getContext("2d");
}

function setColor(r, g, b) {
    canvas.fillStyle = "rgb(" + r + ", " + g + "," + b + ")";
    canvas.strokeStyle = "rgb(" + r + ", " + g + "," + b + ")";
}

function drawRect(x1, y1, x2, y2) {
    canvas.fillRect(x1, y1, x2, y2);
}

function drawLine(x1, y1, x2, y2) {
    canvas.beginPath();
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
    canvas.stroke();
}

function drawCircle(x, y, r, angle1, angle2) {
    canvas.beginPath();
    canvas.arc(x, y, r, angle1, angle2 * Math.PI);
    canvas.fill();
}