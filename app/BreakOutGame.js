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
    var eliminatedBricks = [];
    //PADDLE
    var paddleWidth = 60;
    var paddleHeight = 15;
    var paddleXPos;

    var gameStop = false;

    function privateDraw() {
            privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            for (var i = 0; i < bricks.length; i++) {
                if (eliminatedBricks.includes(bricks[i]) != true) {
                    bricks[i].draw();
                } else {
                    continue;
                }
                if (bricks[i].checkBallCollision(ball.xPos, ball.yPos, ball.radius) == true) {
                    ball.bounceHorizontally();
                    eliminatedBricks.push(bricks[i]);
                }

            }
            drawPaddle();
            drawBall();
            checkIfGameLost();
            checkIfGameWon();
            if(gameStop != true){
               window.requestAnimationFrame(privateDraw);
            }
    }

    function checkIfGameWon() {
        if (eliminatedBricks.length == BRICK_ROWS * BRICK_COLUMNS) {
            privateContext.font = "30px Arial";
            privateContext.fillStyle = "green";
            privateContext.textAlign = "center";
            privateContext.fillText("Game Won!", GAME_WIDTH / 2, GAME_HEIGHT / 2);
            gameStop = true;
        }
    }

    function checkIfGameLost() {
        if (ball.yPos + ball.radius >= GAME_HEIGHT){
            privateContext.font = "30px Arial";
            privateContext.fillStyle = "green";
            privateContext.textAlign = "center";
            privateContext.fillText("Game Over. Please refresh for restart!", GAME_WIDTH / 2, GAME_HEIGHT / 2);
            gameStop = true;
        }
    }

    function privateSetContext(canvas) {
        privateCanvas = canvas;
        privateContext = canvas.getContext("2d");
    }

    function publicInit(canvas, difficulty) {
        privateSetContext(canvas);
        setBrickWall();
        paddle = new Paddle(privateContext, GAME_WIDTH, GAME_HEIGHT, paddleWidth, paddleHeight);
        ball = new Ball(GAME_WIDTH/2, GAME_HEIGHT/2, BALLSIZE, randomSpeed(difficulty), randomSpeed(difficulty), privateContext);
        canvas.addEventListener('mousemove', updatePaddlePosition);
        window.requestAnimationFrame(privateDraw);
    }

    function drawPaddle() {
        paddle.draw();
        paddle.updateXPos(paddleXPos);
        if (ball.yPos >= GAME_HEIGHT/2) {
            if (paddle.checkBallCollision(ball.xPos, ball.yPos, ball.radius, ball.speedY) == true) {
                ball.bounceHorizontally();
            }
        }
    }

    function drawBall() {
        ball.checkWallCollision(GAME_WIDTH, GAME_HEIGHT);
        ball.draw();
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
    }
    //RANDOM SPEED
    function randomSpeed(difficulty) {
        var minMax;
        switch(difficulty){
            case "Leicht":
                minMax = 1;
                break;
            case "Mittel":
                minMax = 3
                break;
            case "Schwer":
                minMax = 4;
                break;
        }
        return minMax;
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


(function () {
    var selectedDifficulty;
    var button = document.getElementById("startButton").addEventListener("click", getDifficulty);
    var canvas = document.getElementById("breakoutcanvas");
    canvas.style.borderColor = "black";

    function removeMenu() {
        var menu = document.getElementById("startMenu");
        menu.parentNode.removeChild(menu);
        canvas.style.borderColor = "white";
        breakOutGame.init(canvas, selectedDifficulty);
    }

    function getDifficulty() {
        selectedDifficulty = document.getElementById("levelOfDifficulty").value;
        removeMenu();
    }
})();
