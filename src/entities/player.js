class Player extends Phaser.Sprite {

    constructor(game, x, y) {
     super(game, x, y, "player", 0);
   }

    update() {
      this.x++;
    }
 }