// THREE.js 3D setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('heroCanvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Project data
const projects = [
    { name: "Project 1", url: "https://example.com/project1" },
    { name: "Project 2", url: "https://example.com/project2" },
    { name: "Project 3", url: "https://example.com/project3" },
    { name: "Project 4", url: "https://example.com/project4" },
];

// Create interactive cubes
const cubes = [];
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.5, roughness: 0.1 });

projects.forEach((project, i) => {
    const cube = new THREE.Mesh(geometry, material.clone());
    cube.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    );
    cube.userData = { url: project.url, name: project.name };
    scene.add(cube);
    cubes.push(cube);
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00ffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

camera.position.z = 30;

// Raycaster for click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    if (intersects.length > 0) {
        const clickedCube = intersects[0].object;
        const url = clickedCube.userData.url;
        window.open(url, "_blank");
    }
}

window.addEventListener('click', onMouseClick);

// Animate cubes
function animate() {
    requestAnimationFrame(animate);

    cubes.forEach(cube => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
        cube.position.x += Math.sin(Date.now() * 0.001) * 0.001;
        cube.position.y += Math.cos(Date.now() * 0.001) * 0.001;
    });

    renderer.render(scene, camera);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
