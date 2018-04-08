var Champiv = function (game, x, y, tigeHeight, chapeauWidth) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    Phaser.Sprite.call(this, game, x, y, 'champ_base1');

    this.anchor.setTo(0.5, 1);
    this.realWidth = this.width;
    this.realHeight = this.height;
    this.tigeHeight = tigeHeight*64;
    this.tigeHeightMax = tigeHeight*64;
    this.chapeauWidth = chapeauWidth*64 + 64;
    this.chapeauCollisionOffsetX = 10


    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(this.chapeauWidth + this.chapeauCollisionOffsetX, 30, 256 + this.chapeauCollisionOffsetX - this.chapeauWidth / 2, 290 - this.tigeHeight);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.body.checkCollision.down = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.left = false;

    this.addChild(game.make.image(-18, -630, 'champ_tile1'));
    this.addChild(game.make.image(-256, -290, 'champ_top1'));
    this.cropRect = new Phaser.Rectangle(0, 0, 78, 20);
    this.getChildAt(0).crop(this.cropRect);
    game.add.existing(this);
  };

  Champiv.prototype = Object.create(Phaser.Sprite.prototype);
  Champiv.prototype.constructor = Champiv;

  Champiv.prototype.update = function() {
    this.cropRect.height = this.tigeHeight;
    this.body.setSize(this.chapeauWidth + this.chapeauCollisionOffsetX, 30, 256 + this.chapeauCollisionOffsetX - this.chapeauWidth / 2, 290 - this.tigeHeight);
    this.getChildAt(0).updateCrop();
    this.getChildAt(0).y = -630 + 512 - this.tigeHeight;
    this.getChildAt(1).y = -630 + 340 - this.tigeHeight;
    if(game.input.keyboard.isDown(87)){
      if(this.tigeHeight > 5) {
        this.tigeHeight -= 5;
      }
    }else{
      if(this.tigeHeight <  this.tigeHeightMax) {
        this.tigeHeight += .2;
      }
    }
  };