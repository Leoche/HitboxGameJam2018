var Champiv = function (game, x, y, colliders) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    Phaser.Sprite.call(this, game, x, y, 'champi');

    this.anchor.setTo(0.5, 1);
    this.realWidth = this.width;
    this.realHeight = this.height;
    game.add.existing(this);

  };

  Champiv.prototype = Object.create(Phaser.Sprite.prototype);
  Champiv.prototype.constructor = Champiv;

  Champiv.prototype.update = function() {


  };
  Champiv.prototype.render = function() {


  };