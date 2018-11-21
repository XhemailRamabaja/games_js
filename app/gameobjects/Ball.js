class Ball {
    constructor(xPos, yPos, radius, speedX, speedY,context) {
        this.context = context;
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        this.xPos += this.speedX;
        this.yPos += this.speedY;
        this.context.beginPath();
        this.context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = "white";
        this.context.fill();
    }

    bounceHorizontally() {
        this.speedY *= -1;
    }

    bounceVertically() {
        this.speedX *= -1;
    }
    checkWallCollision(gameWidth,gameHeight) {
        var topWallHit = this.yPos - this.radius;
        var bottomWallHit = this.yPos + this.radius;
        var leftWallHit = this.xPos - this.radius;
        var rightWallHit = this.xPos + this.radius;
        
        if (bottomWallHit >= gameHeight || topWallHit <= 0) {
            this.bounceHorizontally();
        } else if (rightWallHit >= gameWidth || leftWallHit <= 0) {
            this.bounceVertically();
        }

    }
}
