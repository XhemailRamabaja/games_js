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
        //balls x&y-coords are closest edges by default, one of those default settings is always needed
        var closestXEdge = ballXPos;
        var closestYEdge = ballYPos;

        // which edge is closest?
        if (ballXPos < this.xPos){
            closestXEdge = this.xPos; // left edge
        }else if (ballXPos > this.xPos + this.width){
            closestXEdge = this.xPos + this.width; //right edge
        } 
        
        if (ballYPos < this.yPos){
             closestYEdge = this.yPos; //top edge
        }else if (ballYPos > this.yPos + this.height){
             closestYEdge = this.yPos + this.height; //bottom edge 
        }

        // get distance from closest edges 
        var distanceX = ballXPos - closestXEdge;
        var distanceY = ballYPos - closestYEdge;
        //Pythagorean theorem
        var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

        // if distance is less than balls radius -> COLLISON
        if (distance <= ballRadius) {
            return true;
        }else{
         return false;   
        }
    }
}



