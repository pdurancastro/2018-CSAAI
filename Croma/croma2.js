
var Estado = 6;
var CajaRoja = 1;
var CajaGreen = 1;
var CajaBlue = 1;

document.addEventListener('DOMContentLoaded', function(){
    var video = document.getElementById('v');
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');
    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');

    var cw;
    var ch;

    v.addEventListener('play', function(){
        cw = v.clientWidth;
        ch = v.clientHeight;
        canvas.width = cw;
        canvas.height = ch;
        back.width = cw;
        back.height = ch;
        draw(v,context,backcontext,cw,ch);
    },false);

},false);



function CambiarCroma(event){
  if(event.target.id == 'gris'){
    Estado = 0;
  }else if(event.target.id == 'imagen'){
    Estado = 1;
  }else if(event.target.id == 'red'){
    Estado = 2;
  }else if(event.target.id == 'green'){
    Estado = 3;
  }else if(event.target.id == 'blue'){
    Estado = 4;
  }else if(event.target.id =='Resultado'){
    console.log("EYYYY");
    CajaRoja = document.getElementById("R").value;
    CajaBlue = document.getElementById("B").value;
    CajaGreen = document.getElementById("G").value;

    if (CajaRoja != '' && CajaBlue != '' && CajaGreen != ''){
      Estado = 5;
    }
  }
}


function draw(v,c,ctx,w,h) {
    if(v.paused || v.ended) return false;
    // First, draw it into the backing canvas
    ctx.drawImage(v,0,0,w,h);
    // Grab the pixel data from the backing canvas
    var idata = ctx.getImageData(0,0,w,h);
    var data = idata.data;
    // Loop through the pixels, turning them grayscale
    //(Estado);
    if(Estado == 0){
      for(var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var brightness = (3*r+4*g+b)>>>3;
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
        }
    }else if(Estado == 1){
      var image = new Image();
      image.src = 'imagen.jpg'
      ctx.drawImage(image, 0, 0, 600, 300);
      var Datos_Imagen = ctx.getImageData(0,0,w,h);
      var Datos_Imagen_Trasera = Datos_Imagen.data;
      for(var i = 0; i < data.length; i+=4) {
        var R = data[i];
        var G = data[i+1];
        var B = data[i+2];
        if (G > 100 && R < 80 && B < 80){
          data[i] = Datos_Imagen_Trasera[i];
          data[i+1] = Datos_Imagen_Trasera[i+1];
          data[i+2] = Datos_Imagen_Trasera[i+2];
        }
      }
    }else if(Estado == 2){
      for(var i = 0; i < data.length; i+=4) {
          var R = data[i];
          var G = data[i+1];
          var B = data[i+2];
          var rNew = R*3;
          var gNew = 0;
          var bNew = 0;
          var brightness = (rNew+gNew+bNew)>>>3;
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
        }

    }else if(Estado == 3){
      for(var i = 0; i < data.length; i+=4) {
          var R = data[i];
          var G = data[i+1];
          var B = data[i+2];
          var rNew = 0;
          var gNew = G*3;
          var bNew = 0;
          var brightness = (rNew+gNew+bNew)>>>3;
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
        }
    }else if(Estado == 4){
      for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var rNew = 0;
        var gNew = 0;
        var bNew = b*3;
        var brightness = (rNew+gNew+bNew)>>>3;
        data[i] = brightness;
        data[i+1] = brightness;
        data[i+2] = brightness;
      }
    }else if (Estado == 5){
      console.log("Holi")
      for(var i = 0; i < data.length; i+=4) {
        var R = data[i];
        var G = data[i+1];
        var B = data[i+2];
        var rNew = R*CajaRoja;
        var gNew = G*CajaGreen;
        var bNew = B*CajaBlue;

        var brightness = (rNew+gNew+bNew)>>>3;
        data[i] = brightness;
        data[i+1] = brightness;
        data[i+2] = brightness;
      }
    }

    idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,0,0);
    // Start over!
    setTimeout(function(){ draw(v,c,ctx,w,h); }, 0);
}
