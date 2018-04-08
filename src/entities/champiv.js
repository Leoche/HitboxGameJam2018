var Champiv = function (game, x, y, type, tigeHeight, chapeauWidth) {
  Phaser.Sprite.call(this, game, x, y);

  this.anchor.setTo(0.5, 1);
  this.type = type;
  this.realWidth = this.width;
  this.realHeight = this.height;
  this.tigeHeight = tigeHeight*64;
  this.tigeHeightMax = tigeHeight*64;
  this.chapeauWidth = chapeauWidth*64 + 64;
  this.chapeauWidthTile = chapeauWidth;
  this.chapeauCollisionOffsetX = 5;
  this.tick=0;


  game.physics.enable(this, Phaser.Physics.ARCADE);
    // this.body.setSize(this.chapeauWidth + this.chapeauCollisionOffsetX, 30, 256 + this.chapeauCollisionOffsetX - this.chapeauWidth / 2, 290 - this.tigeHeight);
    this.body.setSize(this.chapeauWidth + this.chapeauCollisionOffsetX, 80, this.chapeauCollisionOffsetX*this.chapeauWidthTile - this.chapeauWidth / 2, -200- this.tigeHeight);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.body.checkCollision.down = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.left = false;

    this.alpha = 1;
    this.tinter = false;

    this.base = this.game.make.group();
    this.sprites = this.game.make.group();

    this.base.add(game.make.image(-260, -530, 'champ_base_alive'));
    this.sprites.add(game.make.image(-25, -140, 'champ_tile_alive'));
    if(this.chapeauWidthTile < 3){
      this.sprites.add(game.make.image(-265, -365, 'champ_top3_alive'));
      this.sprites.add(game.make.image(-265, -365, 'veine_top3_alive'));
    }
    else if(this.chapeauWidthTile == 3){
      this.sprites.add(game.make.image(-265, -365, 'champ_top1_alive'));
      this.sprites.add(game.make.image(-265, -365, 'veine_top1_alive'));
    }
    else if(this.chapeauWidthTile > 3){
      this.sprites.add(game.make.image(-265, -365, 'champ_top2_alive'));
      this.sprites.add(game.make.image(-265, -365, 'veine_top2_alive'));
    }
    this.addChild(this.sprites);
    this.addChild(this.base);
    this.cropRect = new Phaser.Rectangle(0, 0, 78, 20);
    this.sprites.getChildAt(0).crop(this.cropRect);
    this.interacting = false;
    game.add.existing(this);
  };

  Champiv.prototype = Object.create(Phaser.Sprite.prototype);
  Champiv.prototype.constructor = Champiv;

  Champiv.prototype.interact = function() {
    this.interacting = true;
    if(this.type == "down" && this.tigeHeight > 64) this.tigeHeight -= 5;
    if(this.type == "up" && this.tigeHeight < this.tigeHeightMax+this.tigeHeightMax) this.tigeHeight += 5;
  }
  Champiv.prototype.update = function() {
    this.cropRect.height = this.tigeHeight;
    this.body.setSize(this.chapeauWidth + this.chapeauCollisionOffsetX, 80, this.chapeauCollisionOffsetX*this.chapeauWidthTile - this.chapeauWidth / 2, -200 - this.tigeHeight);

    this.sprites.getChildAt(0).updateCrop();
    this.sprites.getChildAt(0).y = -110 - this.tigeHeight;
    this.sprites.getChildAt(1).y = -640 + 380 - this.tigeHeight;
    this.sprites.getChildAt(2).y = -640 + 380 - this.tigeHeight;
    this.bringToTop();
    if(!this.interacting){
      if(this.type == "up" && this.tigeHeight > this.tigeHeightMax) this.tigeHeight -= .8;
      if(this.type == "down" && this.tigeHeight < this.tigeHeightMax) this.tigeHeight += .8;
    }
    if(this.tinter){
      if(this.sprites.getChildAt(2).alpha != 1){
        this.sprites.getChildAt(2).alpha+=.05;
        if(this.sprites.getChildAt(2).alpha>1){
          this.sprites.getChildAt(2).alpha = 1;
        }
      }else{
          this.sprites.getChildAt(2).alpha = 0.6;
      }
    }else{
      if(this.sprites.getChildAt(2).alpha != 0){
        this.sprites.getChildAt(2).alpha-=.05;
        if(this.sprites.getChildAt(2).alpha<0) this.sprites.getChildAt(2).alpha = 0;
      }
    }
    this.interacting = false;
  };