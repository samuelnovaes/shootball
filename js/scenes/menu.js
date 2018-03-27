class MenuScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'MenuScene'
		})
	}
	create() {
		let bg = this.add.tileSprite(0, 0, 800, 600, 'bg')
		bg.setOrigin(0, 0)

		let logo = this.add.sprite(400, 150, 'logo')
		logo.setOrigin(.5, .5)

		let txtMenu = this.add.text(400, 300, `SHOOTBALL\nHIGH SCORE: ${localStorage.highScore}\nHIGH LEVEL: ${localStorage.highLevel}\nPRESS ENTER TO START`, {
			font: '32px couriernew',
			fill: 'white',
			align: 'center',
			fontWeight: 'bold'
		})
		txtMenu.setOrigin(.5, .5)

		let txtCtrl = this.add.text(400, 450, 'CONTROLS\nSPACE: Shoot\nLEFT and RIGHT: rotate\nUP and DOWN: Go forward and backward\nESC: Pause an resume', {
			font: '16px couriernew',
			fill: 'white',
			align: 'center',
			fontWeight: 'bold'
		})
		txtCtrl.setOrigin(.5, .5)

		window.onkeydown = e => {
			if (e.keyCode == 13) {
				this.scene.start('LevelUpScene')
			}
		}
	}
}
