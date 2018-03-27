class GameOverScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'GameOverScene'
		})
	}
	create() {
		let bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'bg')
		bg.setOrigin(0, 0)

		let txtGameOver = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, `GAME OVER\nSCORE: ${score}\nLEVEL: ${level}\nHIGH SCORE: ${localStorage.highScore}\nHIGH LEVEL: ${localStorage.highLevel}\nPRESS ENTER TO PLAY AGAIN\nPRESS ESC TO GO TO MENU`, {
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
