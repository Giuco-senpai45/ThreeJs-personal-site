import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

loader.load(
  ".",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusTexture = new THREE.TextureLoader().load("icons/makemake.jpg");
const material = new THREE.MeshStandardMaterial({ map: torusTexture });
const torus = new THREE.Mesh(geometry, material);
torus.color;

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(600).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("icons/milkyway.jpg");
scene.background = spaceTexture;

// Avatar

const georgeTexture = new THREE.TextureLoader().load("icons/giuco-fantasy.png");

const george = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: georgeTexture })
);

scene.add(george);

const moonTexture = new THREE.TextureLoader().load("icons/moon.jpg");
const moonNormalMap = new THREE.TextureLoader().load("icons/normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 16, 16),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormalMap,
  })
);

scene.add(moon);
moon.position.y = 8;
moon.position.z = 50;
moon.position.setX(-10);

// earth

const earthTexture = new THREE.TextureLoader().load("icons/earth_texture.jpg");
const normalTexture = new THREE.TextureLoader().load("icons/earth_texture.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = 60;
earth.position.setX(-10);

george.position.z = -5;
george.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  george.rotation.y += 0.01;
  george.rotation.z += 0.01;

  camera.position.z = t * -0.02;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.y += 0.008;
  earth.rotation.x += 0.005;

  george.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
