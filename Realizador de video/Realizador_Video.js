var loop = 0;
var counter = 0;
function clickCambioVideo(event){
    counter = 0;
    //VideoLib = document.getElementsByClassName("VideoSelect");
    //console.log(event.target)
    document.getElementById("Videobase").src = event.target.src;

    Evento = event.target.currentTime;
    //console.log(Evento);
    document.getElementById("Video1").style.backgroundColor = "white";
    document.getElementById("Video2").style.backgroundColor = "white";
    document.getElementById("Video3").style.backgroundColor = "white";
    document.getElementById("Video4").style.backgroundColor = "white";

    document.getElementById(event.target.id).style.backgroundColor = "red";
}

function RatonSonido(event){
    document.getElementById("Videobase").muted = "true";
    document.getElementById("Video1").muted = "true";
    document.getElementById("Video2").muted = "true";
    document.getElementById("Video3").muted = "true";
    document.getElementById("Video4").muted = "true";
    document.getElementById(event.target.id).muted = false;
}

function checkloop(){
  var num_loop = document.getElementById("Repeticion").value;
  if (num_loop != ''){
    loop = num_loop;
  }
}

//Debo ponerlo para cada segundo
function checkTiempoVideo(){

  checkloop();
  var video = document.getElementById("Videobase");
  document.getElementById("timer").innerHTML = "Timer:" + video.currentTime;
  //console.log(video.currentTime);

  var inicio = document.getElementById("Inicio").value;
  var final = document.getElementById("Final").value;
  //console.log(inicio);
  var repeticion = loop;
  //console.log(repeticion);
  // Restriccion Video

  if (inicio != '' && final != '' && counter <= repeticion){
    if( video.currentTime > final){
      video.currentTime = inicio;
      counter = counter + 1;
      //repeticion = repeticion - 1;
    }else if( inicio > video.currentTime ){
      video.currentTime = inicio;
      counter = counter + 1;
      //repeticion = repeticion - 1;
    }console.log(counter)
  }
}



function start(){
  var video = document.getElementById("Videobase");
  //var duration = video.duration;
  //console.log(duration);
  video.ontimeupdate = function() {checkTiempoVideo()};
  //document.getElementById("timer").innerHTML = video.currentTime;
  //console.log(video.currentTime);

};
