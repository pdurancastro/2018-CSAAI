// GLOBAL VARIABLES

// Set the scene size
const WIDTH = 640;
const HEIGHT = 360;

var container;
var imageData;
// Set some camera attributes
const VIEW_ANGLE = 50;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene object variables
var renderer, scene, camera, pointLight;

// Set up the sphere vars
const RADIUS = 9;
const SEGMENTS = 6;
const RINGS = 6;
const Radiomin = 4;

var sphere;
var fantasma;
var angle = 0.0;

//Set up the variable plane
const FIELD_WIDTH= 400,
      FIELD_HEIGTH= 400;
const PLANE_WIDTH = FIELD_WIDTH,
      PLANE_HEIGTH = FIELD_HEIGTH,
      PLANE_QUALITY= 10;

var fiel_width_colision = FIELD_WIDTH;
var fiel_height_colision = FIELD_HEIGTH;

//Set up the variable cube
const PADDLE_WIDTH= 10,
      PADDLE_HEIGTH = 30,
      PADDLE_DEPTH = 10,
      PADDLE_QUALITY = 1;

var playerPaddleDirY = 0,
    cpuPaddleDirY = 0,
    paddleSpeed = 3;

var playerPaddle,
    cpuPaddle,
    bordes,
    bordes2;

var ballDirX = 1,
    ballDirY = 1;

// GAME FUNCTIONS

function setup()
{
  createScene();
  addPlane();
  addSphere();
  addfantasma();
  addPoint();
  addMap();
  addLight();
  draw();
}


function createScene()
{
    // Set up all the 3D objects in the scene

	// Get the DOM element to attach to
    container = document.getElementById("gameCanvas");
    // Size a WebGL renderer, camera and a scene
    renderer = new THREE.WebGLRenderer();
    camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );

    scene = new THREE.Scene();

    // Add the camera to the scene
    scene.add(camera);

    // Start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    //imageData = renderer.getImageData(0, 0, WIDTH, HEIGHT);

    // Attach the renderer-supplied DOM element.
    container.appendChild(renderer.domElement);
    //container.appendChild

    //Tratamiento de colisiones
    var canvas = container;
    var context = renderer.getContext('2d');
  //  var imageData = ctx.getImageData(0,0,container.width,container.height);



}

function addPlane(){
  var geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGTH, PLANE_QUALITY);
  var material = new THREE.MeshLambertMaterial(
      {
        color: 0xccffff, side: THREE.DoubleSide
      } );
  var plane = new THREE.Mesh( geometry, material );
  plane.position.z = -300;
  //scene.add();
  //scene.add(plane);
}


function addSphere()
{
    var geometry = new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS);
    var material = new THREE.MeshLambertMaterial(
        {
          color: 0xffff00
        });
    // Create a new mesh with sphere geometry
    sphere = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    sphere.position.x = 0;
    sphere.position.y = -20;
    sphere.position.z = -300;

    console.log(sphere.material.color)
    // Finally, add the sphere to the scene
    scene.add(sphere);
}

function addfantasma(){
  var geometry = new THREE.SphereGeometry(
      RADIUS,
      SEGMENTS,
      RINGS);
  var material = new THREE.MeshLambertMaterial(
      {
        color: 0xfff0000
      });

  fantasma = new THREE.Mesh(geometry, material);
  fantasma2 = new THREE.Mesh(geometry, material);

  fantasma.position.x = -140;
  fantasma.position.y = 110;
  fantasma.position.z = -300;

  fantasma2.position.x = 140;
  fantasma2.position.y = -110;
  fantasma2.position.z = -300;

  scene.add(fantasma);
  scene.add(fantasma2);
}

