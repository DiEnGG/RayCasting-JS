var mouseX;
var mouseY;

var bordes = [
    { x1: 10, y1: 10, x2: 1270, y2: 10 },
    { x1: 1270, y1: 10, x2: 1270, y2: 710 },
    { x1: 1270, y1: 710, x2: 10, y2: 710 },
    { x1: 10, y1: 710, x2: 10, y2: 10 },
];

function setup() {
    createCanvas(1280, 720);

    //Random Walls
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

    //Background (black - width:1280, height:720)
    setColor(0, 0, 0);
    drawRect(0, 0, 1280, 720);

    //Container and Walls lines
    for (let l of bordes) {
        setColor(255, 255, 255); //white
        drawLine(l.x1, l.y1, l.x2, l.y2);
    }

    //Mouse's Circle
    setColor(255, 255, 255);
    drawCircle(mouseX - 7, mouseY - 7, 10, 0, 2);

    //Ray's lines
    let grados = 0;
    for (let i = 0; i < 360; i++) {
        let closest = null;
        let record = Infinity;
        let posicion = { x: mouseX, y: mouseY };
        let direccion = vectorFromAngle(angleToRadians(grados));
        for (let linea of bordes) {
            const pt = calcIntersection(linea, posicion, direccion);
            if (pt) {
                const d = calcDist(posicion, pt);
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