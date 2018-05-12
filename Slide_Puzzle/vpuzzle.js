//Variables globales

var noLeft = [0,3,6];
var noRight = [2,5,8];
var noUp = [0,1,2];
var noDown = [6,7,8];

var currentImage = 0;
var currentPuzzle = [];

var solution = [0, 1, 2, 3, 4, 5, 6, 7, "white"];

function chooseImage(){
currentImage = Math.floor((Math.random() *(3-1) ) + 1);
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
          alert("Congratulations");
          chooseImage();
        }
      }
    }


//function changeCarrousel(){
//  for (i=0; i<3; i++){
  //  next = nextImg(carouselRecord[i]);
  //  carouselRecord.splice(i,1,next);
  //  id = "c"+i;
  //  imgId = next+".jpg";
  //  imgPath = "./Images/0/"+imgId;
  //  image = document.getElementById(id);
  //  image.src = imgPath;
//  }
//}
function solve(){
  //console.log(currentPuzzle)
  currentPuzzle.splice(0,9, 0, 1, 2, 3, 4, 5, 6, 7, "white");
  draw();
  check();
}


function main(){
  document.addEventListener('keydown', keyHandler, false);
  //setInterval(changeCarrousel, 5000)
}
