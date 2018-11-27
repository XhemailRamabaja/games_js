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
    var STARS_QUANTITY = 250;
    var POWUP_WIDTH = 40;
    var POWUP_HEIGHT = 15;

    var bricks = [];
    var paddle;
    var ball;

    //#####ADDED VARS
    //BACKGROUND
    var stars = [];
    //BRICKS
    var singleBrick;
    var spaceBetweenBricksX = 5;
    var spaceBetweenBricksY = 15;
    var brickXPos = 10;
    var brickYPos = 10;
    var destroyedBricks = [];
    //PADDLE
    var paddleWidth = 60;
    var paddleHeight = 15;
    var paddleXPos;
    //GAME STATE
    var gameStop = false;
    //SCORE
    var score = 0;
    var points = 2;
    var scoreColor = "white";
    //POWERUPS
    var singlePowUp;
    var powUpTimer = 0;
    var timeStart = false;
    var powUpSignal = false;
    var changedSetting;

    function privateDraw() {
        drawBackground();
        drawPaddle();
        drawBall();
        checkIfGameLost();
        checkIfGameWon();
        for (var i = 0; i < bricks.length; i++) {
            if (destroyedBricks.includes(bricks[i]) != true) {
                bricks[i].draw();
            } else {
                continue;
            }
            if (bricks[i].checkBallCollision(ball.xPos, ball.yPos, ball.radius) == true) {
                score += points;
                speedUpGame(score);
                ball.bounceHorizontally();
                destroyedBricks.push(bricks[i]);
                checkForPowerUp(bricks[i].xPos, bricks[i].yPos);
            }
        }
        //POWERUP
        if (powUpSignal == true) {
            if (singlePowUp.yPos >= GAME_HEIGHT) {
                powUpSignal = false;
            } else {
                singlePowUp.draw();
            }
            if (singlePowUp.checkPaddleCollision(paddle.xPos, paddle.yPos, paddle.width) == true) {
                changedSetting = singlePowUp.powerUpType;
                manipulateGame(changedSetting);
                powUpSignal = false;
                timeStart = true;
            }

        }
        if (timeStart == true) {
            powUpTimer++;
        }
        if (powUpTimer == 1500) {
            resetSettings(changedSetting);
            timeStart = false;
            powUpTimer = 0;
        }
        displayScore(score);
        if (gameStop != true) {
            window.requestAnimationFrame(privateDraw);
        }
    }

    // EXTENSIONS ---------------------------
    //creates Powerup
    function checkForPowerUp(brickX, brickY) {
        //only creates powerups if there isnt on yet
        if (powUpSignal == false && timeStart == false) {
            var randomDecision1 = Math.floor(Math.random() * 8) + 1;
            var randomDecision2 = Math.floor(Math.random() * 8) + 1;
            var powerUpType = Math.floor(Math.random() * 4) + 1;
            
            if (randomDecision1 == randomDecision2) {
                singlePowUp = new Powerup(privateContext, powerUpType, brickX, brickY, POWUP_WIDTH, POWUP_HEIGHT);
                powUpSignal = true;
            }
        }
    }
    //manipulates Game through powerup
    function manipulateGame(setting) {
        switch (setting) {
            case 1:
                //bigger paddle
                paddle.width += 20;
                break;
            case 2:
                //smaller paddle
                paddle.width -= 15;
                break;
            case 3:
                //double points
                points = 4;
                scoreColor = "green";
                break;
            case 4:
                var length = destroyedBricks.length;
                for (var i = 0; i < length; i++) {
                    destroyedBricks.pop();
                }
                break;
        }
    }
    //resetSettings
    function resetSettings(setting) {
        switch (setting) {
            case 1:
                //reset size
                paddle.width -= 10;
                break;
            case 2:
                //smaller paddle
                paddle.width += 10;
                break;
            case 3:
                //double points
                points = 7;
                scoreColor = "white";
                break;
        }
    }

    function drawBackground() {
        privateContext.fillStyle = "black";
        privateContext.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        for (var i = 0; i < stars.length; i++) {
            stars[i].draw();
        }
    }
    //function call at publicInit()
    function setStars() {
        var randomX;
        var randomY;
        for (var i = 0; i < STARS_QUANTITY; i++) {
            randomX = Math.floor(Math.random() * GAME_WIDTH) + 1;
            randomY = Math.floor(Math.random() * GAME_HEIGHT) + 1;
            stars[i] = new Star(privateContext, randomX, randomY);
        }
    }

    function speedUpGame(score) {
        if (score == 42 || score == 102) {
            ball.color = "red";
            if (ball.speedX > 0) {
                ball.speedX++;
            } else {
                ball.speedX--;
            }
            if (ball.speedY > 0) {
                ball.speedY++;
            } else {
                ball.speedY--;
            }
        }
        if (score >= 42 && score < 102) {
            ball.color = "red";
        } else if (score >= 102 && score < 142) {
            ball.color = "orange";
        } else {
            ball.color = "white";
        }
    }

    function displayScore(score) {
        privateContext.font = "25px Arial";
        privateContext.fillStyle = scoreColor;
        privateContext.fillText(score, GAME_WIDTH - 40, GAME_HEIGHT - 10);
    }

    //EXTENSIONS END-----------------------------------------

    function checkIfGameWon() {
        if (destroyedBricks.length == BRICK_ROWS * BRICK_COLUMNS) {
            privateContext.font = "30px Arial";
            privateContext.fillStyle = "green";
            privateContext.textAlign = "center";
            privateContext.fillText("You won!", GAME_WIDTH / 2, GAME_HEIGHT / 2);
            scoreColor = "green";
            gameStop = true;
        }
    }

    function checkIfGameLost() {
        if (ball.yPos + ball.radius >= GAME_HEIGHT) {
            privateContext.font = "30px Arial";
            privateContext.fillStyle = "red";
            privateContext.textAlign = "center";
            privateContext.fillText("Game Over. Please refresh for restart!", GAME_WIDTH / 2, GAME_HEIGHT / 2);
            scoreColor = "red";
            gameStop = true;
        }
    }


    function drawPaddle() {
        paddle.draw();
        paddle.updateXPos(paddleXPos);
        if (ball.yPos >= GAME_HEIGHT / 2) {
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
    //GET SPEED BY LEVEL OF DIFFICULTY
    function getSpeed(difficulty) {
        var speed;
        switch (difficulty) {
            case "Easy":
                speed = 2;
                break;
            case "Normal":
                speed = 3;
                break;
            case "Hard":
                speed = 5;
                break;
        }
        return speed;
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

    function privateSetContext(canvas) {
        privateCanvas = canvas;
        privateContext = canvas.getContext("2d");
    }

    function publicInit(canvas, difficulty) {
        privateSetContext(canvas);
        setBrickWall();
        setStars();
        paddle = new Paddle(privateContext, GAME_WIDTH, GAME_HEIGHT, paddleWidth, paddleHeight);
        ball = new Ball(GAME_WIDTH / 2, GAME_HEIGHT / 2, BALLSIZE, getSpeed(difficulty), getSpeed(difficulty), privateContext);
        canvas.addEventListener('mousemove', updatePaddlePosition);
        window.requestAnimationFrame(privateDraw);
    }

    return {
        init: publicInit
    };
})();


(function () {
    var selectedDifficulty;
    var canvas = document.getElementById("breakoutcanvas");
    canvas.style.borderColor = "black";
    var button = document.getElementById("startButton").addEventListener("click", getDifficulty);

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
