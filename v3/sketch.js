var mouseX = 320;
var mouseY = 180;
var grados = 0;
var c3d;
var canvas3d;

var bordes = [
    { x1: 10, y1: 10, x2: 630, y2: 10 },
    { x1: 630, y1: 10, x2: 630, y2: 350 },
    { x1: 630, y1: 350, x2: 10, y2: 350 },
    { x1: 10, y1: 350, x2: 10, y2: 10 },
];

function setup() {
    createCanvas(640, 360);
    c3d = document.getElementById("view3d");
    canvas3d = c3d.getContext("2d");

    //Random Walls
    for (let i = 0; i < 5; i++) {
        let coord1 = coordRandom();
        let coord2 = coordRandom();
        bordes.push({ x1: coord1.x, y1: coord1.y, x2: coord2.x, y2: coord2.y });
    }

    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowLeft") {
            grados -= 1.5;
        } else if (event.code === "ArrowRight") {
            grados += 1.5;
        } else if (event.code === "ArrowUp") {
            let move = vectorFromAngle(angleToRadians(grados + 45));
            mouseX += move.x * 2;
            mouseY += move.y * 2;
        } else if (event.code === "ArrowDown") {
            let move = vectorFromAngle(angleToRadians(grados + 45));
            mouseX -= move.x * 2;
            mouseY -= move.y * 2;
        }
    });

    window.setInterval(function() {
        draw();
    }, 1000 / 30);
}

function draw() {
    //Background (black - width:1280, height:720)
    setColor(0, 0, 0);
    drawRect(0, 0, 1280, 720);

    //Canvas 3D View
    canvas3d.beginPath();
    canvas3d.fillStyle = "rgb(0,51,102)";
    canvas3d.fillRect(0, 0, 640, 180);

    canvas3d.beginPath();
    canvas3d.fillStyle = "rgb(102,51,0)";
    canvas3d.fillRect(0, 180, 640, 360);

    //Container and Walls lines
    for (let l of bordes) {
        setColor(255, 255, 255); //white
        drawLine(l.x1, l.y1, l.x2, l.y2);
    }

    //Mouse's Circle
    setColor(255, 255, 255);
    drawCircle(mouseX, mouseY, 10, 0, 2);

    //Ray's lines
    var barra = 0;
    let degrees = grados;
    let difGrados = 90 / 90;
    for (let i = 0; i < 90; i++) {
        let closest = null;
        let record = Infinity;
        let posicion = { x: mouseX, y: mouseY };
        let direccion = vectorFromAngle(angleToRadians(degrees));
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
        if (record) {
            let distanciaLejana = calcDist({ x: 0, y: 0 }, { x: 640, y: 360 });
            let bloqueAltura = (distanciaLejana * 50 / record) / (distanciaLejana * 50 / 360);
            let coordBloque = { x: 180 - bloqueAltura / 2, y: bloqueAltura };
            canvas3d.fillStyle = "rgb(0,153,0)";
            canvas3d.fillRect(barra, coordBloque.x, barra + 7.1, coordBloque.y);
            barra += 7.1;
        }
        if (closest) {
            setColor(255, 255, 255);
            drawLine(posicion.x, posicion.y, closest.x, closest.y);
        }
        degrees += difGrados;
    }
}