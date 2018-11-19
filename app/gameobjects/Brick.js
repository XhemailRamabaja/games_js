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
        this.context.fillRect(this.xPos,this.yPos,this.width,this.height); 
    }
}
