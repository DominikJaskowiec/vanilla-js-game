const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

class Engine {
	constructor(size){
		canvas.width = size.x;
		canvas.height = size.y;
		this.objects = [];
		window.requestAnimationFrame(this.run)
	}
	run = () => {
		drawRect(new Vector2(canvas.width/2,canvas.height/2), new Vector2(canvas.width, canvas.height), '#ffffff');
		for (const obj of this.objects){
			obj?.update();
			obj?.draw();
		}
		window.requestAnimationFrame(this.run);
	}
}


class Player {
	constructor(position){
		this.globalPosition = new Vector2(20,10 );
		this.size = new Vector2(70,70);
		this.directionAxis = new Vector2(0, 0);
		this.velocity = new Vector2(0, 0);
		this.speed = 6;
	}
	update(){
		this.velocity = this.velocity.add(new Vector2(this.directionAxis.x, this.directionAxis.y)).normalize().scale(this.speed);
		this.globalPosition = this.globalPosition.add(this.velocity);
		this.velocity = new Vector2(0,0);
		this.directionAxis.x = input.left && input.right ? 0 : input.left ? -1 : input.right ? 1 : 0;
		this.directionAxis.y = input.up && input.down ? 0 : input.up ? -1 : input.down ? 1 : 0;
}

	draw(){
		drawRect(this.globalPosition, this.size, 'black')
	}
}

class Enemy {
	constructor(pos) {
		this.pos = pos;
		this.direction = new Vector2(0,0);
		this.speed = 2;
	}
	update(){
		this.direction = player.globalPosition.add(this.pos.scale(-1)).normalize();
		this.pos = this.pos.add(this.direction.scale(this.speed))
	}
	draw() {
		drawCircle(this.pos, 30, 'red')
	}
}


class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(diff){
		return new Vector2(this.x + diff.x, this.y + diff.y)
	}
	scale(scale){
		return new Vector2(this.x * scale, this.y * scale)
	}
	normalize(){
		this.normalizedLength = Math.sqrt(this.x ** 2 + this.y ** 2);

		if (this.normalizedLength > 0) {
			return new Vector2( this.x / this.normalizedLength, this.y / this.normalizedLength); 
		} else return new Vector2(this.x, this.y);
	}
}

function drawRect(pos, size, color){
	context.beginPath();
	context.rect(pos.x - (size.x/2), pos.y - (size.y/2), size.x, size.y);
	context.fillStyle = color;
	context.fill()
	context.closePath();
}

function drawCircle(pos, radius, color){
	context.beginPath();
	context.arc(pos.x, pos.y, radius, 0, Math.PI*2);
	context.fillStyle = color;
	context.fill();
	context.closePath();
}

let input = {
	left: false,
	right: false,
	down: false,
	up: false
}

window.addEventListener('keydown', (e) => {
	if (e.key == 'a'){ input.left = true }
	else if (e.key == 'd'){ input.right= true }
	else if (e.key == 'w'){ input.up = true }
	else if (e.key == 's'){ input.down = true }
});

window.addEventListener('keyup', (e) => {
	if (e.key == 'a'){ input.left = false }
	else if (e.key == 'd'){ input.right= false }
	else if (e.key == 'w'){ input.up = false }
	else if (e.key == 's'){ input.down = false }
});

const player = new Player(new Vector2(0, 0));
const enemy0 = new Enemy(new Vector2(0, 0));
const enemy1 = new Enemy(new Vector2(0, 500));
const enemy2 = new Enemy(new Vector2(1000, 500));

const engine = new Engine(new Vector2(1024, 567));
engine.objects.push(player, enemy0, enemy1, enemy2);
