// Escena, cámara y renderizador
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador = new THREE.WebGLRenderer(); // Motor de renderizado
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);

// Cargar textura
const loader = new THREE.TextureLoader();
const textura = loader.load('pelota.jpg');

// Crear geometría y material para la esfera con textura
const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshBasicMaterial({ map: textura });
const sphere = new THREE.Mesh(geometry, material);
escena.add(sphere);

// Posicionar la cámara
camara.position.z = 50;

// Animación de la esfera
function animacion() {
    requestAnimationFrame(animacion);

    sphere.rotation.y += 0.01;
    renderizador.render(escena, camara);
}

animacion();

// Ajustar el tamaño de la ventana al cambiar su tamaño
window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});
