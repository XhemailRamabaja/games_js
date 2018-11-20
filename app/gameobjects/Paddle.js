/* Paddle represents the players paddle used to deflect the ball in the game */
class Paddle {
    constructor(context, canvasWidth, canvasHeight, paddleWidth, paddleHeight) {
        this.context = context;
        this.xPos = (canvasWidth / 2) - (paddleWidth / 2);
        this.width = paddleWidth;
        this.height = paddleHeight;
        this.yPos = canvasHeight - 40;
    }

    draw() {
        this.context.fillStyle = "white";
        this.context.fillRect(this.xPos, this.yPos, this.width, this.height);

    }

    updateXPos(xPos) {
        if (xPos + this.width <= 600){
            this.xPos = xPos;
        }
    }
}
