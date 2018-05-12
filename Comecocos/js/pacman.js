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

var sphere;
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

function addMap()
{
  var caja_fantasmas = new THREE.BoxGeometry(100,5,PADDLE_DEPTH,PADDLE_QUALITY);
  var box = new THREE.BoxGeometry(40,30,PADDLE_DEPTH,PADDLE_QUALITY);
  var geometrybordes0 = new THREE.BoxGeometry(10,130,PADDLE_DEPTH,PADDLE_QUALITY);
  var geometrybordes = new THREE.BoxGeometry(10,110,PADDLE_DEPTH,PADDLE_QUALITY);
  var geometrybordes2 = new THREE.BoxGeometry(370,12,PADDLE_DEPTH,PADDLE_QUALITY);

  var lineas = new THREE.BoxGeometry(120,10,PADDLE_DEPTH,PADDLE_QUALITY);
  var lineas2 = new THREE.BoxGeometry(10,70,PADDLE_DEPTH,PADDLE_QUALITY);
  var lineas3 = new THREE.BoxGeometry(10,40,PADDLE_DEPTH,PADDLE_QUALITY);


  var materialbordes = new THREE.MeshLambertMaterial(
    {
      color: 0x0000ff
    } );

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

  caja_1 = new THREE.Mesh(caja_fantasmas, materialbordes);
  caja_2 = new THREE.Mesh(caja_fantasmas, materialbordes);
  caja_3 = new THREE.Mesh(caja_fantasmas, materialbordes);


  box_map = new THREE.Mesh(box, materialbordes);
  box_map2 = new THREE.Mesh(box, materialbordes);
  box_map3 = new THREE.Mesh(box, materialbordes);
  box_map4 = new THREE.Mesh(box, materialbordes);
  box_map5 = new THREE.Mesh(box, materialbordes);

  new_linea.position.x = 0;
  new_linea.position.y = 80;
  new_linea.position.z = -300;

  new_linea2.position.x = 0;
  new_linea2.position.y = -80;
  new_linea2.position.z = -300;

  new_linea3.position.x = -120;
  new_linea3.position.y = 30;
  new_linea3.position.z = -300;

  new_linea4.position.x = 120;
  new_linea4.position.y = 30;
  new_linea4.position.z = -300;

  new_linea5.position.x = 120;
  new_linea5.position.y = -50;
  new_linea5.position.z = -300;

  new_linea6.position.x = -120;
  new_linea6.position.y = -50;
  new_linea6.position.z = -300;

  caja_1.position.x = 0;
  caja_1.position.z = -300;

  caja_2.position.y = 30;
  caja_2.position.z = -300;

  caja_3.position.y = -30;
  caja_3.position.z = -300;

  box_map.position.x = 120;
  box_map.position.y = 80;
  box_map.position.z = -300;

  box_map2.position.x = -120;
  box_map2.position.y = 80;
  box_map2.position.z = -300;

  box_map3.position.x = 120;
  box_map3.position.y = -80;
  box_map3.position.z = -300;

  box_map4.position.x = -120;
  box_map4.position.y = -80;
  box_map4.position.z = -300;

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
  scene.add(caja_1);
  scene.add(caja_2);
  scene.add(caja_3);
  scene.add(bordes);
  scene.add(bordes_1);
  scene.add(bordes2);
  scene.add(bordes2_1);
  scene.add(bordes3);
  scene.add(bordes4);
  scene.add(box_map);
  scene.add(box_map2);
  scene.add(box_map3);
  scene.add(box_map4);
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

function ColisionSphere()
{
  //if ((sphere.position.x | sphere.position.y) ==
  //(new_linea2.position.x | new_linea2.position.y)){
  //  sphere.position.x = 0;
  //  sphere.position.y = 0;
  //}
  //if (sphere.material.color ){
    //console.log("holi")
  //}

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




  //Colision Lineas Paralelas
  if(sphere.position.y <= new_linea.position.y + 10 &
     sphere.position.y >= new_linea.position.y - 10 &
     sphere.position.x <= new_linea.position.x + 60 &
     sphere.position.x >= new_linea.position.x - 60)
    {
      ballDirY = 0;
      sphere.position.y = sphere.position.y;
    }else{
      ballDirY = 1;
    }


  if(sphere.position.y <= new_linea2.position.y + 10 &
     sphere.position.y >= new_linea2.position.y - 10 &
     sphere.position.x <= new_linea2.position.x + 60 &
     sphere.position.x >= new_linea2.position.x - 60 )
    {
    ballDirY = 0;
    sphere.position.y = sphere.position.y;
  }else{
    ballDirY = 1;
  }




}


function draw()
{
  //Establecer la posicion de la practica
  //camera.rotation.z = -90 * Math.PI/180;
  //camera.rotation.y = -60 * Math.PI/180;
  //camera.position.x = playerPaddle.position.x -100;
  //camera.position.z = playerPaddle.position.z +100;


  //animate();
  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame
  requestAnimationFrame(draw);

  MovementSphere();
  ColisionSphere();
}
