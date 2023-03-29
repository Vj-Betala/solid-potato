import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const spotLight = new THREE.SpotLight( 0xffffff );

scene.add(spotLight);

const numV = 10;

const adjList = getGraph(numV);
const vertexPoints = new Array(numV)
const radiusOfPoints = 20

//Place points around camera

for (let index = 0; index < adjList.length; index++) {
  const geometry = new THREE.CircleGeometry( 1, 16 );
  const material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
  const circle = new THREE.Mesh( geometry, material);
  const x = Math.floor(Math.random() * radiusOfPoints), y = Math.floor(Math.random() * radiusOfPoints), z= -25;
  circle.position.set(x,y,z);
  vertexPoints[index] = circle;
  scene.add( circle ); 
}

//for each circle in adj list, draw a line to the circle at vP[vertex]

//TODO: Generate edges.

renderer.render(scene, camera)


function getGraph(numV) {
  let numE = Math.floor(Math.random() * (numV - 1) * numV);

  while(numE < (0.3*numV)){
    numE = Math.floor(Math.random() * (numV - 1) * numV);
  }
  
  let adjList = new Array();

  for (let index = 0; index < numV; index++) {
    adjList[index] = new Array();
  }

  //   adjList.fill(new Array(), 0, numV);

  for (let index = 0; index < numE; index++) {
    let vert1 = Math.floor(Math.random() * numV);
    let vert2 = Math.floor(Math.random() * numV);

    if (vert1 !== vert2 && !adjList[vert1].includes(vert2)) {
      // print(vert1 + ' , ' + vert2)
      adjList[vert1].push(vert2);
    } else if (vert1 === vert2 || adjList[vert1].includes(vert2)) {
      index--;
    }
  }

  return adjList;
}


function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}