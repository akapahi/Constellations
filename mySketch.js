var particles = [];
var min_dist = 100;
var id = 1;
var qtree;
const capacity = 4;
var range;
var f = 0;
var af = 60;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	frameRate(120);
	const r = new Rectangle(0, 0, width, height);
}

function draw() {
	background(0);
	
	let fr = floor(frameRate());
	f += fr;
	if(frameCount % 60 == 0) {
		af = f/60;
		f=0;
	}
	
	push();
	noStroke();
	fill(250);
	text('avg. frame rate: ' + af, 0, 10);
	text('particles: ' + particles.length, 0, 23);
	pop();
		
	qtree = QuadTree.create();

	for (let p of particles) {
		let point = new Point(p.x, p.y, p);
		qtree.insert(point);
		p.display();
		
		range = new Circle(p.x, p.y, p.nd);

		p.checkNeighbor(qtree.query(range));
	}
}

function mousePressed() {
	particles.push(new Dot());
}

class Dot {
	constructor() {
		this.reset();
	}

	reset() {
		this.x = mouseX //Math.ceil(random(windowWidth))
		this.y = mouseY //Math.ceil(random(windowHeight))
		this.r = Math.ceil(random(255))
		this.g = Math.ceil(random(255))
		this.b = Math.ceil(random(255))
		this.a = 0.4
		this.size = random(4, 10);
		this.nd = map(this.size, 4, 10, 80, 100);
		this.xSpeed = random(-3, 3)
		this.ySpeed = random(-3, 3)
		this.neighborCount = map(this.size, 4, 10, 1, 3);
		this.neighbors = [];
	}

	display() {
		this.neighbors = [];
		let dotColor = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
		strokeWeight(this.size);
		stroke(dotColor);
		point(this.x, this.y);
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		this.checkBounds();
	}

	checkBounds() {
		if (this.x < 0 || this.x > windowWidth) this.xSpeed = -this.xSpeed;
		if (this.y < 0 || this.y > windowHeight) this.ySpeed = -this.ySpeed;
	}


	checkNeighbor(n) {
		this.neighbors = n;
		var i = 0;
		for (let other of n) {
			if (other.userData) {
				other = other.userData;
			}
			if (this != other || other.neighbors.length > 0) {
				var part_dist = dist(this.x, this.y, other.x, other.y);
				let dotColor = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
				stroke(this.r, this.g, this.b, map(part_dist, 0, this.nd, 255, 1));
				strokeWeight(map(part_dist, 0, this.nd, this.size * 0.70, 1));
				line(this.x, this.y, other.x, other.y);
			}
			i++;
			if(i>this.neighborCount) break;
		}
	}


}
