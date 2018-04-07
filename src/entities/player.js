var Player = function (game, x, y) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    Phaser.Sprite.call(this, game, x, y, 'player');

    this.anchor.setTo(0.5, 1);
    this.realWidth = this.width;
    this.realHeight = this.height;

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.setSize(58, 131, 30, 30);
    this.body.collideWorldBounds = true;
    this.body.gravity.set(0, 180);
    this.body.mass = 20;
    this.body.bounce.set(.1);
    this.energy = 0;
    this.facing = 1;

    game.add.existing(this);

  };

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.update = function() {

    this.width = this.realWidth + this.energy*5;
    this.height = this.realHeight + this.energy*10;
    if(this.facing === 0){
      this.scale.x *= -1;
    }

    if(game.input.keyboard.isDown(87)){ // W
      this.energy += 2;
      if(this.energy > 100){
        this.energy = 100;
      }
    }else{
      this.energy -= 1;
      if(this.energy < 0){
        this.energy = 0;
      }
    }
    if(game.input.keyboard.isDown(37)){ // GAUCHE
      if (this.body.onFloor) this.body.velocity.x = -300;
      else this.body.velocity.x = -150;
      this.facing = 0;
    }
    if(game.input.keyboard.isDown(39)){ // DROITE
      if (this.body.onFloor) this.body.velocity.x = 300;
      else this.body.velocity.x = 150;
      this.facing = 1;
    }
    if(game.input.keyboard.isDown(38) && this.body.onFloor()){ // UP
      this.body.velocity.y = -500;
    }

    // Velocity
    this.body.velocity.x *= 0.97;
    if (this.body.onFloor()) {
      this.body.velocity.x *= 0.7;
    }

  };