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
}
const comp = {
    x : 100,
    y : 100,
    width : 15,
    color : "White",
    angleOld : 0,
    angleNew : 0,
}
comp.angleOld = (Math.random()*Math.PI*2) % (2*Math.PI);
console.log(comp.angleOld)
//draw functions 
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}
var shotI = 1;
var colorI = 0;
function chooseColor(){
       let color = (colorI % 300 < 100) ? "blue" : (colorI % 300 > 200) ? "yellow" : "red"
       shot.color = color
       colorI++
}
var a = 0
function drawUser(x,y,b){
    user.angleOld = user.angleOld+b
    var context = canvas.getContext("2d");
    context.save()
    context.translate(x,y)
    context.rotate(user.angleOld+ (2*Math.PI/3));
    context.beginPath();
    context.fillStyle = "#000000";
    let height = 30 * Math.cos(Math.PI / 6);
    context.moveTo(0, 0);
    context.lineTo(0+30, 0);
    context.lineTo(0+15, 0 - height);
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

function drawCircle(x, y, r, color){
    context.fillStyle = "black";
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.lineWidth = 1.5;
    context.strokeStyle = "white";
    context.closePath();
    context.fill();
    context.stroke();
}
var compI = 0
function drawComp(x,y){
    //need to get the angle that would allow the computer to point towards the white circle
    diffX = Math.abs(user.x-comp.x)
    diffY = Math.abs(user.y-comp.y) 
    C = Math.sqrt(diffX*diffX + diffY*diffY)
    predictedX = user.x + (C * 0.33 * Math.cos(user.angleOld - Math.PI/2));
    predictedY = user.y + (C * 0.33 * Math.sin(user.angleOld - Math.PI/2));
    // console.log(C +" c") 
    
    // var AB = Math.sqrt(Math.pow(comp.x-user.x,2)+ Math.pow(comp.y-user.y,2));    
    // var BC = Math.sqrt(Math.pow(comp.x-predictedX,2)+ Math.pow(comp.y-predictedY,2)); 
    // var AC = Math.sqrt(Math.pow(predictedX-user.x,2)+ Math.pow(predictedY-user.y,2));
    // angle = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
    // comp.angleOld = angle
    drawCircle(predictedX,predictedY,3,"white")
    comp.angleOld = user.angleOld+(3*Math.PI/2)
    var context = canvas.getContext("2d");
    context.save()
    context.translate(x,y)
    context.rotate(comp.angleOld+ (2*Math.PI/3));
    context.beginPath();
    context.fillStyle = "#000000";
    let height = 30 * Math.cos(Math.PI / 6);
    context.moveTo(0, 0);
    context.lineTo(0+30, 0);
    context.lineTo(0+15, 0 - height);
    context.closePath();
    context.fill();
    context.lineWidth = 1.5;
    context.strokeStyle = "#ADD8E6"
    context.stroke();
    context.restore();
    comp.x += 0.5 * Math.cos(comp.angleOld - Math.PI/2);
    comp.y += 0.5 * Math.sin(comp.angleOld - Math.PI/2);
}
function drawShot(){
    if(shotI%501 === 0){
        shot.exists = false;
        console.log("works")
        shotI = 1
    }
    else if(shot.exists === true){
    shot.x += 1.5 * Math.cos(shot.angleOld - Math.PI/2);
    shot.y += 1.5 * Math.sin(shot.angleOld - Math.PI/2);
    context.fillStyle = "#000000"
    context.beginPath();
    context.arc(shot.x, shot.y, 7, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
    context.lineWidth = 1.5;
    context.strokeStyle = shot.color;
    context.stroke();
    shotI++
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
   else if(user.x < -10){
       user.x = canvas.width
   }
   if(comp.y < -10){
       comp.y = canvas.height
   }
   else if(comp.y > canvas.height + 10){
       comp.y = 0
   }
   else if(comp.x > canvas.width + 10){
       comp.x = 0
   }
   else if(comp.x < -10){
       comp.x = canvas.width
   }
}
function render(){
drawRect(0, 0, canvas.width, canvas.height, "black");
drawCircle(comp.x, comp.y, comp.radius, comp.color);
drawShot(shot.color);
drawUser(user.x, user.y,user.angleNew)
drawComp(comp.x, comp.y)
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
        }
  }
}
function keyUp(){
    user.angleNew = 0;
}