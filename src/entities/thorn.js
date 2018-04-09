var Thorn = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'thorn',6);
    this.animThorn = this.animations.add('grow');
    this.animThorn.play(2,false);

    game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;

    game.add.existing(this);

  };

  Thorn.prototype = Object.create(Phaser.Sprite.prototype);
  Thorn.prototype.constructor = Thorn;

  Thorn.prototype.update = function() {



  };