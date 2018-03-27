class Timer {
	constructor(callback, delay){
		this.callback = callback
		this.remaining = delay
		this.resume()
	}

	pause() {
		clearTimeout(this.timerId)
		this.remaining -= new Date() - this.start
	}

	resume(){
		if(!this.lock){
			this.start = new Date()
			window.clearTimeout(this.timerId)
			this.timerId = window.setTimeout(() => {
				this.lock = true
				this.callback()
			}, this.remaining)
		}
	}
}
