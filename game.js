
const cvs = document.getElementById("breaker");
const ctx = cvs.getContext("2d");
cvs.style.border = "5px solid #f6E6f8";
ctx.globalCompositeOperation = 'destination-over'
ctx.fillStyle = "black";
ctx.fillRect(0, 0, cvs.width, cvs.height);
let life = 3;
ctx.lineWidth = 3;
const slider_width = 150;
const slider_height = 20;
const BALL_RADIUS = 13;
let leftArrow = false;
let rightArrow = false;
const slider = {
    x : cvs.width/2 - slider_width/2,
    y : cvs.height- slider_height,
    width : slider_width,
    height : slider_height,
    dx :7
}
function drawslider(){
    ctx.fillStyle = "#000";
    ctx.fillRect(slider.x, slider.y, slider.width, slider.height);
}
document.addEventListener("keydown", function(event){
   if(event.keyCode == 37){
       leftArrow = true;
   }else if(event.keyCode == 39){
       rightArrow = true;
   }
});
document.addEventListener("keyup", function(event){
   if(event.keyCode == 37){
       leftArrow = false;
   }else if(event.keyCode == 39){
       rightArrow = false;
   }
});
function moveslider(){
    if(rightArrow && (slider.x + slider.width < cvs.width)){
        slider.x += slider.dx;
    }else if(leftArrow && slider.x > 0){
        slider.x -= slider.dx;
    }
}
const ball = {
    x : cvs.width/2,
    y : slider.y - BALL_RADIUS,
    color: randomColor(),
    radius : BALL_RADIUS,
    speed : 4,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
}
function drawBall(){
    ctx.beginPath();
    
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
        ball.color = randomColor();
    }
    
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
        ball.color = randomColor();
    }
    
    if(ball.y + ball.radius > cvs.height){
        life--;
        resetBall();
    }
}
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = slider.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

function ballsliderCollision(){
    if(ball.x < slider.x + slider.width && ball.x > slider.x && slider.y < slider.y + slider.height && ball.y > slider.y){
        let collidePoint = ball.x - (slider.x + slider.width/2);
        collidePoint = collidePoint / (slider.width/2);
        let angle = collidePoint * Math.PI/3;
        ball.speed+=0.7;
        slider.dx+=0.7;
        ball.color = randomColor();
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}


const brick = {
    row : 3,
    column : 6,
    width : 75,
    height : 25,
    paddingleft : 50,
    paddingTop : 20,
    marginTop : 40,
    fillColor : "#9f1111",
    
}

let bricks = [];

function createBricks(){
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x : c * ( brick.paddingleft + brick.width ) + brick.paddingleft,
                y : r * ( brick.paddingTop + brick.height ) + brick.paddingTop ,
                status : true
            }
        }
    }
}

createBricks();
function drawBricks(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            if(b.status){
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);
                
            }
        }
    }
}
function ballBrickCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
                    ball.dy = - ball.dy;
                    ball.color = randomColor();
                    b.status = false;
                }
            }
        }
    }
}

function status(){
	if(life===3){	
     ctx.fillStyle = "#42d98f";
     ctx.font = "bolder 45px Germania One";
     ctx.fillText(`LIFE  ${life}`, cvs.width - 200, 80);
	}else if(life===2){
		ctx.fillStyle = "#308ceb";
     	ctx.font = "bolder 45px Germania One";
     	ctx.fillText(`LIFE  ${life}`, cvs.width - 200, 80);
	}else{
		ctx.fillStyle = "#eb3230";
     	ctx.font = "bolder 45px Germania One";
     	ctx.fillText(`LIFE  ${life}`, cvs.width - 200, 80);
	}
    
}
function draw(){
    drawslider();
   
    drawBall();
    drawBricks();
    status();
}

function update(){
    moveslider();
    
    moveBall();
    
    ballWallCollision();
    
    ballsliderCollision();
    ballBrickCollision();
}
alert("HELLO SPITians\nYOU MAY HAVE PLAYED BRICK BREAKER IN YOUR CHILDHOOD\nTHIS ONE IS NO DIFFERENT\nTHERE ARE NO LEVELS IN THIS GAME\nINSTEAD...EVERYTIME THE BALL HITS THE SLIDER,ITS VELOCITY INCREASES\nBUT DONT WORRY CUZ AT THE SAME TIME SPEED OF THE SLIDER WILL ALSO INCREASE GIVING YOU A FAIR CHANCE TO BREAK ALL THE BRICKS\nPRESS ENTER TO PLAY\nALL THE BEST");
function loop(){

    draw();
    
    update();
    setTimeout (function(){ctx.clearRect(0,0,cvs.width,cvs.height)},1) 
    var flag=0;
    for(let r =0;r<brick.row;r++){
    	for(let c=0;c<brick.column;c++){
    		if(bricks[r][c].status===true)
    			flag = 1;
    	}
    }
    if(flag===0){
    	alert("Congratulations you win");
    }
    else{
			if(life!=0){   
				    requestAnimationFrame(loop);
				}else{
				    alert("Game Over!!!")
				}
			}	
    }
    
loop();





















