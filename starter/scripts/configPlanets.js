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
		sun: 1.5,
		earth: .191,
		mercury: .0732,
		venus: .101,
		mars: .102,
		jupiter: .71,
		saturn: .58,
		uranus: .36,
		neptune: .24,
	},
	position: {
		earth: 7.5,
		mercury: 3.5,
		venus: 5,
		mars: 12.5,
		jupiter: 20.4,
		saturn: 37.5,
		uranus: 75,
		neptune: 138.5,
	},
	rotation: {
		orbit: {
			earth: .00298,
			mercury: .00479,
			venus: .0035,
			mars: .00241,
			jupiter: .00131,
			saturn: .000967,
			uranus: .000684,
			neptune: .000475,
		},
		axis: {
			earth: 0.00167,
			mercury: 0.000109,
			venus: 0.00065,
			mars: 0.0087,
			jupiter: 0.0045,
			saturn: 0.0036,
			uranus: 0.0093,
			neptune: 0.00965,
		}
	}
}

export default configPlanets