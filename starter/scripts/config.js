const config = {
	shadows: {
		resolution: 2048,
		noramlBias: .05
	},
	lighting: {
		ambientIntensity: .4,
		directionalIntensity: 1.75,
		directionalPosition: [ 5, 10, 7 ]
	},
	camera: {
		fov: 60,
		position: [ 4, 4, 8 ],
		near: .1,
		far: 5000
	},
	material: {
		roughness: .7,
		metallness: 0
	}
}

export default config