var Player = function (game, x, y, colliders) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    Phaser.Sprite.call(this, game, x, y, 'champi');
    this.game = game;
    this.anchor.setTo(0.5, 1);
    this.realWidth = this.width;
    this.realHeight = this.height;
    this.animations.add('walk');
    this.animations.play('walk', 10, true);
    this.animations.stop();

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.setSize(40, 105, 42, 20);
    this.body.collideWorldBounds = true;
    this.body.gravity.set(0, 180);
    this.body.mass = 20;
    this.body.bounce.set(.1);
    this.energy = 0;
    this.facing = 1;
    this.colliders = colliders;
    this.touchingChamp = false;

    game.add.existing(this);

  };

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.update = function() {
    this.scale.setTo(1 + this.energy*.01, 1 + this.energy*.01)
    this.body.updateBounds(this.scale.x, this.scale.y);
    if(this.facing === 0){
      this.scale.x *= -1;
    }

    if(game.input.keyboard.isDown(87) && (this.body.onFloor())){ // W
      this.energy += 2;
      if(this.energy > 100){
        this.energy = 100;
      }
    }else{
      this.energy -= 0.5;
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
    if(game.input.keyboard.isDown(38) && (this.body.onFloor() || this.touchingChamp)){ // UP
      this.body.velocity.y = -700;
    }
    if(Math.abs(this.body.velocity.x) > 10 && (this.body.onFloor() || this.touchingChamp)){
      this.animations.play('walk', 10, true);
    }
    else{
      if(this.body.onFloor() || this.touchingChamp) this.frame = 3;
      else this.frame = 6;
    }

    // Velocity
    this.body.velocity.x *= 0.97;
    if (this.body.onFloor() || this.touchingChamp) {
      this.body.velocity.x *= 0.7;
    }

    this.game.physics.arcade.collideSpriteVsTilemapLayer(this, this.colliders);

  };