import * as THREE from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import config from './config.js'

const scene = new THREE.Scene()

// Cцена, камера и рендерер

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	5000
)
camera.position.set(0, 7, 15);
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
 
const configPlanets = {
	textures: {
		sun: './textures/Sun/sun.png',
		earth: './textures/Earth/earth.png',
		mercury: './textures/Mercury/mercury.png',
		venus: './textures/Venus/venus.png',
		mars: './textures/Mars/mars.png',
		jupiter: './textures/Jupiter/jupiter.png',
		saturn: './textures/Saturn/saturn.png',
		uranus: './textures/Uranus/uranus.png',
		neptune: './textures/Neptune/neptune.png',
	},
	radius: {
		sun: .696,
		earth: .191,
		mercury: .0732,
		venus: .101,
		mars: .102,
		jupiter: .21,
		saturn: .18,
		uranus: .076,
		neptune: .074,
	},
	position: {
		earthX: 7.5,
		mercuryX: 3.5,
		venusX: 5,
		marsX: 12.5,
		jupiterX: 20.4,
		saturnX: 37.5,
		uranusX: 75,
		neptuneX: 138.5,
	},
	rotation: {
		orbit: {
			earthY: .00298,
			mercuryY: .00479,
			venusY: .0035,
			marsY: .00241,
			jupiterY: .00131,
			saturnY: .000967,
			uranusY: .000684,
			neptuneY: .000475,
		},
		orbit: {
			earthY: .00298,
			mercuryY: .00479,
			venusY: .0035,
			marsY: .00241,
			jupiterY: .00131,
			saturnY: .000967,
			uranusY: .000684,
			neptuneY: .000475,
		},
		axis: {
			earthY: 0.0167,
			mercuryY: 0.000109,
			venusY: 0.00065,
			marsY: 0.0087,
			jupiterY: 0.45,
			saturnY: 0.36,
			uranusY: 0.093,
			neptuneY: 0.0965,
		}
	}
}
// ========================================
// Расстояния от солнца в 2 раза меньше, радиусы в 3 больше

const textureSun = textureLoader.load('./textures/Sun/sun.png')
const materialSun = new THREE.MeshBasicMaterial({
	map: textureSun,
})
const geometrySun = new THREE.SphereGeometry(.696, 64, 64)
const sun = new THREE.Mesh(geometrySun, materialSun)

scene.add(sun)

const textureEarth = textureLoader.load('./textures/Earth/earth.png')
const materialEarth = new THREE.MeshBasicMaterial({
	map: textureEarth
})
const geometryEarth = new THREE.SphereGeometry(.191, 64, 64)
const earth = new THREE.Mesh(geometryEarth, materialEarth)

earth.position.x = 7.5

const orbitEarth = new THREE.Group()
orbitEarth.add(earth)
scene.add(orbitEarth)

const textureMercury = textureLoader.load('./textures/Mercury/mercury.png')
const materialMercury = new THREE.MeshBasicMaterial({
	map: textureMercury
})
const geometryMercury = new THREE.SphereGeometry(.0732, 64, 64)
const mercury = new THREE.Mesh(geometryMercury, materialMercury)

mercury.position.x = 3.5

const orbitMercury = new THREE.Group()
orbitMercury.add(mercury)
scene.add(orbitMercury)

const textureVenus = textureLoader.load('./textures/Venus/venus.png')
const materialVenus = new THREE.MeshBasicMaterial({
	map: textureVenus
})
const geometryVenus = new THREE.SphereGeometry(.101, 64, 64)
const venus = new THREE.Mesh(geometryVenus, materialVenus)

venus.position.x = 5

const orbitVenus = new THREE.Group()
orbitVenus.add(venus)
scene.add(orbitVenus)

const textureMars = textureLoader.load('./textures/Mars/mars.png')
const materialMars = new THREE.MeshBasicMaterial({
	map: textureMars
})
const geometryMars = new THREE.SphereGeometry(.102, 64, 64)
const mars = new THREE.Mesh(geometryMars, materialMars)

mars.position.x = 12.5

const orbitMars = new THREE.Group()
orbitMars.add(mars)
scene.add(orbitMars)

const textureJupiter = textureLoader.load('./textures/Jupiter/jupiter.png')
const materialJupiter = new THREE.MeshBasicMaterial({
	map: textureJupiter
})
const geometryJupiter = new THREE.SphereGeometry(.21, 64, 64)
const jupiter = new THREE.Mesh(geometryJupiter, materialJupiter)

jupiter.position.x = 20.4

const orbitJupiter = new THREE.Group()
orbitJupiter.add(jupiter)
scene.add(orbitJupiter)

const textureSaturn = textureLoader.load('./textures/Saturn/saturn.png')
const materialSaturn = new THREE.MeshBasicMaterial({
	map: textureSaturn
})
const geometrySaturn = new THREE.SphereGeometry(.18, 64, 64)
const saturn = new THREE.Mesh(geometrySaturn, materialSaturn)

saturn.position.x = 37.5

const orbitSaturn = new THREE.Group()
orbitSaturn.add(saturn)
scene.add(orbitSaturn)

const textureUranus = textureLoader.load('./textures/Uranus/uranus.png')
const materialUranus = new THREE.MeshBasicMaterial({
	map: textureUranus
})
const geometryUranus = new THREE.SphereGeometry(.076, 64, 64)
const uranus = new THREE.Mesh(geometryUranus, materialUranus)

uranus.position.x = 75

const orbitUranus = new THREE.Group()
orbitUranus.add(uranus)
scene.add(orbitUranus)

const textureNeptune = textureLoader.load('./textures/Neptune/neptune.png')
const materialNeptune = new THREE.MeshBasicMaterial({
	map: textureNeptune
})
const geometryNeptune = new THREE.SphereGeometry(.074, 64, 64)
const neptune = new THREE.Mesh(geometryNeptune, materialNeptune)

neptune.position.x = 138.5

const orbitNeptune = new THREE.Group()
orbitNeptune.add(neptune)
scene.add(orbitNeptune)

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

scene.add(simpleOrbit(3.5))
scene.add(simpleOrbit(5))
scene.add(simpleOrbit(7.5))
scene.add(simpleOrbit(12.5))
scene.add(simpleOrbit(20.4))
scene.add(simpleOrbit(37.5))
scene.add(simpleOrbit(75))
scene.add(simpleOrbit(138.5))

function animate() {
	requestAnimationFrame(animate)
	controls.update()

	orbitEarth.rotation.y -= .00298
	orbitMercury.rotation.y -= .00479
	orbitVenus.rotation.y -= .0035
	orbitMars.rotation.y -= .00241
	orbitJupiter.rotation.y -= .00131
	orbitSaturn.rotation.y -= .000967
	orbitUranus.rotation.y -= .000684
	orbitNeptune.rotation.y -= .000475

	earth.rotation.y -= 0.0167
	mercury.rotation.y -= 0.000109
	venus.rotation.y += 0.00065
	mars.rotation.y -= 0.0087
	jupiter.rotation.y -= 0.45
	saturn.rotation.y -= 0.36
	uranus.rotation.y -= 0.093
	neptune.rotation.y -= 0.0965
	
	renderer.render(scene, camera)
}

animate()

// ============================================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});