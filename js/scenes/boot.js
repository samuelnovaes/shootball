class BootScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'BootScene'
		})
	}
	preload() {
		this.load.image('progress', 'img/progress.png')
		this.load.image('progressbg', 'img/progressbg.png')
	}
	create() {
		this.scene.start('LoadScene')
	}
}
