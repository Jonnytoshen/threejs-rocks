import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  BoxGeometry, 
  MeshLambertMaterial, 
  Mesh, 
  PointLight,
  Raycaster,
  Vector2
} from 'three';
import { TimelineMax, Expo } from 'greensock';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer({ antialias: true });
const raycaster = new Raycaster();
const mouse = new Vector2();

camera.position.z = 10;

renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function createBoxs() {
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshLambertMaterial({ color: 0xF7F7F7 });

  for (let i = 0; i < 15; i++) {
    const mesh = new Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh); 
  }
}

function createLight() {
  const light1 = new PointLight(0xFFFFFF, 1, 1000);
  const light2 = new PointLight(0xFFFFFF, 2, 1000);
  light1.position.set(0, 0, 0);
  light2.position.set(0, 0, 25);
  scene.add(light1);
  scene.add(light2);
}

function render() {
  requestAnimationFrame(render);

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  for (let i = 0; i < intersects.length; i++) {
    const timeline = new TimelineMax();
    timeline.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
    timeline.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut });
    timeline.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut });
    timeline.to(intersects[i].object.rotation, .5, { y: Math.PI * 5, ease: Expo.easeOut }, '=-1.5');
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; 
  
  
}

createBoxs();
createLight();
render();

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', onMouseMove, false);

