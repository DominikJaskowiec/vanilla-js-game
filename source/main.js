const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

class Engine {
	constructor() {
		this.defaultWindowSize = new Vector2(1024, 567);
		this.init();
		this.playerPos = new Vector2(200, 200)
		this.start;
	}
	init() {
		canvas.width = this.defaultWindowSize.x;
		canvas.height = this.defaultWindowSize.y;
		window.requestAnimationFrame(this.run);
	}
	run = (timestamp) => {
		// Delta Time Calculations
		this.deltaTime = (timestamp - this.start) * 0.001;
		this.start = timestamp;
		// console.log(this.deltaTime)
		
		this.playerPos = this.playerPos.add(new Vector2(1,0))
		this.render();
		window.requestAnimationFrame(this.run);
	}
	render() {
		drawRect(new Vector2(0,0), this.defaultWindowSize, 'white')
		drawCircle(this.playerPos, 100, 'red')
	}
}

class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(vector){
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}
}


function drawRect(p, s, c) {
	context.beginPath();
	context.rect(p.x, p.y, s.x, s.y);
	context.fillStyle = c;
	context.fill();
	context.closePath();
}

function drawCircle(p, r, c) {
	context.beginPath();
	context.arc(p.x, p.y, r, 0, Math.PI*2);
	context.fillStyle = c;
	context.fill();
	context.closePath();
}

const engine = new Engine();
