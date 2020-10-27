bordes = [
    { x1: 10, y1: 10, x2: 1270, y2: 10 },
    { x1: 1270, y1: 10, x2: 1270, y2: 710 },
    { x1: 1270, y1: 710, x2: 10, y2: 710 },
    { x1: 10, y1: 710, x2: 10, y2: 10 },
];

function setup() {
    createCanvas(1280, 720);
    //Bordes Random
    for (let i = 0; i < 5; i++) {
        let coord1 = coordRandom();
        let coord2 = coordRandom();
        bordes.push({ x1: coord1.x, y1: coord1.y, x2: coord2.x, y2: coord2.y });
    }
}

function draw() {

    background(0);

    for (let l of bordes) {
        stroke(255);
        line(l.x1, l.y1, l.x2, l.y2);
    }

    circle(mouseX, mouseY, 25);

    stroke(255);

    let grados = 0;
    for (let i = 0; i < 360; i++) {
        let closest = null;
        let record = Infinity;
        let posicion = createVector(mouseX, mouseY);
        let direccion = p5.Vector.fromAngle(radians(grados));
        for (let linea of bordes) {
            const pt = calcularInterseccion(linea, posicion, direccion);
            if (pt) {
                const d = p5.Vector.dist(posicion, pt);
                if (d < record) {
                    record = d;
                    closest = pt;
                }
            }
        }
        if (closest) {
            stroke(255, 100);
            line(posicion.x, posicion.y, closest.x, closest.y);
        }
        grados += 1;
    }

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