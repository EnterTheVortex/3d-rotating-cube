// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Cube geometry and material
const geometry = new THREE.BoxGeometry();
const faceColors = [
  0xff0000, 0x00ff00, 0x0000ff, // first three faces
  0xffff00, 0xff00ff, 0x00ffff  // last three faces
];

const materials = faceColors.map(color => new THREE.MeshBasicMaterial({ color }));
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Camera
camera.position.z = 5;

// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// Keyboard rotation
window.addEventListener('keydown', (e) => {
  const step = 0.1;
  switch(e.key) {
    case 'ArrowUp': cube.rotation.x -= step; break;
    case 'ArrowDown': cube.rotation.x += step; break;
    case 'ArrowLeft': cube.rotation.y -= step; break;
    case 'ArrowRight': cube.rotation.y += step; break;
  }
});

// Raycaster for click/tap interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onPointerDown(event) {
  event.preventDefault();

  // Calculate normalized device coordinates (-1 to +1)
  if(event.touches) { // mobile touch
    mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  } else { // mouse click
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);
  
  if(intersects.length > 0) {
    const faceIndex = intersects[0].face.materialIndex;
    // Change the face color randomly
    cube.material[faceIndex].color.set(Math.random() * 0xffffff);
  }
}

// Event listeners
window.addEventListener('mousedown', onPointerDown, false);
window.addEventListener('touchstart', onPointerDown, false);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
