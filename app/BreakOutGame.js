/*
 * This is the main script for the breakout application.
 *
 * Mouse interaction is captured here and the animation loop runs here, so that
 * the game can be drawn. This is also a good place to calculate random speeds for the
 * ball.
 *
 */
var breakOutGame = (function () {

	// private vars and constants
    var privateContext;
	var privateCanvas;
    
	var GAME_WIDTH = 600;
	var GAME_HEIGHT = 500;
	var BRICK_ROWS = 5;
	var BRICK_COLUMNS = 13;
	var BALLSIZE = 10;
	var BRICK_WIDTH = 40;
	var BRICK_HEIGHT = 10;
    
	var bricks = [];
	var paddle;
	var ball;
    
    //Added variables
    var singleBrick;
    var spaceBetweenBricksX = 5;
    var spaceBetweenBricksY = 15;
    var xPos = 10;
    var yPos = 10;
    
	function privateDraw() {
        for(var i = 0;i < bricks.length;i++){
            bricks[i].draw();
        }
        window.requestAnimationFrame(privateDraw);
	}

	function privateSetContext(canvas) {
		privateCanvas = canvas;
		privateContext = canvas.getContext("2d");
	}

	function publicInit(canvas, difficulty) {
		privateSetContext(canvas);
        //SET BRICKWALL
        for(var i = 1;i <= BRICK_ROWS;i++){
            xPos = 10;
            for(var j = 1;j <= BRICK_COLUMNS;j++){
                singleBrick = new Brick(privateContext,xPos,yPos,getRowColor(i),BRICK_WIDTH,BRICK_HEIGHT);
                bricks.push(singleBrick);
                xPos = xPos + BRICK_WIDTH + spaceBetweenBricksX;
            }
            yPos = yPos + spaceBetweenBricksY;
        }
        
		window.requestAnimationFrame(privateDraw);
	}
    
    function getRowColor(row){
        if(row == 1 || row == 2){
           return "red";
        }else if(row == 3){
           return "yellow";
        }else if(row == 4){
           return "orange";
        }else if(row == 5){
           return "green";
        }
    }

	return {
		init: publicInit
	};
})();

var canvas = document.getElementById("breakoutcanvas");
breakOutGame.init(canvas);