function addPoint(){
  var geometry = new THREE.SphereGeometry(
      Radiomin,
      SEGMENTS,
      RINGS);
  var material = new THREE.MeshLambertMaterial(
      {
        color: 0xffff00
      });

  point = new THREE.Mesh(geometry, material);
  point2 = new THREE.Mesh(geometry, material);
  point3 = new THREE.Mesh(geometry, material);
  point4 = new THREE.Mesh(geometry, material);
  point5 = new THREE.Mesh(geometry, material);
  point6 = new THREE.Mesh(geometry, material);

  point7 = new THREE.Mesh(geometry, material);
  point8 = new THREE.Mesh(geometry, material);
  point9 = new THREE.Mesh(geometry, material);
  point10 = new THREE.Mesh(geometry, material);
  point11 = new THREE.Mesh(geometry, material);
  point12 = new THREE.Mesh(geometry, material);

  point.position.x = 0;
  point.position.y = -50;
  point.position.z = -300;

  point2.position.x = 0;
  point2.position.y = 50;
  point2.position.z = -300;

  point3.position.x = -40;
  point3.position.y = -50;
  point3.position.z = -300;

  point4.position.x = +40;
  point4.position.y = -50;
  point4.position.z = -300;

  point5.position.x = +40;
  point5.position.y = 50;
  point5.position.z = -300;

  point6.position.x = -40;
  point6.position.y = 50;
  point6.position.z = -300;

  point7.position.x = 150;
  point7.position.y = -50;
  point7.position.z = -300;

  point8.position.x = 150;
  point8.position.y = 50;
  point8.position.z = -300;

  point9.position.x = -150;
  point9.position.y = 50;
  point9.position.z = -300;

  point10.position.x = -150;
  point10.position.y = -50;
  point10.position.z = -300;


  scene.add(point);
  scene.add(point2);
  scene.add(point3);
  scene.add(point4);
  scene.add(point5);
  scene.add(point6);
  scene.add(point7);
  scene.add(point8);
  scene.add(point9);
  scene.add(point10);
}


function addMap()
{
  var caja_fantasmas = new THREE.BoxGeometry(100,40,PADDLE_DEPTH,PADDLE_QUALITY);
  var box = new THREE.BoxGeometry(40,30,PADDLE_DEPTH,PADDLE_QUALITY);
  var geometrybordes0 = new THREE.BoxGeometry(10,130,PADDLE_DEPTH,PADDLE_QUALITY);
  var geometrybordes = new THREE.BoxGeometry(10,110,PADDLE_DEPTH,PADDLE_QUALITY);
  var geometrybordes2 = new THREE.BoxGeometry(370,12,PADDLE_DEPTH,PADDLE_QUALITY);

  var lineas = new THREE.BoxGeometry(120,10,PADDLE_DEPTH,PADDLE_QUALITY);
  var lineas2 = new THREE.BoxGeometry(10,100,PADDLE_DEPTH,PADDLE_QUALITY);
  var lineas3 = new THREE.BoxGeometry(10,60,PADDLE_DEPTH,PADDLE_QUALITY);


  var materialbordes = new THREE.MeshLambertMaterial(
    {
      color: 0x0000ff
    } );

  new_linea0 = new THREE.Mesh(lineas, materialbordes);
  new_linea = new THREE.Mesh(lineas, materialbordes);
  new_linea2 = new THREE.Mesh(lineas, materialbordes);
  new_linea3 = new THREE.Mesh(lineas2, materialbordes);
  new_linea4 = new THREE.Mesh(lineas2, materialbordes);
  new_linea5 = new THREE.Mesh(lineas3,materialbordes);
  new_linea6 = new THREE.Mesh(lineas3,materialbordes);

  bordes = new THREE.Mesh( geometrybordes0, materialbordes);
  bordes_1 = new THREE.Mesh( geometrybordes, materialbordes);
  bordes2 = new THREE.Mesh( geometrybordes0, materialbordes);
  bordes2_1 = new THREE.Mesh( geometrybordes, materialbordes);
  bordes3 = new THREE.Mesh( geometrybordes2, materialbordes);
  bordes4 = new THREE.Mesh( geometrybordes2, materialbordes);


  caja_2 = new THREE.Mesh(caja_fantasmas, materialbordes);


  new_linea0.position.x = 0;
  new_linea0.position.y = 30;
  new_linea0.position.z = -300;

  new_linea.position.x = 0;
  new_linea.position.y = 80;
  new_linea.position.z = -300;

  new_linea2.position.x = 0;
  new_linea2.position.y = -80;
  new_linea2.position.z = -300;

  new_linea3.position.x = -120;
  new_linea3.position.y = 50;
  new_linea3.position.z = -300;

  new_linea4.position.x = 120;
  new_linea4.position.y = 50;
  new_linea4.position.z = -300;

  new_linea5.position.x = 120;
  new_linea5.position.y = -60;
  new_linea5.position.z = -300;

  new_linea6.position.x = -120;
  new_linea6.position.y = -60;
  new_linea6.position.z = -300;

  caja_2.position.y = 30;
  caja_2.position.z = -300;

  bordes.position.x = 180;
  bordes.position.y = 60;
  bordes.position.z = -300;

  bordes_1.position.x = 180;
  bordes_1.position.y = -80;
  bordes_1.position.z = -300;

  bordes2.position.x = -180;
  bordes2.position.y = 60;
  bordes2.position.z = -300;

  bordes2_1.position.x = -180;
  bordes2_1.position.y = -80;
  bordes2_1.position.z = -300;

  bordes3.position.x = 0;
  bordes3.position.y = 130;
  bordes3.position.z = -300;

  bordes4.position.x = 0;
  bordes4.position.y = -130;
  bordes4.position.z = -300;

  //scene.add(playerPaddle );
  //scene.add(cpuPaddle);

  //Bordes escenario

  //scene.add(caja_2);
  scene.add(bordes);
  scene.add(bordes_1);
  scene.add(bordes2);
  scene.add(bordes2_1);
  scene.add(bordes3);
  scene.add(bordes4);
  scene.add(new_linea0);
  scene.add(new_linea);
  scene.add(new_linea2);
  scene.add(new_linea3);
  scene.add(new_linea4);
  scene.add(new_linea5);
  scene.add(new_linea6);


}

