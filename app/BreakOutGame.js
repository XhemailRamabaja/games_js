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
    //BRICK
    var singleBrick;
    var spaceBetweenBricksX = 5;
    var spaceBetweenBricksY = 15;
    var brickXPos = 10;
    var brickYPos = 10;
    //PADDLE
    var paddleWidth = 60;
    var paddleHeight = 10;
    var paddleXPos;

    function privateDraw() {
        privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        for (var i = 0; i < bricks.length; i++) {
            bricks[i].draw();
        }
        paddle.updateXPos(paddleXPos);
        paddle.draw();
        window.requestAnimationFrame(privateDraw);
    }

    function privateSetContext(canvas) {
        privateCanvas = canvas;
        privateContext = canvas.getContext("2d");
    }

    function publicInit(canvas, difficulty) {
        privateSetContext(canvas);
        setBrickWall();
        paddle = new Paddle(privateContext, GAME_WIDTH, GAME_HEIGHT, paddleWidth, paddleHeight);
        canvas.addEventListener('mousemove', updatePaddlePosition);
        window.requestAnimationFrame(privateDraw);
    }
    
    //COLORED BRICKWALL
    function setBrickWall() {
        for (var i = 1; i <= BRICK_ROWS; i++) {
            brickXPos = 10;
            for (var j = 1; j <= BRICK_COLUMNS; j++) {
                singleBrick = new Brick(privateContext, brickXPos, brickYPos, getRowColor(i), BRICK_WIDTH, BRICK_HEIGHT);
                bricks.push(singleBrick);
                brickXPos = brickXPos + BRICK_WIDTH + spaceBetweenBricksX;
            }
            brickYPos = brickYPos + spaceBetweenBricksY;
        }
    }
    //MOUSE LISTENER
    function updatePaddlePosition(MouseEvent) {
        paddleXPos = MouseEvent.clientX - canvas.offsetLeft;
        console.log(paddleXPos);

    }
    //ROW COLORS
    function getRowColor(row) {
        if (row == 1 || row == 2) {
            return "red";
        } else if (row == 3) {
            return "yellow";
        } else if (row == 4) {
            return "orange";
        } else if (row == 5) {
            return "green";
        }
    }

    return {
        init: publicInit
    };
})();

var canvas = document.getElementById("breakoutcanvas");
breakOutGame.init(canvas);
