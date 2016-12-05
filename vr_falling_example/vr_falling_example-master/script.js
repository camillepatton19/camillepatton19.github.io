var scene,
  camera,
  renderer,
  element,
  container,
  effect,
  controls;

var flower = [];

init();

function init() {
  setScene();

  setControls();

  setLights();
  setFloor();

  setFlower();

  clock = new THREE.Clock();
  animate();
}

function setScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
  camera.position.set(0, 15, 0);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('webglviewer');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);
}

function setLights() {
  // Lighting
   var light = new THREE.PointLight(0x999999, 2, 100);
   light.position.set(0, 75, 100);
   scene.add(light);

  var lightScene = new THREE.PointLight(0x999999, 2, 100);
   lightScene.position.set(100, 75, 0);
   scene.add(lightScene);
  
   var lightSpot = new THREE.PointLight(0x999999, 2, 100);
   lightSpot.position.set(-100, 75, 0);
   scene.add(lightSpot);
   
  var light4 = new THREE.PointLight(0x999999, 2, 100);
   light4.position.set(0, 75, -100);
   scene.add(light4);
  
  var lightAmbient = new THREE.AmbientLight(0x999999);
  scene.add(lightAmbient);
}

function setFloor() {
  var floorTexture = THREE.ImageUtils.loadTexture('textures/grass.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat = new THREE.Vector2(50, 50);
  floorTexture.anisotropy = renderer.getMaxAnisotropy();

  var floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: floorTexture
  });

  var geometry = new THREE.PlaneBufferGeometry(1000, 1000);

  var floor = new THREE.Mesh(geometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
}



function setFlower() {
  // ASCII file
  var loader = new THREE.STLLoader();
  loader.load('models/3dflower.stl', function(geometry) {
    var material = new THREE.MeshPhongMaterial({
      color: 0x6495ed,
      specular: 0x111111,
      shininess: 200
    });

    for (var i = 0; i < 300; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(Math.random()*360-150, Math.random()*360, Math.random()*360-150);
      //mesh.position.set(Math.cos(i / 10 * 2 * Math.PI) * 50, 75, Math.sin(i / 10 * 2 * Math.PI) * 100 - 50);
      //mesh.rotation.set(0);
      // mesh.rotation.set(0, Math.PI/2 + Math.atan((camera.position.x-mesh.position.x)/(camera.position.z-mesh.position.z)), 0);
      mesh.scale.set(.05, .05, .05);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      flower[i] = mesh;
      scene.add(mesh);
      
    }
  });
}


function animate() {

  animateFlower();

  requestAnimationFrame(animate);

  update();
  render();
}

function animateFlower() {
  for (var i = 0, il = flower.length; i < il; i++) {
    flower[i].position.y -= .1;
    if (flower[i].position.y < -15) flower[i].position.y = 75;
  } //flower[i].position.y = 75;
  
}

function setControls() {
  // Our initial control fallback with mouse/touch events in case DeviceOrientation is not enabled
  controls = new THREE.OrbitControls(camera, element);
  controls.target.set(
    camera.position.x + 0.15,
    camera.position.y,
    camera.position.z
  );
  controls.noPan = true;
  controls.noZoom = true;

  // Our preferred controls via DeviceOrientation
  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    element.addEventListener('click', fullscreen, false);

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);
}

function resize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {
  resize();

  camera.updateProjectionMatrix();

  controls.update(dt);
}

function render(dt) {
  effect.render(scene, camera);
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}

function getURL(url, callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        callback(JSON.parse(xmlhttp.responseText));
      } else {
        console.log('We had an error, status code: ', xmlhttp.status);
      }
    }
  }

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}