function addLight()
{
    // Create a point light
    PointLight =
      new THREE.PointLight(0xFFFFFF, 1.5);

    // Set its position
    PointLight.position.x = 10;
    PointLight.position.y = 50;
    PointLight.position.z = 130;

    // Add to the scene
    scene.add(PointLight);
}


function MovementSphere(){
  if (Key.isDown(Key.A)){
    sphere.position.x += -ballDirX;
  }else if (Key.isDown(Key.D)){
    sphere.position.x += ballDirX;
  }else if (Key.isDown(Key.W)){
    sphere.position.y += ballDirY;
  }else if (Key.isDown(Key.S)){
    sphere.position.y += -ballDirY;
  }else if (sphere.position.x < -180 & sphere.position.y <1 ){
    sphere.position.x = 180
  }else if (sphere.position.x > 180 & sphere.position.y <1){
    sphere.position.x = -180
  }
}

function Movementfantasma(){
  angle += 0.01;
  var newPos = 1.54*Math.sin(angle);
  var newPos2 = -1.54*Math.sin(angle);
  fantasma.position.x = fantasma.position.x  + newPos;
  fantasma2.position.x = fantasma2.position.x  - newPos;

}




function ColisionSphere()
{
//Caja principal
  if(sphere.position.x >= bordes.position.x - 10 &
     sphere.position.y >= bordes.position.y - 60){
    ballDirX = 0;
    sphere.position.x = sphere.position.x - 1;
  }else{
    ballDirX = 1;
  }
  if(sphere.position.x >= bordes_1.position.x - 10 &
     sphere.position.y <= bordes_1.position.y + 60){
    ballDirX = 0;
    sphere.position.x = sphere.position.x - 1;
  }else{
    ballDirX = 1;
  }
  if(sphere.position.x <= bordes2.position.x + 10 &
     sphere.position.y >= bordes2.position.y - 60){
    ballDirX = 0;
    sphere.position.x = sphere.position.x + 1;
  }else{
    ballDirX = 1;
  }
  if(sphere.position.x <= bordes2_1.position.x + 10 &
     sphere.position.y <= bordes2_1.position.y + 60){
    ballDirX = 0;
    sphere.position.x = sphere.position.x + 1;
  }else{
    ballDirX = 1;
  }
  if(sphere.position.y >= bordes3.position.y - 12){
    ballDirY = 0;
    sphere.position.y = sphere.position.y - 1;
  }else{
    ballDirY = 1;
  }
  if(sphere.position.y <= bordes4.position.y + 12){
    ballDirY = 0;
    sphere.position.y = sphere.position.y + 1;
  }else{
    ballDirY = 1;
  }
//
//////////////////////////////////////////////////////////////////////////
  //Colision fantasma
  if(sphere.position.y <= fantasma.position.y + RADIUS &&
     sphere.position.x <= fantasma.position.x + RADIUS &&
     sphere.position.y >= fantasma.position.y - RADIUS &&
     sphere.position.x >= fantasma.position.x - RADIUS  ){
       //console.log("Choque")
       sphere.position.x = 0;
       sphere.position.y = -20;
     }

   if(sphere.position.y <= fantasma2.position.y + RADIUS &&
      sphere.position.x <= fantasma2.position.x + RADIUS &&
      sphere.position.y >= fantasma2.position.y - RADIUS &&
      sphere.position.x >= fantasma2.position.x - RADIUS  ){
          //console.log("Choque")
      sphere.position.x = 0;
      sphere.position.y = -20;
    }
//////////////////////////////////////////////////////////////////////////
  //Colision Lineas Paralelas
  if(sphere.position.y <= new_linea.position.y + 10 &
     sphere.position.y >= new_linea.position.y - 10 &
     sphere.position.x <= new_linea.position.x + 60 &
     sphere.position.x >= new_linea.position.x - 60)
    {
      ballDirY = 0;
      //sphere.position.y = sphere.position.y;
    }else if(sphere.position.y <= new_linea2.position.y + 10  &
       sphere.position.y >= new_linea2.position.y - 10 &
       sphere.position.x <= new_linea2.position.x + 60 &
       sphere.position.x >= new_linea2.position.x - 60)
    {
      ballDirY = 0;
    }else if(sphere.position.y <= new_linea0.position.y + 10  &
       sphere.position.y >= new_linea0.position.y - 10 &
       sphere.position.x <= new_linea0.position.x + 60 &
       sphere.position.x >= new_linea0.position.x - 60)
    {
      ballDirY = 0;
    }else{
      ballDirY = 1;
    }

    //Colision lineas verticales
    if(sphere.position.y <= new_linea3.position.y + 50 &
       sphere.position.y >= new_linea3.position.y - 50 &
       sphere.position.x <= new_linea3.position.x + 10 &
       sphere.position.x >= new_linea3.position.x - 10)
      {
        ballDirX = 0;
      //  sphere.position.x = sphere.position.x;
    }else if(sphere.position.y <= new_linea4.position.y + 50 &
         sphere.position.y >= new_linea4.position.y - 50 &
         sphere.position.x <= new_linea4.position.x + 10 &
         sphere.position.x >= new_linea4.position.x - 10)
      {
        ballDirX = 0;
    }else if(sphere.position.y <= new_linea5.position.y + 30 &
         sphere.position.y >= new_linea5.position.y - 30 &
         sphere.position.x <= new_linea5.position.x + 10 &
         sphere.position.x >= new_linea5.position.x - 10)
      {
        ballDirX = 0;
    }else if (sphere.position.y <= new_linea6.position.y + 30 &
         sphere.position.y >= new_linea6.position.y - 30 &
         sphere.position.x <= new_linea6.position.x + 10 &
         sphere.position.x >= new_linea6.position.x - 10)
      {
        ballDirX = 0;

    }else{
        ballDirX = 1;
      }
}




function draw()
{
  //animate();
  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame
  requestAnimationFrame(draw);

  MovementSphere();
  Movementfantasma();
  ColisionSphere();
}
