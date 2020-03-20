//creating canvas & getting context
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
const user = {
    x : canvas.width-100,
    y : canvas.height-100,
    width : 15,
    color : "White",
    angleOld : 0,
    angleNew : 0,
}
const shot = {
    x : "",
    y : "",
    angleOld : "",
    color:"",
    exists : false,
    ready : true,
    radius: 7,
    i : 1,
}
const ball = {
    x : 100,
    y : 100,
    radius : 20,
    color : "White",
    angleOld : 0,
    speed : 0.5,
    i : 0,
}
ball.angleOld = (Math.random()*Math.PI*2) % (2*Math.PI);
//draw functions 
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}
var colorI = 0;
function collision(){
    if((Math.abs(ball.x - shot.x) < ball.radius+shot.radius)&&(Math.abs(ball.y - shot.y) < ball.radius+shot.radius)&& shot.exists === true){
        shot.exists = false
        ball.radius = (Math.random()+1) * 10
        ball.angleOld = 2*Math.PI*Math.random()
        ball.speed = 0.5 + (Math.random()/2)
        ball.i = 1
        $("#scoreNumber").text((Number($("#scoreNumber").text())+1))
    }
}
function chooseColor(){
       let color = (colorI % 300 < 100) ? "#0028FB" : (colorI % 300 > 200) ? "#FFFD33" : "#FF3016"
       shot.color = color
       colorI++
}
var a = 0
function drawUser(x,y,b){
    user.angleOld = user.angleOld+b
    var context = canvas.getContext("2d");
    context.save()
    context.translate(x,y)
    let inX = ((ball.x+ball.raduis || ball.x - ball.radius) < 30) ? (((ball.x+ball.raduis || ball.x - ball.radius) > 0) ? true : false) : false
    console.log(inX)
    context.rotate(user.angleOld+ (2*Math.PI/3));
    context.beginPath();
    context.fillStyle = "#000000";
    let height = 30 * Math.cos(Math.PI / 6);
    context.moveTo(0, 0);
    context.lineTo(30, 0);
    context.lineTo(15, 0 - height/3)
    context.lineTo(15, 0 - height);
    context.closePath();
    context.fill();
    context.lineWidth = 1.5;
    context.strokeStyle = (shot.exists === true) ? "white": shot.color;
    context.stroke();
    context.restore();
    user.x += 0.5 * Math.cos(user.angleOld - Math.PI/2);
    user.y += 0.5 * Math.sin(user.angleOld - Math.PI/2);
    chooseColor()
    
}

function drawCircle(x, y, r){
    context.fillStyle = "black";
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.lineWidth = 1.5;
    context.strokeStyle = "white";
    context.closePath();
    context.fill();
    context.stroke();
}
function drawBall(x, y, r, color){
    if(ball.i % 2000 === 0){
        ball.angleOld = 2*Math.PI*Math.random()
        ball.speed = 0.5 + (Math.random()/2)
        ball.radius = (Math.random()+1) * 10
    }
    ball.i++
    context.fillStyle = "black";
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.lineWidth = 1.5;
    context.strokeStyle = "white";
    context.closePath();
    context.fill();
    context.stroke();
    ball.x += ball.speed * Math.cos(ball.angleOld - Math.PI/2);
    ball.y += ball.speed * Math.sin(ball.angleOld - Math.PI/2);
}
function drawShot(){
    if(shot.i>450){shot.radius -= shot.i/5000}
    if(shot.i%501 === 0){
        shot.exists = false;
        shot.i = 1
        shot.radius = 7
    }
    else if(shot.exists === true){
    shot.x += 1.5 * Math.cos(shot.angleOld - Math.PI/2);
    shot.y += 1.5 * Math.sin(shot.angleOld - Math.PI/2);
    context.fillStyle = "#000000"
    context.beginPath();
    context.arc(shot.x, shot.y, shot.radius, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
    context.lineWidth = 1.5;
    context.strokeStyle = shot.color;
    context.stroke();
    shot.i++
    if(shot.x > canvas.width + 7){
        shot.x = 0
    }
    else if(shot.x < -7){
        shot.x = canvas.width
    }
    else if(shot.y > canvas.height + 7){
        shot.y = -7
    }
    else if(shot.y < -7){
        shot.y = canvas.height
    }
}
}
function drawText(text,x, y, color){
    context.fillStyle = color;
    context.font = "75px arial";
    context.fillText(text, x, y);
}
function update(){
   if(user.y < -10){
       user.y = canvas.height
   }
   else if(user.y > canvas.height + 10){
       user.y = 0
   }
   else if(user.x > canvas.width + 10){
       user.x = 0
   }
   else if(user.x < -15){
       user.x = canvas.width
   }
   if(ball.y < -15){
       ball.y = canvas.height
   }
   else if(ball.y > canvas.height + 15){
       ball.y = 0
   }
   else if(ball.x > canvas.width + 15){
       ball.x = 0
   }
   else if(ball.x < -10){
       ball.x = canvas.width
   }
}
function render(){
drawRect(0, 0, canvas.width, canvas.height, "#000000'");
drawShot(shot.color);
drawUser(user.x, user.y,user.angleNew)
drawBall(ball.x, ball.y, ball.radius,)
collision()
}
function game(){
    render();
    update()
}
setInterval(game,)
document.addEventListener('keydown', keyPressed)
document.addEventListener('keyup', keyUp)
function keyPressed(e){
    key = e.key
    if (key == "a") {
        user.angleNew = -0.01;
        user.turning = true;
    }
    else if(key == "d"){
        user.angleNew = 0.01
        user.turnding = true;
    }
    else if(key == " ") {
    e.preventDefault();
    user.angleNew = 0
        if(shot.exists === false && user.angleNew === 0){
            shot.angleOld = user.angleOld
            shot.x = user.x
            shot.y = user.y
            shot.exists = true;
            shot.i = 1
        }
  }
}
function keyUp(){
    user.angleNew = 0;
}