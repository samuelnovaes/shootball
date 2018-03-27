class LevelUpScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'LevelUpScene'
		})
	}
	create() {
		let bg = this.add.tileSprite(0, 0, 800, 600, 'bg')
		bg.setOrigin(0, 0)

		let txtLevelUp = this.add.text(400, 300, `LEVEL ${level}\nPRESS ENTER`, {
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
