(function(){
	var Game = function(canvasId) {
		var canvas = document.getElementById(canvasId);
		var screen = canvas.getContext("2d");
		var gameSize = {
			x: canvas.width,
			y: canvas.height
		};

		this.bodies = [new Player(this, gameSize)];

	 	var self = this;
	 	var tick = function() {
	 		self.update(gameSize);
	 		self.draw(screen, gameSize);
	 		requestAnimationFrame(tick);
	 	}

	 	tick();
	}

	Game.prototype = {
		update: function(gameSize) {
			for(var i = 0; i < this.bodies.length; i++){
				if(this.bodies[i].position.y <= 0)
				 	this.bodies.splice(i, 1)
			}

			for(var i = 0; i < this.bodies.length; i++){
				this.bodies[i].update();
			}
		},

		draw: function(screen, gameSize) {
			clearCanvas(screen, gameSize);
			for(var i = 0; i < this.bodies.length; i++) {
				drawRect(screen, this.bodies[i]);
			}
		},

		addBody: function(body) {
		this.bodies.push(body);
	}

	};

	var Player = function(game, gameSize) {
		this.game = game;
		this.bullits = 0;
		this.timer = 0;
		this.size = {width:16, height:16};
		this.position = {x: gameSize.x/2-this.size.width/2, y: gameSize.y/2-this.size.height/2}
		this.keyBoader = new keyBoader();
	}

	Player.prototype = {
		update: function() {
			if(this.keyBoader.isDown(this.keyBoader.KEYS.LEFT)) {
				this.position.x -= 6;
			};
			if(this.keyBoader.isDown(this.keyBoader.KEYS.RIGHT)) {
				this.position.x += 6;
			};
			if(this.keyBoader.isDown(this.keyBoader.KEYS.SPACE)) {
				if(this.bullits < 1){
				var bullet = new Bullet({x:this.position.x+this.size.width/2-1.5, y:this.position.y},
				{x:0,y:-6});
				this.game.addBody(bullet);
				this.bullits++;
				}

			};
			this.timer++;
			if(this.timer % 6 == 0){
				this.bullits = 0;
			}
		}
	}

	var Bullet = function(position, velosity) {
		this.size = {width:6, height:6};
		this.position = position;
		this.velosity = velosity;
	}

	Bullet.prototype =  {
		update: function() {
			this.position.x += this.velosity.x;
			this.position.y += this.velosity.y;
		}
	};

	var keyBoader = function() {
		var keyState = {};

		onkeydown = function(e) {
			keyState[e.keyCode] = true;
		}

		onkeyup = function(e) {
			keyState[e.keyCode] = false;
		}

		this.isDown = function(keyCode) {
			return keyState[keyCode] === true;
		}

		this.KEYS = {LEFT:37,RIGHT:39,SPACE:32};
	}

	var drawRect = function(screen, body) {
		screen.fillRect(body.position.x, body.position.y, body.size.width, body.size.height);
	}

	var clearCanvas = function(screen, gameSize) {
		screen.clearRect(0,0,gameSize.x,gameSize.y);
	}

	window.onload = function() {
		new Game("screen");
	}
})();
