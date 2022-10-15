import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import FragmentShader from "./shaders/fragment.glsl?raw";
import VertexShader from "./shaders/vertex.glsl?raw";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.Renderer;

let controls: OrbitControls;

const canvasDom = document.querySelector("canvas") as HTMLCanvasElement;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ canvas: canvasDom });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.ShaderMaterial({
    fragmentShader: FragmentShader,
    vertexShader: VertexShader,
    side: THREE.DoubleSide,
    wireframe: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  camera.position.set(0, 5, 5);
  controls.update();

  // Start tick loop.
  tick();
}

// Entrypoint.
init();

function tick() {
  requestAnimationFrame(tick);

  controls.update();

  renderer.render(scene, camera);
}

// Window events.

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);
