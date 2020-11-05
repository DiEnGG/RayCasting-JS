var playerX = 320; //coord X of player position.
var playerY = 180; // coord Y of player position.
var initialAngle = 0; // initial angle for draw rays.

/**
 * Vector Class.
 */
class Vector {
    /**
     * Constructor of class Vector.
     * @param {Number} x coord X.
     * @param {Number} y coord Y.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * Calculates the distance between two vectors.
 * @param { Vector } firstPoint first Vector.
 * @param { Vector } secondPoint last Vector.
 * @return { Number } distance between two vectors.
 */
function calcDist(firstPoint, secondPoint) {
    let d;
    d = Math.sqrt(
        Math.pow(firstPoint.x - secondPoint.x, 2) +
        Math.pow(firstPoint.y - secondPoint.y, 2)
    );
    return d;
}

/**
 * Transform degrees to radians.
 * @param {Number} angle angle in degrees.
 * @return {Number} angle in radians.
 */
function angleToRadians(angle) {
    let radians = (angle * Math.PI) / 180;
    return radians;
}

/**
 * Create a Vector from an angle in radians.
 * @param {Number} radians angle in radians.
 * @return {Vector} new vector based on angle.
 */
function vectorFromAngle(radians) {
    let vector = new Vector(
        Math.cos(radians),
        Math.sin(radians)
    );
    return vector;
}

/**
 * Calculate intersection point between two vectors.
 * @param {Object} line Object from the wall. 
 * @param {Vector} position Coordinates of the player.
 * @param {Vector} direction vector of the new direction.
 * @return {Vector} intersection point between position and line.
 */
function calcIntersection(line, position, direction) {
    const x1 = line.x1;
    const y1 = line.y1;
    const x2 = line.x2;
    const y2 = line.y2;

    const x3 = position.x;
    const y3 = position.y;
    const x4 = position.x + direction.x;
    const y4 = position.y + direction.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) {
        return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
        const pt = new Vector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);
        return pt;
    }
}

/**
 * Create a Vector with randoms coords.
 * @return {Vector} vector with random coords.
 */
function coordRandom() {
    let x = Math.round(Math.random() * (630 - 10) + 10);
    let y = Math.round(Math.random() * (350 - 10) + 10);

    return new Vector(x, y);
}

/**
 * Create a Random color.
 * @return {Object} Random color in RGB format.
 */
function colorRandomRGB() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return { r, g, b };
}

/**
 * Rotate or Move the Player when an ArrowKey is pressed.
 * @param {String} keyPressed 
 * @param {Array} walls 
 */
function walk(keyPressed, walls) {

    //
    if (keyPressed === "ArrowLeft") {
        initialAngle -= 1.5;

    } else if (keyPressed === "ArrowRight") {
        initialAngle += 1.5;

    } else if (keyPressed === "ArrowUp") {
        //Check the forward distance.
        let closestDistanceForward = Infinity;
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
        //If the forward distance is greater than 10, player moves.
        if (closestDistanceForward > 10) {
            let move = vectorFromAngle(angleToRadians(initialAngle + 45));
            playerX += move.x * 2;
            playerY += move.y * 2;
        }

    } else if (keyPressed === "ArrowDown") {
        //Check the backward distance.
        let closestDistanceBackward = Infinity;
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
        //If the backward distance is greater than 10, player moves.
        if (closestDistanceBackward > 10) {
            let move = vectorFromAngle(angleToRadians(initialAngle + 45));
            playerX -= move.x * 2;
            playerY -= move.y * 2;
        }
    }
}

/**
 * Get player position.
 * @return {Vector} player position.
 */
function getPlayerPosition() {
    return new Vector(playerX, playerY);
}