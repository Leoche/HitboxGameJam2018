var Champi = function (game, x, y) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    
   
    // ******************** A décommenter **********************
    Phaser.Sprite.call(this, game, x, y, 'champiTronc');
    //Phaser.Sprite.call(this, game, x, y, 'champiFeuilles');
    
    
    var texture = game.add.renderTexture(game.width, game.height);
    texture.renderXY('champi', x, y, true);

    Phaser.Sprite.call(this, game, x, y, texture);

    game.add.existing(this);

  };

  Champi.prototype = Object.create(Phaser.Sprite.prototype);
  Champi.prototype.constructor = Champi;

  Champi.prototype.update = function() {

   

  };