import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffffff");
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.setZ(50);
camera.lookAt(new THREE.Vector3(0,0,0));

const raycaster = new THREE.Raycaster();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

document.body.addEventListener('click', onclick, false);

const spotLight = new THREE.SpotLight(0x000);

scene.add(spotLight);

const numV = 10;

const adjList = getGraph(numV);
const vertexPoints = new Array(numV);
const radiusOfPoints = 20;
const rotationOfPoints = (2 * Math.PI) / numV;

for (let index = 0; index < adjList.length; index++) {
  const geometry = new THREE.CircleGeometry(2, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0x000 });
  const circle = new THREE.Mesh(geometry, material);
  const x = Math.cos(rotationOfPoints * index) * radiusOfPoints,
    y = Math.sin(rotationOfPoints * index) * radiusOfPoints,
    z = 0;
    scene.add(circle);
    circle.position.set(x, y, z);
    vertexPoints[index] = circle;
    circle.rotation.set(0,0,0);
    circle.updateMatrixWorld();
}

var direction = new THREE.Vector3(), arrowHelper;
for (let index = 0; index < adjList.length; index++) {
  var startPoint = vertexPoints[index].position;
  var textP = startPoint.clone().project(camera);
  // FIXME: center text over node
  textP.x = (textP.x + 1)/ 2 * (renderer.domElement.clientWidth);
  textP.y = (1 - textP.y)/2 * (renderer.domElement.clientHeight);
  var div = document.createElement("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.color = "white";
  div.innerHTML = ""+index;
  div.style.position = "absolute";
  div.style.zIndex = 99;
  div.style.top = `${textP.y}px`;
  div.style.left = `${textP.x}px`;
  document.body.appendChild(div);
  for (let subIndex = 0; subIndex < adjList[index].length; subIndex++) {
    var endPoint = vertexPoints[subIndex].position;
    direction.subVectors(endPoint, startPoint).normalize();
    arrowHelper = new THREE.ArrowHelper(
      direction,
      startPoint,
      startPoint.distanceTo(endPoint),
      0x000,
      3
      );
      scene.add(arrowHelper);
    }
  }
  
  
  renderer.render(scene, camera);
  
  function getGraph(numV) {
    let numE = Math.floor(Math.random() * (numV - 1) * numV);
    
    while (numE < 0.3 * numV) {
      numE = Math.floor(Math.random() * (numV - 1) * numV);
    }
    
    let adjList = new Array();
    
    for (let index = 0; index < numV; index++) {
      adjList[index] = new Array();
    }
    
    for (let index = 0; index < numE; index++) {
      let vert1 = Math.floor(Math.random() * numV);
      let vert2 = Math.floor(Math.random() * numV);
      if (vert1 !== vert2 && !adjList[vert1].includes(vert2) && adjList[vert1].length < 3) {
        adjList[vert1].push(vert2);
      } else {
        index--;
    }
  }
  
  return adjList;
}

animate();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onclick(event){
  var mouse = new THREE.Vector2();
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(vertexPoints, false);
  if (intersects.length > 0) {
    selectedObject = intersects[0];
    console.log(selectedObject);
  }

  // TODO: Change color of object, by mapping locations to vertexpoints
}