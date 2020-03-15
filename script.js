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
    a = a+b
    var context = canvas.getContext("2d");
    context.save()
    context.translate(x,y)
    context.rotate(a);
    context.beginPath();
    context.fillStyle = "#FFCC00";
    let height = 30 * Math.cos(Math.PI / 6);
    context.moveTo(0, 0);
    context.lineTo(0+30, 0);
    context.lineTo(0+15, 0 - height);
    context.closePath();
    context.fill();
    context.restore();
    user.x += 0.5 * Math.cos(a - Math.PI/2);
    user.y += 0.5 * Math.sin(a - Math.PI/2);
}

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.fillStyle = "#FFCC00";
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
    angle : 0,
}
const net = {
    x : canvas.width/2 - 2/2,
    y : 0,
    width : 3,
    height : 15,
    color : "White",
}
const ball = {
    x : 15,
    y : 15,
    radius : 15,
    speed : 7,
    color : "White",
    angle : 0,
}
function update(){
   if(user.y < -10){
       user.y = canvas.height
       console.log("a")
   }
   else if(user.y > canvas.height + 10){
       user.y = 0
       console.log("b")
   }
   else if(user.x > canvas.width + 10){
       user.x = 0
       console.log("c")
   }
   else if(user.x < -10){
       user.x = canvas.width
       console.log("daa")
   }
}
function render(){
drawRect(0, 0, canvas.width, canvas.height, "black");
drawUser(user.x, user.y,user.angle)
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
        user.angle = -0.008;
    }
    else if(key == "d"){
    user.angle = 0.008
    }
}
function keyUp(){
    user.angle = 0;
}