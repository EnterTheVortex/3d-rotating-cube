// 1️⃣ Create scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// 2️⃣ Create a cube
const geometry = new THREE.BoxGeometry();
const texture = new THREE.TextureLoader().load('assets/cube-texture.png');
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 3️⃣ Position camera
camera.position.z = 5;

// 4️⃣ Animate cube
function animate() {
  requestAnimationFrame(animate);
  
  cube.rotation.x += 0.01;  // Rotate along X axis
  cube.rotation.y += 0.01;  // Rotate along Y axis

  renderer.render(scene, camera);
}
animate();

// 5️⃣ Make it responsive
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
