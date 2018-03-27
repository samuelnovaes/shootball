localStorage.highScore = localStorage.highScore || 0
localStorage.highLevel = localStorage.highLevel || 0

let score = 0
let level = 1
let audioTheme

const game = new Phaser.Game({
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
	parent: 'game',
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: [
		BootScene,
		LoadScene,
		MenuScene,
		LevelUpScene,
		GameScene,
		GameOverScene
	]
})
