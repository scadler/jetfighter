//creating canvas & getting context
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

//draw functions 
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}
var a = 0
function drawUser(x,y,b){
    user.angleOld = user.angleOld+b
    var context = canvas.getContext("2d");
    context.save()
    context.translate(x,y)
    context.rotate(user.angleOld);
    if(user.laser === "on"){
        context.moveTo(0, 0);
        context.moveTo(15,-26);
        context.lineTo(15,-1000);
        context.lineWidth = 5;
        context.strokeStyle = "#0000FF";
        context.stroke();
        if(Math.abs(ball.y - ball.radius)>7.5){
            ball.color === "red"
        }
        console.log(user.x)
    }
    context.beginPath();
    context.fillStyle = "#FFCC00";
    let height = 30 * Math.cos(Math.PI / 6);
    context.moveTo(0, 0);
    context.lineTo(0+30, 0);
    context.lineTo(0+15, 0 - height);
    context.closePath();
    context.fill();
    
    context.restore();
    
    user.x += 0.5 * Math.cos(user.angleOld - Math.PI/2);
    user.y += 0.5 * Math.sin(user.angleOld - Math.PI/2);
}

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}
function drawText(text,x, y, color){
    context.fillStyle = color;
    context.font = "75px arial";
    context.fillText(text, x, y);
}
const user = {
    x : canvas.height/2,
    y : canvas.height/2,
    width : 15,
    color : "White",
    angleOld : 0,
    angleNew : 0,
    laser : "off",
}
const ball = {
    x : canvas.height/2,
    y : canvas.height/2,
    radius : 15,
    speed : 7,
    color : "White",
    angleOld : 0,
    angleNew : 0,
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
   else if(user.x < -10){
       user.x = canvas.width
   }
}
function render(){
drawRect(0, 0, canvas.width, canvas.height, "black");
drawCircle(ball.x, ball.y, ball.radius, ball.color);
drawUser(user.x, user.y,user.angleNew)
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
        user.angleNew = -0.008;
    }
    else if(key == "d"){
    user.angleNew = 0.008
    }
    else if(key == " ") {
    e.preventDefault();
        if(user.angleNew === 0){ 
            user.laser = "on";
        }
  }
}
function keyUp(){
    user.angleNew = 0;
    user.laser = "off"
}