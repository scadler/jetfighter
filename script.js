//creating canvas & getting context
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
const user = {
    x : canvas.height/2,
    y : canvas.height/2,
    width : 15,
    color : "White",
    angleOld : 0,
    angleNew : 0,
    laser : "off",
}
const shot = {
    x : "",
    y : "",
    angleOld : "",
    color:"",
    exists : false,
    ready : true,
}
//draw functions 
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}
var colorI = 0
function chooseColor(){
       let color = (colorI % 300 < 100) ? "blue" : (colorI % 300 > 200) ? "yellow" : "red"
       shot.color = color
}
var a = 0
function drawUser(x,y,b){
    user.angleOld = user.angleOld+b
    var context = canvas.getContext("2d");
    context.save()
    context.translate(x,y)
    context.rotate(user.angleOld+ (2*Math.PI/3));
    context.beginPath();
    context.fillStyle = "#FFFFFF";
    let height = 30 * Math.cos(Math.PI / 6);
    context.moveTo(0, 0);
    context.lineTo(0+30, 0);
    context.lineTo(0+15, 0 - height);
    context.closePath();
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = (shot.exists === true || user.angleNew !== 0) ? "white" : shot.color;
    context.stroke();
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
function drawShot(color){
    shot.x += 1.5 * Math.cos(shot.angleOld - Math.PI/2);
    shot.y += 1.5 * Math.sin(shot.angleOld - Math.PI/2);
    context.fillStyle = color
    context.beginPath();
    context.arc(shot.x, shot.y, 7, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
    colorI++
    if(shot.x > canvas.width ||  shot.x < 0 || shot.y > canvas.height ||  shot.y < 0){
        shot.exists = false;
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
   else if(user.x < -10){
       user.x = canvas.width
   }
}
function render(){
drawRect(0, 0, canvas.width, canvas.height, "black");
// drawCircle(shot.x, shot.y, shot.radius, shot.color);
drawShot(shot.color);
drawUser(user.x, user.y,user.angleNew)
chooseColor()
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
        user.turning = true;
    }
    else if(key == "d"){
        user.angleNew = 0.008
        user.turning = true;
    }
    else if(key == " ") {
    e.preventDefault();
    user.angleNew = 0
        if(shot.exists === false && user.angleNew === 0){
            shot.angleOld = user.angleOld
            shot.x = user.x
            shot.y = user.y
            shot.exists = true;
            shot.ready = false;
        }
  }
}
function keyUp(){
    user.angleNew = 0;
}