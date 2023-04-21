
var canvas = document.getElementById("snake");
var canvas2d = canvas.getContext("2d");
var gameEnded = false;

canvas.width = 500;
canvas.height = 500;
var snakeSegments = [];
var snakeLength = 1;
var snakeX = 0;
var snakeY = 0;
var directionX = 10;
var directionY = 0;

var dots = [];//food pieces
//to change X,Y position of the snake for every frame
function moveSnake(){
    snakeSegments.unshift({x: snakeX , y: snakeY});
    snakeX += directionX;
    snakeY += directionY;
    //clear the last snake segment as it moves
    while(snakeSegments.length > snakeLength){
        snakeSegments.pop();
    }
}
//Draw or redraw the snake
function drawSnake(){
    canvas2d.clearRect(0,0, canvas.width, canvas.height);
    canvas2d.fillStyle = "violet";
    for(var i=0;i < snakeSegments.length;i++){
        canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y ,10,10);
    }
}
function gameLoop(){
    moveSnake();
    drawSnake();
    spawnDots();
    checkCollision();
    if(!gameEnded){
        setTimeout(gameLoop,100); //game updates every 100 ms
    }
}
gameLoop();

document.onkeydown = function(event){
    switch(event.keyCode){
        case 37://left
            directionX = -10;
            directionY =0;
            break;
        case 38://up
            directionX = 0;
            directionY =-10;
            break;
        case 39://right
            directionX =10;
            directionY =0;
            break;
        case 40://down
            directionX =0;
            directionY =10;
            break;
    }
};
//To add the snake's food onto the canvas
function spawnDots(){
    if(dots.length < 10){
        var dotX = Math.floor(Math.random() * canvas.width);
        var dotY = Math.floor(Math.random() * canvas.height);
        dots.push({x: dotX, y: dotY});
    }
    //Draw the dots onto the canvas
    for(var i=0;i<dots.length;i++){
        canvas2d.fillStyle = "green";
        canvas2d.fillRect(dots[i].x, dots[i].y ,10,10);
    }
}
//to check the collision of the snake
function checkCollision(){
    for(var i=0;i< dots.length;i++){
        if(snakeX < dots[i].x + 10 && snakeX + 10 > dots[i].x && snakeY < dots[i].y +10 && snakeY + 10 > dots[i].y){
            snakeLength++;
            dots.splice(i,1);
        }
    }
    if(snakeX < -10 || snakeY < -10 || snakeX > canvas.width +10 || snakeY > canvas.height +10){
        gameOver();
    }
    //check if the snake hits its own tail
    for(var i=1;i<snakeSegments.length;i++){
        if(snakeX === snakeSegments[i].x && snakeY === snakeSegments[i].y){
            gameOver();
        }
    }
}
function gameOver(){
    setTimeout(function(){
        alert("Game over!");
    },500);
    gameEnded =true;
}