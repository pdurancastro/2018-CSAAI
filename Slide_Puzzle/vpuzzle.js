//Variables globales

var noLeft = [0,3,6];
var noRight = [2,5,8];
var noUp = [0,1,2];
var noDown = [6,7,8];

var currentImage = 0;
var currentPuzzle = [];

var solution = [0, 1, 2, 3, 4, 5, 6, 7, "white"];

var time;


function chooseImage(){
currentImage = Math.floor((Math.random() *(4-1) ) + 1);
//currentImage = 1;
  for (i=0; i<9; i++){
    id = "p" + i;
    imgId = id +".png";
  //  console.log(currentImage)
    imgPath = "./Images/"+ currentImage +"/"+ imgId;
    //console.log(imgPath)
    image = document.getElementById(id);
    image.src = imgPath;
  }
}

function randomize(){

  startime = new Date();
  currentPuzzle = [];
  j = 0;
  for (a = [0, 1, 2, 3, 4, 5, 6, 7], i = a.length; i--; ) {
    var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    currentPuzzle.push(random);
  }
//Array de 9 posiciones ahora tiene white
  currentPuzzle.push("white");
  for (i=0; i<9; i++){
    id = "p" + i;
    //console.log(currentPuzzle[i])
    imgId = "p" + currentPuzzle[i]+".png";
    //console.log(currentImage)
    imgPath = "./Images/" + currentImage + "/" + imgId;
    image = document.getElementById(id);
    image.src = imgPath;
  }
  setInterval(gameTime, 1000);
}


function move(x){
  //console.log(currentPuzzle);
  var noAllowed = [];
  actual = currentPuzzle.indexOf("white");
  //console.log(actual);
  if( x == - 1 ){
    noAllowed = noLeft;
  }
  if(x==1){
    noAllowed = noRight;
  }
  if(x==-3){
    noAllowed = noUp;
  }
  if(x==3){
    noAllowed = noDown;
  }

  dest = currentPuzzle.indexOf("white");
  actual = dest - x;
  //console.log("actual")
  //console.log(actual);


  if(noAllowed.indexOf(actual)== - 1 && 0 <= actual && actual <= 8){
    aux = currentPuzzle[actual];
    currentPuzzle.splice(actual,1,currentPuzzle[dest]);
    currentPuzzle.splice(dest,1,aux);
    //console.log("Nuevo Array");
    //console.log(currentPuzzle);
    draw();
    check();
  }
}


function draw(){
  for (i=0; i<9; i++){
    //console.log("Tienes que pintar")
    id = "p"+i;
    imgId = currentPuzzle[i]+".png";
    //console.log(imgId);
    imgPath = "./Images/"+currentImage+"/"+ "p" + imgId;
    image = document.getElementById(id);
    image.src = imgPath;
  }
}

//Funcion Pulsar
function keyHandler(event) {
  switch(event.key) {
    case "ArrowLeft":
    //console.log("izquierda");
    move(1);
    break;
    case "ArrowRight":
    //console.log("derecha");
    move(-1);
    break;
    case "ArrowUp":
    //console.log("Arriba")
    move(3);
    break;
    case "ArrowDown":
    //console.log("abajo");
    move(-3);
    break;
}}

    function check(){
      //console.log("Congrats!")
      //console.log(currentPuzzle)
      var equal = 0;
      for (i=0;i<9;i++){
        if(solution[i] == currentPuzzle[i]){
          equal += 1;
        }
        if(equal == 9){
          var notification = new Notification("Congratulations your time is :" + time ,
                            {body: "Pulse Start to do again"});
          openWin();
          setTimeout(function() {notification.close()}, 14000);
          //alert("Congratulations your time is :" + time);
          //chooseImage();
        }
      }
    }

function openWin() {
  var myWindow = window.open("", "myWindow", "width=640, height=480");
  myWindow.document.write("<p>Congratulations!!!!!!'</p>");
  var x = document.createElement("VIDEO");
  x.setAttribute("src","video.mp4");
  x.setAttribute("width", "520");
  x.setAttribute("height", "360");
  x.setAttribute("controls","controls");
  x.setAttribute("autoplay","autoplay");
  myWindow.document.body.appendChild(x);
  // document.body.appendChild(x);
  //Video();
  setTimeout(function(){ myWindow.close() }, 8000);
}

function solve(){
  //console.log(currentPuzzle)
  currentPuzzle.splice(0,9, 0, 1, 2, 3, 4, 5, 6, 7, "white");
  draw();
  check();
}


function gameTime(){
  var msecPerMinute = 1000 * 60;
  var msecPerHour = msecPerMinute * 60;
  var dateMsec = startime.getTime();

  //console.log(dateMsec);

  var actual = new Date();
  var diference = actual.getTime() - dateMsec;
  // Calculate the hours, minutes, and seconds.
  var hours = Math.floor(diference / msecPerHour );
  diference= diference - (hours * msecPerHour );

  var minutes = Math.floor(diference / msecPerMinute );
  diference = diference - (minutes * msecPerMinute );

  var seconds = Math.floor(diference / 1000 );

  // Display the result.
  time = hours + ":" + minutes + ":" + seconds;
  document.getElementById("timing").innerHTML = "Time:" +  time;
}


function main(){
  document.addEventListener('keydown', keyHandler, false);
  //setInterval(changeCarrousel, 5000)
}
