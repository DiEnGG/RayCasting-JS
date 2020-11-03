class Canvas {
    constructor(canvasElement, width, height) {

        this.width = width;
        this.height = height;

        this.canvasElement = document.getElementById(canvasElement.id);
        this.canvasContext = this.canvasElement.getContext('2d');
        canvasElement.width = width;
        canvasElement.height = height;

    }


    setColor(r, g, b) {
        this.canvasContext.fillStyle = "rgb(" + r + ", " + g + "," + b + ")";
        this.canvasContext.strokeStyle = "rgb(" + r + ", " + g + "," + b + ")";
    }

    drawRect(x1, y1, x2, y2) {
        this.canvasContext.fillRect(x1, y1, x2, y2);
    }

    drawLine(x1, y1, x2, y2) {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(x1, y1);
        this.canvasContext.lineTo(x2, y2);
        this.canvasContext.stroke();
    }

    drawCircle(x, y, r, angle1, angle2) {
        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, r, angle1, angle2 * Math.PI);
        this.canvasContext.fill();
    }

    drawHand() {
        this.setColor(253, 221, 202);
        this.drawCircle(320, 360, 50, 0, 2);

        this.setColor(100, 100, 100);
        this.drawRect(300, 280, 40, 50);

    }

    drawCrossHair() {
        this.setColor(0, 0, 0);
        this.drawLine(320, 170, 320, 190);
        this.drawLine(310, 180, 330, 180);
    }
}