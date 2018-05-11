

function clickCambioVideo(event){
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

//Debo ponerlo para cada segundo
function checkTiempoVideo(){
  var video = document.getElementById("Videobase");
  document.getElementById("timer").innerHTML = "Timer:" + video.currentTime;
  //console.log(video.currentTime);

  var inicio = document.getElementById("Inicio").value;
  var final = document.getElementById("Final").value;
  //console.log(inicio);

  // Restriccion Video
  if (inicio != '' && final != ''){
    if( video.currentTime > final){
      video.currentTime = inicio;
    }else if( inicio > video.currentTime ){
      video.currentTime = inicio;
    }
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
