/* Paddle represents the players paddle used to deflect the ball in the game */
class Paddle {
    constructor(context, gameWidth, gameHeight, paddleWidth, paddleHeight) {
        this.context = context;
        this.xPos = (gameWidth / 2) - (paddleWidth / 2);
        this.width = paddleWidth;
        this.height = paddleHeight;
        this.yPos = gameHeight - 50;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    draw() {
        this.context.fillStyle = "white";
        this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
    updateXPos(mouseXPos) {
        var paddleMiddle = (this.width / 2);

        if (mouseXPos < this.gameWidth / 2) {
            if (mouseXPos - paddleMiddle >= 0) {
                this.xPos = mouseXPos - paddleMiddle;
            } else if (mouseXPos - paddleMiddle < 0) {
                var beyondsGameWidth = mouseXPos - paddleMiddle;
                this.xPos = mouseXPos - paddleMiddle - beyondsGameWidth;
            }
        } else if (mouseXPos > this.gameWidth / 2) {
            if (mouseXPos + paddleMiddle <= this.gameWidth) {
                this.xPos = mouseXPos - paddleMiddle;
            } else if (mouseXPos + paddleMiddle > this.gameWidth) {
                beyondsGameWidth = (mouseXPos + paddleMiddle) - this.gameWidth;
                this.xPos = mouseXPos - paddleMiddle - beyondsGameWidth;
            }
        }
    }
    checkBallCollision(ballXPos, ballYPos, ballRadius, ballSpeedY) {
        var hitPointX = ballXPos + ballRadius;
        var hitPointY = ballYPos + ballRadius + ballSpeedY;

        if (hitPointX >= this.xPos && hitPointX <= this.xPos + this.width) {
            if (hitPointY >= this.yPos && ballYPos < this.yPos) {
                return true;
            } else {
                return false;
            }
        }

    }
}
