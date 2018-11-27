class Star {
    constructor(context, xPos, yPos) {
        this.context = context;
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = 1;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = color.createColor();
        this.context.fill();
    }
}

var color = (function () {
    
    function getColorComponents() {
        return Math.floor(Math.random() * 256);
    }

    function getTransparency() {
        return Math.random();
    }
    function createRandomColor() {
        var red = getColorComponents();
        var grün = getColorComponents();
        var blau = getColorComponents();
        var color = "rgb(" + red + "," + grün + "," + blau + ")";
        return color;
    }
    
    return{
      createColor:createRandomColor
    };
})();
