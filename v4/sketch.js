var mouseX = 320;
var mouseY = 180;
var initialAngle = 0;

var canvas3dView;
var canvasWidth;
var canvasHeight;
var canvasCenitalView;


var walls = [
    { x1: 10, y1: 10, x2: 630, y2: 10, colorR: 255, colorG: 255, colorB: 255 },
    { x1: 630, y1: 10, x2: 630, y2: 350, colorR: 255, colorG: 255, colorB: 255 },
    { x1: 630, y1: 350, x2: 10, y2: 350, colorR: 255, colorG: 255, colorB: 255 },
    { x1: 10, y1: 350, x2: 10, y2: 10, colorR: 255, colorG: 255, colorB: 255 },
];

function setup() {
    canvasWidth = 640;
    canvasHeight = 360;
    canvasCenitalView = new Canvas(canvasWidth, canvasHeight, "viewCenital");
    canvas3dView = new Canvas(canvasWidth, canvasHeight, "view3d");

    //Random Walls
    for (let i = 0; i < 5; i++) {
        let coord1 = coordRandom();
        let coord2 = coordRandom();
        let cRGB = colorRandomRGB();
        walls.push({ x1: coord1.x, y1: coord1.y, x2: coord2.x, y2: coord2.y, colorR: cRGB.r, colorG: cRGB.g, colorB: cRGB.b });
    }

    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowLeft") {
            initialAngle -= 1.5;
        } else if (event.code === "ArrowRight") {
            initialAngle += 1.5;
        } else if (event.code === "ArrowUp") {
            let move = vectorFromAngle(angleToRadians(initialAngle + 45));
            mouseX += move.x * 2;
            mouseY += move.y * 2;
        } else if (event.code === "ArrowDown") {
            let move = vectorFromAngle(angleToRadians(initialAngle + 45));
            mouseX -= move.x * 2;
            mouseY -= move.y * 2;
        }
    });
    document.addEventListener("click", (event) => {
        //Nothing
    });

    window.setInterval(function() {
        draw();
    }, 1000 / 30);
}

function draw() {

    //Background (black - width:1280, height:720)
    canvasCenitalView.setColor(0, 0, 0);
    canvasCenitalView.drawRect(0, 0, canvasWidth, canvasHeight);

    //Container and Walls lines
    for (let w of walls) {
        canvasCenitalView.setColor(w.colorR, w.colorG, w.colorB); //white
        canvasCenitalView.drawLine(w.x1, w.y1, w.x2, w.y2);
    }

    //Player's Circle
    canvasCenitalView.setColor(255, 255, 255);
    canvasCenitalView.drawCircle(mouseX, mouseY, 10, 0, 2);

    //Ray's lines
    let degrees = initialAngle;
    let amountRays = 360;
    let angleOfView = 90;
    let diffDegrees = angleOfView / amountRays;
    for (let i = 0; i < amountRays; i++) {
        let wallWidth = Math.round((canvasWidth / amountRays) * i);
        let closest = null;
        let closestWall;
        let record = Infinity;
        let position = { x: mouseX, y: mouseY };
        let direction = vectorFromAngle(angleToRadians(degrees));
        for (let line of walls) {
            const pt = calcIntersection(line, position, direction);
            if (pt) {
                const d = calcDist(position, pt);
                if (d < record) {
                    record = d;
                    closest = pt;
                    closestWall = line;
                }
            }
        }
        if (record) {
            const FAR_DISTANCE = calcDist({ x: 0, y: 0 }, { x: 640, y: 360 });
            let wallHeight = (FAR_DISTANCE * 20 / record);
            let coordWall = { y1: 180 - (wallHeight / 2), y2: wallHeight };

            //Canvas 3D Sky
            canvas3dView.setColor(0, 51, 102);
            canvas3dView.drawRect(wallWidth, 0, 2, 180);
            //Canvas 3D Floor
            canvas3dView.setColor(102, 51, 0);
            canvas3dView.drawRect(wallWidth, 180, 2, 360);

            //Canvas 3D Walls
            canvas3dView.setColor(closestWall.colorR, closestWall.colorG, closestWall.colorB);
            canvas3dView.drawRect(wallWidth, coordWall.y1, wallWidth + 2, coordWall.y2);

        }
        if (closest) {
            //Canvas CenitalView Rays
            canvasCenitalView.setColor(255, 255, 255);
            canvasCenitalView.drawLine(position.x, position.y, closest.x, closest.y);
        }
        degrees += diffDegrees;
        canvas3dView.drawCrossHair();
        canvas3dView.drawHand();
    }
}