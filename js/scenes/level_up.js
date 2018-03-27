class LevelUpScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'LevelUpScene'
		})
	}
	create() {
		let bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'bg')
		bg.setOrigin(0, 0)

		let txtLevelUp = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, `LEVEL ${level}\nPRESS ENTER`, {
			font: '32px couriernew',
			fill: 'white',
			align: 'center',
			fontWeight: 'bold'
		})
		txtLevelUp.setOrigin(.5, .5)

		window.onkeydown = e => {
			if (e.keyCode == 13) {
				this.scene.start('GameScene')
			}
		}
	}
}
