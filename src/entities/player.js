var Player = function (game, x, y, colliders) {

//  We call the Phaser.Sprite passing in the game reference
//  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
Phaser.Sprite.call(this, game, x, y, 'player');

this.isAlive = true;
this.initialX = x;
this.initialY = y-200;
this.hasJumped = false;
this.lockedTo = null;

this.addSounds();
this.game = game;
this.anchor.setTo(0.5, 1);
this.realWidth = this.width;
this.realHeight = this.height;

this.walkAnim = this.animations.add('walk',[0,1,2,3,4,5,6,7,8,9],5);
this.animations.add('idle',[10,11,12,13,14],10);
this.animations.add('jump',[20,21,22,23,24,25,26],5);
this.animations.add('run',[30,31,32,33,34,35],5);
this.animations.add('die',[40,41,42,43],5);


game.physics.enable(this, Phaser.Physics.ARCADE);

this.body.setSize(40, 105, 42, 20);
this.body.collideWorldBounds = true;
this.body.gravity.set(0, 180);
this.body.mass = 40;
this.body.bounce.set(.1);
this.energy = 0;
this.facing = 1;
this.colliders = colliders;
this.touchingChampTop = false;
this.tint = 0xFFFFFF;

game.add.existing(this);
game.world.bringToTop(this);

};


Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
  if(this.isAlive){
    if(this.game.controls.left){
      this.key_gauche();
    }
    else if(this.game.controls.right){
      this.key_droite();
    }
    else{
      this.body.velocity.x = 0;
    }
    /* up*/
    if(this.game.controls.up){
        if(!this.hasJumped && (this.body.onFloor() || this.lockedTo != null)){
          this.hasJumped = true;
          this.body.velocity.y = -700;
          this.fxJump.play('jump');
          this.lockedTo == null;
      }
    }else if(this.body.onFloor() || this.lockedTo != null){
      this.hasJumped = false;
    }
    this.anim();

    /*Velocity*/


    this.game.physics.arcade.collideSpriteVsTilemapLayer(this, this.colliders);

    if(this.lockedTo != null) {
      if(this.body.right < this.lockedTo.body.x ||
         this.body.x > this.lockedTo.body.right ||
         Math.abs(this.body.y + this.body.height - this.lockedTo.body.y) > 50){
        this.lockedTo = null;
      } else if(!this.hasJumped){
        this.body.y = this.lockedTo.body.y - this.body.height;
      }
    }
  }else{
    this.tint = 0x996666;
    this.body.velocity.x = 0;
    if(this.frame < 40) this.animations.play('die',5,false);
  }
    if(this.game.controls.restart){
      this.restart();
    }


    this.game.physics.arcade.collideSpriteVsTilemapLayer(this, this.colliders);

    if(this.facing === 0 && this.scale.x > 0){
      this.scale.x *= -1;
    }else if(this.facing !== 0 && this.scale.x < 0){
      this.scale.x *= -1;
    }
  };



  Player.prototype.addSounds = function(){
    this.fxJump = this.fx = game.add.audio('jump');
    this.fxJump.allowMultiple = true;
    this.fxJump.addMarker('jump', 0, 2);
    this.fxWalk = this.fx = game.add.audio('walk');
    this.fxWalk.addMarker('walk', 0, 10);
    this.fxEcho = this.fx = game.add.audio('echoPas');
    this.fxEcho.addMarker('echoPas', 0, 10);
  }

  Player.prototype.collisionHandler = function (player, ronce) {
    this.isAlive = false;
  }

  Player.prototype.restart = function(){
    this.body.x = this.initialX;
    this.body.y = this.initialY;
    this.body.velocity.y = 0;
    this.isAlive = true;
    this.tint = 0xFFFFFF;
  }

  Player.prototype.key_gauche= function(){
    if (this.body.onFloor || this.touchingChampTop)
    {
      this.body.velocity.x = -300;
    }
    else{
      this.body.velocity.x = -150;
    }
    this.facing = 0;
  }

  Player.prototype.key_droite= function(){
    if (this.body.onFloor) this.body.velocity.x = 300-this.energy*1.5;
    else this.body.velocity.x = 150;
    this.facing = 1;
  }

  Player.prototype.anim= function(){
    if(this.body.onFloor() || this.lockedTo != null){
      if(Math.abs(this.body.velocity.x) < 1){
        this.animations.play('idle', 10, true);
      } else if(Math.abs(this.body.velocity.x) < 400){
        this.animations.play('run', 10, true);
      }
    }else{
      if(this.body.velocity.y > 0){
        this.frame = 24;
      }else{
        this.frame = 22;
      }
    }
  }


  Player.prototype.anyKeyPressed = function(keyboard){
    if(keyboard.isDown(87) || keyboard.isDown(37)|| keyboard.isDown(37)|| keyboard.isDown(39) || keyboard.isDown(38) || keyboard.isDown(82)){
      return true;
    }
  }
