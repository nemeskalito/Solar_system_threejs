import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

import config from './config.js'
import configPlanets from './configPlanets.js'

const scene = new THREE.Scene()

// Cцена, камера и рендерер
const camera = new THREE.PerspectiveCamera(
	config.camera.fov,
	window.innerWidth / window.innerHeight,
	config.camera.near,
	config.camera.far
)
camera.position.set(...config.camera.position);
scene.add(camera)

const canvas = document.querySelector(".threejs")

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true,
})

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = .072
controls.dampingFactor = .05
// Отображение FPS
const stats = new Stats()
document.body.appendChild(stats.dom)
// ---------------------------------------------

const textureLoader = new THREE.TextureLoader()
// Небо
const geometryStars = new THREE.SphereGeometry(1000, 64, 64);
const materialStars = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./textures/stars.png'),
  side: THREE.BackSide,
});
const space = new THREE.Mesh(geometryStars, materialStars);
space.renderOrder = -1;

scene.add(space);
// Расстояния от солнца в 2 раза меньше, радиусы в 3 больше


function getPlanets(planet) {
	const texturePlanet = textureLoader.load(configPlanets.textures[planet])

	const planetMesh = new THREE.Mesh(
		new THREE.SphereGeometry(configPlanets.radius[planet], 64, 64),
		new THREE.MeshBasicMaterial({ map: texturePlanet })
	)

	if (planet === "sun") {
		scene.add(planetMesh)
		return { orbitPlanet: null, mesh: planetMesh}
	}
	else {
		planetMesh.position.x = configPlanets.position[planet]

		const orbitPlanet = new THREE.Group()
		orbitPlanet.add(planetMesh)

		scene.add(orbitPlanet)

		Object.values(configPlanets.position).forEach(pos => scene.add(simpleOrbit(pos)))

		return { orbitPlanet, mesh: planetMesh}
	}
}

// Функции
function simpleOrbit(radius) {
	const geometry = new THREE.RingGeometry(radius, radius + .02, 128)
	const material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.75
	})

	const ring = new THREE.Mesh(geometry, material)
	ring.rotation.x = Math.PI / 2

	return ring
}

const planets = {}

Object.keys(configPlanets.textures).forEach(name => {
	const { orbitPlanet, mesh} = getPlanets(name)
	if (orbitPlanet === null) return
	planets[name] = { orbitPlanet, mesh }
})


function animate() {
	stats.begin()

	requestAnimationFrame(animate)
	controls.update()

	Object.keys(planets).forEach(name => {
		planets[name].orbitPlanet.rotation.y -= configPlanets.rotation.orbit[name]
		planets[name].mesh.rotation.y -= configPlanets.rotation.axis[name]
	})	
	
	renderer.render(scene, camera)

	stats.end()
}

animate()
// ============================================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});