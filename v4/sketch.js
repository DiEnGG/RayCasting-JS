var mouseX;
var mouseY;

var canvas3dView;
var canvasWidth;
var canvasHeight;
var canvasCenitalView;
var canvasWalls;

//Array with the walls
var walls = [
    { x1: 10, y1: 10, x2: 630, y2: 10, colorR: 255, colorG: 255, colorB: 255 },
    { x1: 630, y1: 10, x2: 630, y2: 350, colorR: 255, colorG: 255, colorB: 255 },
    { x1: 630, y1: 350, x2: 10, y2: 350, colorR: 255, colorG: 255, colorB: 255 },
    { x1: 10, y1: 350, x2: 10, y2: 10, colorR: 255, colorG: 255, colorB: 255 },
];

/**
 * Function called when the page is loaded,
 * Initialize everything for the app to work.
 */
function setup() {
    canvasWidth = 640;
    canvasHeight = 360;

    //Initialize the canvases.
    canvasWalls = new Canvas(document.getElementById("canvasWalls"), canvasWidth, canvasHeight);
    canvasCenitalView = new Canvas(document.getElementById("canvasCenitalView"), canvasWidth, canvasHeight);
    canvas3dView = new Canvas(document.getElementById("canvas3DView"), canvasWidth, canvasHeight);


    //detect when we make click in the canvasWalls , to draw a square in that coordinates.
    document.getElementById("canvasWalls").addEventListener("click", (event) => {
        mouseX = event.offsetX;
        mouseY = event.offsetY;

        let cRGB = colorRandomRGB();
        walls.push({ x1: mouseX - 10, y1: mouseY - 10, x2: mouseX + 10, y2: mouseY - 10, colorR: cRGB.r, colorG: cRGB.g, colorB: cRGB.b });
        walls.push({ x1: mouseX + 10, y1: mouseY - 10, x2: mouseX + 10, y2: mouseY + 10, colorR: cRGB.r, colorG: cRGB.g, colorB: cRGB.b });
        walls.push({ x1: mouseX + 10, y1: mouseY + 10, x2: mouseX - 10, y2: mouseY + 10, colorR: cRGB.r, colorG: cRGB.g, colorB: cRGB.b });
        walls.push({ x1: mouseX - 10, y1: mouseY + 10, x2: mouseX - 10, y2: mouseY - 10, colorR: cRGB.r, colorG: cRGB.g, colorB: cRGB.b });
    });

    //detect when we press a key, for make the player walk.
    document.addEventListener("keydown", (event) => {
        walk(event.code, walls);
    });
    //call the draw function 30 times per second.
    window.setInterval(function() {
        draw();
    }, 1000 / 30);
}

/**
 * Function called 30 times per second,
 * draw all the elements in the canvas.
 */
function draw() {

    //Draw a Black rectangle on canvasCenitalView and canvasWalls.
    canvasCenitalView.setColor(0, 0, 0);
    canvasCenitalView.drawRect(0, 0, canvasWidth, canvasHeight);
    canvasWalls.setColor(0, 0, 0);
    canvasWalls.drawRect(0, 0, canvasWidth, canvasHeight);

    //Draw all the lines on canvasCenitalView and canvasWalls.
    for (let w of walls) {
        canvasCenitalView.setColor(w.colorR, w.colorG, w.colorB);
        canvasCenitalView.drawLine(w.x1, w.y1, w.x2, w.y2);
        canvasWalls.setColor(w.colorR, w.colorG, w.colorB);
        canvasWalls.drawLine(w.x1, w.y1, w.x2, w.y2);
    }

    //Draw Player's Circle
    canvasCenitalView.setColor(255, 255, 255);
    canvasCenitalView.drawCircle(getPlayerPosition().x, getPlayerPosition().y, 10, 0, 2 * Math.PI);
    canvasWalls.setColor(255, 255, 255);
    canvasWalls.drawCircle(getPlayerPosition().x, getPlayerPosition().y, 10, 0, 2 * Math.PI);

    //Create all the rays and then draw them.
    let degrees = initialAngle; //start angle to draw the first ray.
    let amountRays = 360; // amount of rays.
    let angleOfView = 90; // angle at which rays will be drawn.
    let diffDegrees = angleOfView / amountRays; //How many degrees should each ray be drawn.
    for (let i = 0; i < amountRays; i++) {
        let wallWidth = Math.round((canvasWidth / amountRays) * i);
        let closest = null; //closest point between a wall and the player.
        let closestWall; // near wall based on the closest point.
        let record = Infinity; // the shortest distance.
        let position = getPlayerPosition(); //Player position
        let direction = vectorFromAngle(angleToRadians(degrees)); // direction of the ray.
        for (let line of walls) {
            const pt = calcIntersection(line, position, direction); // intersection point between a wall and a ray.
            if (pt) {
                const d = calcDist(position, pt); // distance between a wall and the player.
                if (d < record) {
                    record = d;
                    closest = pt;
                    closestWall = line;
                }
            }
        }
        if (record) {
            const FAR_DISTANCE = calcDist({ x: 0, y: 0 }, { x: canvasWidth, y: canvasHeight }); //calculate the farthest distance in the canvas.
            let wallHeight = (FAR_DISTANCE * 20 / record); //calculate the height of the wall.
            let coordWall = { y1: 180 - (wallHeight / 2), y2: wallHeight }; // coords of the wall to draw it in the canvas.

            //Draw the sky in canvas3dView.
            canvas3dView.setColor(0, 51, 102);
            canvas3dView.drawRect(wallWidth, 0, 2, 180);
            //Draw the floor in canvas3dView.
            canvas3dView.setColor(102, 51, 0);
            canvas3dView.drawRect(wallWidth, 180, 2, 360);
            //Draw the walls in canvas3dView.
            canvas3dView.setColor(closestWall.colorR, closestWall.colorG, closestWall.colorB);
            canvas3dView.drawRect(wallWidth, coordWall.y1, wallWidth + 2, coordWall.y2);

        }
        if (closest) {
            //Draw the white rays in canvasCenitalView
            canvasCenitalView.setColor(255, 255, 255);
            canvasCenitalView.drawLine(position.x, position.y, closest.x, closest.y);
        }
        degrees += diffDegrees; // increases the degrees to draw the others walls or rays.
        canvas3dView.drawCrossHair();
        canvas3dView.drawHand();
    }
}