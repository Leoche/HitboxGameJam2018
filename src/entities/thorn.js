var Thorn = function (game, x, y) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor


    Phaser.Sprite.call(this, game, x, y, 'thorn',6);
   	//this.thorn = this.game.add.sprite(1000,1152,'thorn',6);
    this.animThorn = this.animations.add('grow');
    this.animThorn.play(2,false);

    game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
	//this.body.gravity.set(0, 0);
	//this.body.mass = 0;





    game.add.existing(this);

  };

  Thorn.prototype = Object.create(Phaser.Sprite.prototype);
  Thorn.prototype.constructor = Thorn;

  Thorn.prototype.update = function() {



  };