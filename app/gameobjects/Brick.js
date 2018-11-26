class Brick {
    constructor(context, xPos, yPos, color, width, height) {
        this.context = context;
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
        this.width = width;
        this.height = height;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }

    checkBallCollision(ballXPos, ballYPos, ballRadius) {
        var collisionBottom = Math.abs((this.yPos + this.height) - ballYPos) < ballRadius;
        var collisionTop = Math.abs(ballYPos - this.yPos) < ballRadius;
        var collisionLeft = Math.abs(this.xPos - ballXPos) < ballRadius;
        var collisionRight = Math.abs((this.xPos + this.width) - ballXPos) < ballRadius;

        if ((ballXPos >= this.xPos) && (ballXPos <= this.xPos + this.width)) {
            if ((collisionTop && (ballYPos < this.yPos)) || (collisionBottom && (ballYPos > this.yPos + this.height))) {
                return true;
            } else {
                return false;
            }
        } else if ((ballYPos >= this.yPos) && (ballYPos <= this.yPos + this.height)) {
            if (collisionLeft || collisionRight) {
                return true;
            } else {
                return false;
            } 
        }else{
            return false;
        }
    }
}
