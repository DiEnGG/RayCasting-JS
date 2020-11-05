/**
 * Canvas Class.
 */
class Canvas {
    /**
     * Constructor of class Canvas.
     * @param {Canvas} canvasElement html canvas element .
     * @param {Number} width width of the canvas.
     * @param {Number} height height of the canvas.
     */
    constructor(canvasElement, width, height) {

        this.width = width;
        this.height = height;

        this.canvasElement = document.getElementById(canvasElement.id);
        this.canvasContext = this.canvasElement.getContext('2d');
        canvasElement.width = width;
        canvasElement.height = height;

    }

    /**
     * Method to set the color to draw in the canvas.
     * @param {Number} r number between 0 and 255 (color red).
     * @param {Number} g number between 0 and 255 (color green).
     * @param {Number} b number between 0 and 255 (color blue).
     */
    setColor(r, g, b) {
        this.canvasContext.fillStyle = "rgb(" + r + ", " + g + "," + b + ")";
        this.canvasContext.strokeStyle = "rgb(" + r + ", " + g + "," + b + ")";
    }

    /**
     * Method draw a rectangle in the canvas.
     * @param {Number} x1 initial coord X.
     * @param {Number} y1 initial coord Y.
     * @param {Number} x2 width of the rectangle
     * @param {Number} y2 height of the rectangle.
     */
    drawRect(x1, y1, x2, y2) {
        this.canvasContext.fillRect(x1, y1, x2, y2);
    }

    /**
     * Method draw a line in the canvas.
     * @param {Number} x1 initial coord X.
     * @param {Number} y1 initial coord Y.
     * @param {Number} x2 final coord X.
     * @param {Number} y2 final coord Y.
     */
    drawLine(x1, y1, x2, y2) {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(x1, y1);
        this.canvasContext.lineTo(x2, y2);
        this.canvasContext.stroke();
    }

    /**
     * Method draw a circle in the canvas.
     * @param {Number} x1 initial coord X.
     * @param {Number} y1 initial coord Y.
     * @param {Number} r radius of the circle.
     * @param {Number} angle1 starting angle where the circle will start.
     * @param {Number} angle2 final angle where the circle ends.
     */
    drawCircle(x, y, r, angle1, angle2) {
        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, r, angle1, angle2);
        this.canvasContext.fill();
    }

    /**
     * Method draw a the hand with a pistol in the canvas.
     */
    drawHand() {
        this.setColor(253, 221, 202);
        this.drawCircle(320, 360, 50, 0, 2 * Math.PI);

        this.setColor(100, 100, 100);
        this.drawRect(300, 280, 40, 50);

    }

    /**
     * Method draw the crosshair in the canvas.
     */
    drawCrossHair() {
        this.setColor(0, 0, 0);
        this.drawLine(320, 170, 320, 190);
        this.drawLine(310, 180, 330, 180);
    }
}