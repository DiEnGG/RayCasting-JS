function calcDist(firstPoint, secondPoint) {
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

function calcIntersection(linea, posicion, direccion) {
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