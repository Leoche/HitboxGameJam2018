var Champiv = function (game, x, y, colliders) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    Phaser.Sprite.call(this, game, x, y, 'champ_base1');

    this.anchor.setTo(0.5, 1);
    this.realWidth = this.width;
    this.realHeight = this.height;


    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(295, 30, 130, 0);
    this.body.allowGravity = false;
    this.body.immovable = true;

    this.addChild(game.make.image(-18, -630, 'champ_tile1'));
    this.addChild(game.make.image(-256, -290, 'champ_top1'));
    this.tile_height = 300;
    this.cropRect = new Phaser.Rectangle(0, 0, 78, 20);
    this.getChildAt(0).crop(this.cropRect);
    game.add.existing(this);
  };

  Champiv.prototype = Object.create(Phaser.Sprite.prototype);
  Champiv.prototype.constructor = Champiv;

  Champiv.prototype.update = function() {
    this.cropRect.height = this.tile_height;
    this.body.setSize(295, 30, 130, 290 - this.tile_height);
    this.getChildAt(0).updateCrop();
    this.getChildAt(0).y = -630 + 512 - this.tile_height;
    this.getChildAt(1).y = -630 + 340 - this.tile_height;
    if(game.input.keyboard.isDown(87)){
      if(this.tile_height > 5) {
        this.tile_height -= 5;
      }
    }else{
      if(this.tile_height < 300) {
        this.tile_height += .2;
      }
    }
  };