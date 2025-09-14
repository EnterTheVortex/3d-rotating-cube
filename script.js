// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Cube geometry and material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Camera position
camera.position.z = 5;

// OrbitControls for desktop + mobile
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth motion
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// Keyboard rotation
window.addEventListener('keydown', (e) => {
  const step = 0.1;
  switch(e.key) {
    case 'ArrowUp':
      cube.rotation.x -= step;
      break;
    case 'ArrowDown':
      cube.rotation.x += step;
      break;
    case 'ArrowLeft':
      cube.rotation.y -= step;
      break;
    case 'ArrowRight':
      cube.rotation.y += step;
      break;
  }
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Auto-rotation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Update controls for smooth damping
  controls.update();

  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
