var particles = [];
var min_dist = 100;
var id = 1;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	frameRate(50);
}

function draw() {
	background(0);
	for(var i =0; i < particles.length; i++){
		particles[i].display();
	}
}

function mousePressed(){
	particles.push(new Dot());
}

class Dot{
	constructor(){
		this.reset();
	}
	
	reset(){
		this.x = mouseX //Math.ceil(random(windowWidth))
		this.y = mouseY //Math.ceil(random(windowHeight))
		this.r = Math.ceil(random(255))
		this.g = Math.ceil(random(255))
		this.b = Math.ceil(random(255))
		this.a = 0.4
		this.size = random(4,10);
		this.xSpeed = random(-3,3)
		this.ySpeed = random(-3,3)
		this.neighborCount = map(this.size, 4, 10, 1, 3);
		this.neighbors = [];
		this.id = id++;
	}
	
	display(){
		let dotColor = 'rgba('+this.r +','+ this.g+','+ this.b+','+ this.a+')';
		strokeWeight(this.size);
		stroke(dotColor);
		point(this.x,this.y);
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		this.checkBounds();
		this.checkNeighbor();
	}
	
	checkBounds(){
		if(this.x < 0 || this.x > windowWidth) this.xSpeed = -this.xSpeed;	
		if(this.y < 0 || this.y > windowHeight) this.ySpeed = -this.ySpeed;
	}
	
	
	checkNeighbor(){
		this.neighbors = [];
		var neighborCount = 0;
		for(var i = 0; i < particles.length; i++){
			if(particles[i] != this){
				var x1 = particles[i].x;
				var y1 = particles[i].y;
				var part_dist = dist(this.x, this.y, x1, y1);
				if(part_dist <= min_dist){
					if(!particles[i].contains(this)){
						this.neighbors.push(particles[i])
						let dotColor = 'rgba('+this.r +','+ this.g+','+ this.b+','+ this.a+')';
						stroke(this.r, this.g, this.b, map(part_dist, 0, min_dist, 255, 1));
						strokeWeight(map(part_dist, 0, min_dist, this.size * 0.70, 1));
						line(this.x, this.y, x1, y1);
						neighborCount++;
					}
				}
			}
			if(neighborCount >= this.neighborCount) break;
		}
	}
	
	contains(dot){
		for(var i = 0; i < this.neighbors.length; i++){
			if(this.neighbors[i] == dot) return true;
			var n = this.neighbors[i];
			for(var j = 0; j < n.neighbors.length; j++){
				if(n.neighbors[j] == dot) return true;
			}
		}
		return false;
	}
	
	
}