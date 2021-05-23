import * as THREE from "three";
import _ from "lodash";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { UnrealBloomPass } from "./TransparentBackgroundFixedUnrealBloomPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import Moon from "./Moon";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const canvReference = document.getElementById("root") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
  canvas: canvReference,
  alpha: true,
});
renderer.setClearColor(0xff0000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 4, 1, 0.1);
const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)
composer.addPass(bloomPass)

const geometry = new THREE.SphereGeometry(10, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(geometry, material);
scene.add(sun);
const controls = new OrbitControls(camera, renderer.domElement);

const moons: Moon[] = [];
_.range(0, 100).forEach(() => {
  const moon = new Moon(sun);
  scene.add(moon);
  moons.push(moon);
});

camera.position.z = -75;
camera.position.x = -75;
camera.position.y = -75;

const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  moons.forEach((m) => m.render());
  composer.render();
};

animate();
