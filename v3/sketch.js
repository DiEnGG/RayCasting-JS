var mouseX = 320;
var mouseY = 180;
var grados = 0;
var c3d;
var canvas3d;
var texto;
var barras = [];

var bordes = [
    { x1: 10, y1: 10, x2: 630, y2: 10, colorR: 255, colorG: 255, colorB: 255 },
    { x1: 630, y1: 10, x2: 630, y2: 350, colorR: 255, colorG: 255, colorB: 255 },
    { x1: 630, y1: 350, x2: 10, y2: 350, colorR: 255, colorG: 255, colorB: 255 },
    { x1: 10, y1: 350, x2: 10, y2: 10, colorR: 255, colorG: 255, colorB: 255 },
];

function setup() {
    createCanvas(640, 360);
    c3d = document.getElementById("view3d");
    canvas3d = c3d.getContext("2d");

    texto = document.getElementById("texto");

    //Random Walls
    for (let i = 0; i < 5; i++) {
        let coord1 = coordRandom();
        let coord2 = coordRandom();
        let cRGB = colorRandomRGB();
        bordes.push({ x1: coord1.x, y1: coord1.y, x2: coord2.x, y2: coord2.y, colorR: cRGB.r, colorG: cRGB.g, colorB: cRGB.b });
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
    document.addEventListener("click", (event) => {
        //Nothing
    });

    window.setInterval(function() {
        draw();
    }, 1000 / 15);
}

function draw() {
    barras = [];
    //Background (black - width:1280, height:720)
    setColor(0, 0, 0);
    drawRect(0, 0, 1280, 720);

    //Container and Walls lines
    for (let l of bordes) {
        setColor(l.colorR, l.colorG, l.colorB); //white
        drawLine(l.x1, l.y1, l.x2, l.y2);
    }

    //Mouse's Circle
    setColor(255, 255, 255);
    drawCircle(mouseX, mouseY, 10, 0, 2);

    //Ray's lines
    let degrees = grados;
    let difGrados = 90 / 360;
    for (let i = 0; i < 360; i++) {
        let barra = 2 * i;
        let closest = null;
        let wallClosest;
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
                    wallClosest = linea;
                }
            }
        }
        if (record) {
            const distanciaLejana = calcDist({ x: 0, y: 0 }, { x: 640, y: 360 });
            let bloqueAltura = (distanciaLejana * 20 / record);
            let coordBloque = { y1: 180 - (bloqueAltura / 2), y2: bloqueAltura };
            barras.push(barra);

            //Canvas 3D View
            //canvas3d.beginPath();
            canvas3d.fillStyle = "rgba(0,51,102)";
            canvas3d.fillRect(barra, 0, 2, 180);

            //canvas3d.beginPath();
            canvas3d.fillStyle = "rgba(102,51,0)";
            canvas3d.fillRect(barra, 180, 2, 360);

            canvas3d.beginPath();
            canvas3d.fillStyle = "rgba(" + wallClosest.colorR + "," + wallClosest.colorG + "," + wallClosest.colorB + ")";
            canvas3d.fillRect(barra, coordBloque.y1, barra + 2, coordBloque.y2);

        }
        if (closest) {
            setColor(255, 255, 255);
            drawLine(posicion.x, posicion.y, closest.x, closest.y);
        }
        degrees += difGrados;
    }
}