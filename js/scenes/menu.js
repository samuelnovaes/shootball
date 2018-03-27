class MenuScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'MenuScene'
		})
	}
	create() {
		let bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'bg')
		bg.setOrigin(0, 0)

		let logo = this.add.sprite(this.cameras.main.width / 2, 150, 'logo')
		logo.setOrigin(.5, .5)

		let txtMenu = this.add.text(this.cameras.main.width / 2, 300, `SHOOTBALL\nHIGH SCORE: ${localStorage.highScore}\nHIGH LEVEL: ${localStorage.highLevel}\nPRESS ENTER TO START`, {
			font: '32px couriernew',
			fill: 'white',
			align: 'center',
			fontWeight: 'bold'
		})
		txtMenu.setOrigin(.5, .5)

		let txtCtrl = this.add.text(this.cameras.main.width / 2, 450, 'CONTROLS\nSPACE: Shoot\nLEFT and RIGHT: rotate\nUP and DOWN: Go forward and backward', {
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
