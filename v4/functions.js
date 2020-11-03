var playerX = 320;
var playerY = 180;
var initialAngle = 0;

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
    if (den === 0) {
        return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
        const pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);
        return pt;
    }
}

function coordRandom() {
    let x = Math.round(Math.random() * (630 - 10) + 10);
    let y = Math.round(Math.random() * (350 - 10) + 10);
    return { x, y };
}

function colorRandomRGB() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return { r, g, b };
}


function walk(keyPressed, walls) {

    let closestDistanceForward = Infinity;
    let closestDistanceBackward = Infinity;

    if (keyPressed === "ArrowLeft") {
        initialAngle -= 1.5;

    } else if (keyPressed === "ArrowRight") {
        initialAngle += 1.5;

    } else if (keyPressed === "ArrowUp") {
        for (let line of walls) {
            let forward = vectorFromAngle(angleToRadians(initialAngle + 45));
            let pt = calcIntersection(line, getPlayerPosition(), forward);
            if (pt) {
                let distForward = calcDist(getPlayerPosition(), pt);
                if (distForward < closestDistanceForward) {
                    closestDistanceForward = distForward;
                }
            }
        }
        if (closestDistanceForward > 10) {
            let move = vectorFromAngle(angleToRadians(initialAngle + 45));
            playerX += move.x * 2;
            playerY += move.y * 2;
        }

    } else if (keyPressed === "ArrowDown") {
        for (let line of walls) {
            let backward = vectorFromAngle(angleToRadians(initialAngle - 135));
            let pt = calcIntersection(line, getPlayerPosition(), backward);
            if (pt) {
                let distBackward = calcDist(getPlayerPosition(), pt);
                if (distBackward < closestDistanceBackward) {
                    closestDistanceBackward = distBackward;
                }
            }
        }
        if (closestDistanceBackward > 10) {
            let move = vectorFromAngle(angleToRadians(initialAngle + 45));
            playerX -= move.x * 2;
            playerY -= move.y * 2;
        }
    }
}

function getPlayerPosition() {
    return { x: playerX, y: playerY };
}