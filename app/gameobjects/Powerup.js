class Powerup {
    constructor(context, type, xPos, yPos, width, height) {
        this.context = context;
        this.powerUpType = type;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.speed = 1;
    }
    draw() {
        this.update();
        this.context.fillStyle = "lightblue";
        this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
        this.context.font = "12px Arial";
        this.context.fillStyle = "red";
        this.context.fillText("???",this.xPos + 10,this.yPos + 10.5);
    }
    update() {
        this.yPos += this.speed;
    }

    checkPaddleCollision(paddleXPos, paddleYPos, paddleWidth) {
        if(this.xPos + this.width >= paddleXPos && this.xPos <= paddleXPos + paddleWidth){
           if(this.yPos + this.height >= paddleYPos){
              return true;
           }
        }else{
            return false;
        }
    }
}

