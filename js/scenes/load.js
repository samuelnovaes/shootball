class LoadScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'LoadScene'
		})
	}
	preload() {
		let txtLoading = this.add.text(this.cameras.main.width / 2, 250, `LOADING...`, {
			font: '32px couriernew',
			fill: 'white',
			align: 'center',
			fontWeight: 'bold'
		})
		txtLoading.setOrigin(.5, .5)

		let progressBg = this.add.sprite(this.cameras.main.width / 2, 300, 'progressbg')
		progressBg.setOrigin(.5, .5)

		let progress = this.add.sprite(this.cameras.main.width / 2, 300, 'progress')
		progress.setOrigin(.5, .5)

		this.load.on('progress', value => {
			progress.setScale(value, 1);
		})

		this.load.image('player', 'img/player.png')
		this.load.image('bullet', 'img/bullet.png')
		this.load.image('enemy', 'img/enemy.png')
		this.load.image('logo', 'img/logo.png')
		this.load.image('bg', 'img/bg.jpg')
		this.load.image('pixel', 'img/pixel.png')
		this.load.audio('gameover', 'audio/gameover.mp3')
		this.load.audio('gun', 'audio/gun.mp3')
		this.load.audio('levelup', 'audio/levelup.mp3')
		this.load.audio('theme', 'audio/theme.mp3')
		this.load.audio('kill', 'audio/kill.mp3')
	}
	create() {
		audioTheme = this.sound.add('theme', {loop: true, volume: .3})
		audioTheme.play()
		this.scene.start('MenuScene')
	}
}
