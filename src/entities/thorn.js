var Thorn = function (game, x, y, sens, start) {

    Phaser.Sprite.call(this, game, x+32, y+32, 'thorn',6);
    this.anchor.setTo(0.5, 0.5);
    this.sens = sens;
    this.start = start;
    this.animThorn = this.animations.add('grow');
    this.animThorn.play(3,true);
    console.log('start', parseInt(start))
    this.animations.currentAnim.setFrame(parseInt(start), true);

    game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
    if(this.sens == "down") this.angle = 180;

    this.body.setSize(52,64,6,0);
    game.add.existing(this);
  };

  Thorn.prototype = Object.create(Phaser.Sprite.prototype);
  Thorn.prototype.constructor = Thorn;

  Thorn.prototype.update = function() {
    if(this.sens == "up"){
      this.body.setSize(52,this.frame * 10,6,74-this.frame * 10);
    }else{
      this.body.setSize(52,this.frame * 10,6,-10);
    }
  };