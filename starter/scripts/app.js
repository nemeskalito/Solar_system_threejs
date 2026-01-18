import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js'

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

renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = .072
controls.dampingFactor = .05
// Отображение FPS

const stats = new Stats()
document.body.appendChild(stats.dom)

// Raycaster

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

// 

const composer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

const outlinePass = new OutlinePass(
	new THREE.Vector2(window.innerWidth, window.innerHeight),
	scene,
	camera
)

composer.addPass(outlinePass)
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

// Планеты
const ambientLight = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( ambientLight );

const light = new THREE.PointLight( 0xffffff, 300, 0 );
light.position.set( 0, 0, 0 );

light.castShadow = true
light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024
light.shadow.radius = 2
light.shadow.bias = -0.0005

scene.add( light );

const sunMesh = new THREE.Mesh(
	new THREE.SphereGeometry(
		configPlanets.radius.sun,
		64,
		64
	),
	new THREE.MeshBasicMaterial({
		map: textureLoader.load(configPlanets.textures.sun)
	})
)

scene.add(sunMesh)

function getPlanets(planet) {
	const texturePlanet = textureLoader.load(configPlanets.textures[planet])

	const planetMesh = new THREE.Mesh(
		new THREE.SphereGeometry(configPlanets.radius[planet], 64, 64),
		new THREE.MeshStandardMaterial({
			map: texturePlanet,
			metalness: 0,
			roughness: 0.8
		})
	)

	planetMesh.castShadow = true   // планета отбрасывает тень
	planetMesh.receiveShadow = true // и получает тень от других планет
	planetMesh.position.x = configPlanets.position[planet]
	
	const orbitPlanet = new THREE.Group()

	if (planet === "earth") {
		const textureMoon = textureLoader.load("./textures/Earth/moon.png")

		const moon = new THREE.Mesh(
			new THREE.SphereGeometry(.051, 64, 64),
			new THREE.MeshStandardMaterial({ map: textureMoon })
		)
		moon.position.x = .6
		moon.castShadow = true
		moon.receiveShadow = true
		
		const moonOrbit = new THREE.Group()
		moonOrbit.add(moon)
		planetMesh.add(moonOrbit)
		
		planetMesh.userData.moonOrbit = moonOrbit
		planetMesh.userData.moonMesh = moon

	}

	orbitPlanet.add(planetMesh)
	scene.add(orbitPlanet)
	
	Object.values(configPlanets.position).forEach(pos => scene.add(simpleOrbit(pos)))
	
	return { orbitPlanet, mesh: planetMesh}
	
}

function simpleOrbit(radius) {
	const geometry = new THREE.RingGeometry(radius, radius + .01, 128)
	const material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.05
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


// Анимация
function animate() {
	stats.begin()

	requestAnimationFrame(animate)
	controls.update()

	Object.keys(planets).forEach(name => {
		const planet = planets[name]
		planet.orbitPlanet.rotation.y -= configPlanets.rotation.orbit[name]
		planet.mesh.rotation.y -= configPlanets.rotation.axis[name]

		if (name === "earth" && planet.mesh.userData.moonOrbit) {
					planet.mesh.userData.moonMesh.rotation.y -= 0.00037
					planet.mesh.userData.moonOrbit.rotation.y -= 0.00368
			}
		})
	
	composer.render()

	stats.end()
}

animate()
// ============================================
window.addEventListener('mousemove', (event) => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
})

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
		composer.setSize(window.innerWidth, window.innerHeight)
});