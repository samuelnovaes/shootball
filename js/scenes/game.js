class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'GameScene'
		})
	}
	create() {
		this.paused = false
		this.speedLevel = (1 + level / 10)
		this.numEnemies = level

		this.audioGun = this.sound.add('gun', {volume: .5})
		this.audioLevelup = this.sound.add('levelup')
		this.audioGameover = this.sound.add('gameover')
		this.audioKill = this.sound.add('kill')

		let bg = this.add.tileSprite(0, 0, 800, 600, 'bg')
		bg.setOrigin(0, 0)

		this.player = this.physics.add.sprite(400, 300, 'player')
		this.player.setOrigin(.5, .5)
		this.player.body.collideWorldBounds = true

		this.enemies = this.physics.add.group()
		this.enemies.enableBody = true

		this.bullets = this.physics.add.group()
		this.bullets.enableBody = true

		if(level > localStorage.highLevel){
			localStorage.highLevel = level
		}

		this.add.text(10, 10, 'LEVEL: ' + level, {
			font: '16px couriernew',
			fill: 'white',
			fontWeight: 'bold'
		})

		this.scoreView = this.add.text(10, 36, 'SCORE: ' + score, {
			font: '16px couriernew',
			fill: 'white',
			fontWeight: 'bold'
		})

		this.highScoreView = this.add.text(10, 62, 'HIGH SCORE: ' + localStorage.highScore, {
			font: '16px couriernew',
			fill: 'white',
			fontWeight: 'bold'
		})

		this.highLevelView = this.add.text(10, 88, 'HIGH LEVEL: ' + localStorage.highLevel, {
			font: '16px couriernew',
			fill: 'white',
			fontWeight: 'bold'
		})

		this.pausedView = this.add.text(400, 550, '', {
			font: '32px couriernew',
			fill: 'white',
			fontWeight: 'bold'
		})
		this.pausedView.setOrigin(.5, .5)

		this.bounds = this.physics.add.group()

		let boundLeft = this.bounds.create()
		boundLeft.setPosition(-25, 300)
		boundLeft.setSize(50, 600)

		let boundRight = this.bounds.create()
		boundRight.setPosition(825, 300)
		boundRight.setSize(50, 600)

		let boundTop = this.bounds.create()
		boundTop.setPosition(400, -25)
		boundTop.setSize(800, 50)

		let boundBottom = this.bounds.create()
		boundBottom.setPosition(400, 625)
		boundBottom.setSize(800, 50)

		this.spawnEnemies()

		this.cursors = this.input.keyboard.createCursorKeys()
		this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

		window.onkeydown = e => {
			if(e.keyCode == 27){
				this.paused = !this.paused
				if(this.paused){
					this.pausedView.setText('PAUSED')
					audioTheme.pause()
					this.timer.pause()
					this.scene.pause()
				}
				else {
					this.scene.resume()
					this.pausedView.setText('')
					this.timer.resume()
					audioTheme.resume()
				}
			}
		}
	}
	update() {
		let left = 0
		let right = 0
		this.player.body.velocity.x = this.player.body.velocity.y = 0

		if (this.cursors.left.isDown) {
			left = -1
		}
		if (this.cursors.right.isDown) {
			right = 1
		}

		if (this.cursors.up.isDown) {
			this.physics.velocityFromRotation(this.player.rotation, this.speedLevel * 100, this.player.body.velocity)
		}
		else if (this.cursors.down.isDown) {
			this.physics.velocityFromRotation(this.player.rotation, this.speedLevel * -100, this.player.body.velocity)
		}
		else {
			this.player.body.acceleration.set(0)
		}

		if (this.keySPACE.isDown) {
			if (!this.audioGun.isPlaying) {
				this.audioGun.play()
				this.createBullet()
			}
		}

		this.player.body.angularVelocity = this.speedLevel * (left + right) * 200

		this.physics.collide(this.enemies, this.enemies)
		this.physics.overlap(this.enemies, this.bullets, this.hitEnemy, null, this)
		this.physics.overlap(this.bounds, this.bullets, this.hitBound, null, this)
		this.physics.overlap(this.enemies, this.player, this.gameOver, null, this)
	}
	createEnemy() {
		let enemy = this.enemies.create(Math.random() * 800, 0, 'enemy')
		enemy.setOrigin(.5, .5)
		enemy.body.collideWorldBounds = true
		enemy.body.bounce.set(1)
		this.physics.velocityFromAngle(10 + Math.random() * 160, 200 * this.speedLevel, enemy.body.velocity)
	}
	async spawnEnemies(){
		for(let i = 0; i < level; i++){
			await this.timerPromise()
		}
	}
	timerPromise(){
		return new Promise((resolve, reject) => {
			this.timer = new Timer(() => {
				this.createEnemy()
				resolve()
			}, 1000 * (2 / (level * .5)))
		})
	}
	createBullet() {
		let bullet = this.bullets.create(this.player.x, this.player.y, 'bullet')
		bullet.setOrigin(.5, .5)
		bullet.rotation = this.player.rotation
		bullet.scene.physics.velocityFromRotation(bullet.rotation, 1000, bullet.body.velocity)
	}
	hitEnemy(enemy, bullet) {
		enemy.destroy()
		bullet.destroy()
		this.audioKill.play()
		this.numEnemies--
		score++
		if (score > localStorage.highScore) {
			localStorage.highScore = score
		}
		this.scoreView.setText('SCORE: ' + score)
		this.highScoreView.setText('HIGH SCORE: ' + localStorage.highScore)
		if (this.numEnemies == 0) {
			level++
			this.audioLevelup.play()
			this.scene.start('LevelUpScene')
		}
	}
	hitBound(bound, bullet){
		bullet.destroy()
	}
	gameOver() {
		this.audioGameover.play()
		this.scene.start('GameOverScene')
	}
}
