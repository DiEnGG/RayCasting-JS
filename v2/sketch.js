var c;
var canvas;
var mouseX;
var mouseY;

var bordes = [
    { x1: 10, y1: 10, x2: 1270, y2: 10 },
    { x1: 1270, y1: 10, x2: 1270, y2: 710 },
    { x1: 1270, y1: 710, x2: 10, y2: 710 },
    { x1: 10, y1: 710, x2: 10, y2: 10 },
];

function setup() {
    c = document.getElementById("canvas");
    canvas = c.getContext("2d");

    //Bordes Random
    for (let i = 0; i < 5; i++) {
        let coord1 = coordRandom();
        let coord2 = coordRandom();
        bordes.push({ x1: coord1.x, y1: coord1.y, x2: coord2.x, y2: coord2.y });
    }
    draw();
    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        draw();
    });
}

function draw() {
    //Background
    setColor(0, 0, 0); //negro
    drawRect(0, 0, 1280, 720);

    for (let l of bordes) {
        setColor(255, 255, 255); //blanco
        drawLine(l.x1, l.y1, l.x2, l.y2);
    }

    //Circulo
    setColor(255, 255, 255);
    drawCircle(mouseX - 7, mouseY - 7, 10, 0, 2);

    let grados = 0;
    for (let i = 0; i < 360; i++) {
        let closest = null;
        let record = Infinity;
        let posicion = { x: mouseX, y: mouseY };
        let direccion = vectorFromAngle(angleToRadians(grados));
        for (let linea of bordes) {
            const pt = calcularInterseccion(linea, posicion, direccion);
            if (pt) {
                const d = calcularDistancia(posicion, pt);
                if (d < record) {
                    record = d;
                    closest = pt;
                }
            }
        }
        if (closest) {
            setColor(255, 255, 255);
            drawLine(posicion.x, posicion.y, closest.x, closest.y);
        }
        grados += 1;
    }
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

function calcularDistancia(firstPoint, secondPoint) {
    let d;
    d = Math.sqrt(
        Math.pow(firstPoint.x - secondPoint.x, 2) +
        Math.pow(firstPoint.y - secondPoint.y, 2)
    );
    return d;
}

function angleToRadians(angle) {
    let radians = (angle * Math.PI) / 180;
    return radians;
}

function vectorFromAngle(radians) {
    let vector = {
        x: Math.cos(radians),
        y: Math.sin(radians),
    };
    return vector;
}

function createVector() {
    return { x: null, y: null };
}

function calcularInterseccion(linea, posicion, direccion) {
    const x1 = linea.x1;
    const y1 = linea.y1;
    const x2 = linea.x2;
    const y2 = linea.y2;

    const x3 = posicion.x;
    const y3 = posicion.y;
    const x4 = posicion.x + direccion.x;
    const y4 = posicion.y + direccion.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
        return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
        const pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);
        return pt;
    } else {
        return;
    }
}

function coordRandom() {
    let x = Math.round(Math.random() * (1270 - 10) + 10);
    let y = Math.round(Math.random() * (710 - 10) + 10);
    return { x, y };
}