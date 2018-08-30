class GameOverScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'GameOverScene'
		})
	}
	create() {
		const bg = this.add.tileSprite(0, 0, 800, 600, 'bg')
		bg.setOrigin(0, 0)

		const txtGameOver = this.add.text(400, 300, `GAME OVER\nSCORE: ${score}\nLEVEL: ${level}\nHIGH SCORE: ${localStorage.highScore}\nHIGH LEVEL: ${localStorage.highLevel}\nPRESS ENTER TO PLAY AGAIN\nPRESS ESC TO GO TO MENU`, {
			font: '32px couriernew',
			fill: 'white',
			align: 'center',
			fontWeight: 'bold'
		})
		txtGameOver.setOrigin(.5, .5)

		level = 1
		score = 0

		window.onkeydown = e => {
			switch (e.keyCode) {
				case 13:
					this.scene.start('LevelUpScene')
					break
				case 27:
					this.scene.start('MenuScene')
					break
			}
		}
	}
}