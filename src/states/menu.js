class Menu extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.game.load.image('background', 'assets/images/UI/START.png');
    this.game.load.spritesheet('buttonCredits', 'assets/images/UI/BOUTONS_CREDITS.png',300,150,2);
    this.game.load.spritesheet('buttonPlay', 'assets/images/UI/BOUTONS_START.png',300,150,2);

  }

  create() {
    console.log("Menu!");
    this.background = this.game.add.image(0,0,'background');
    this.button = game.add.button(this.game.width-10, this.game.height-10, 'buttonPlay', this.startGame, this, 1, 2, 0);
    this.button.scale.setTo(0.7,0.7);
    this.button.anchor.set(1,1);

    this.button2 = game.add.button(10, this.game.height-10, 'buttonCredits', this.startCredits, this, 1, 2, 0);
    this.button2.scale.setTo(0.7,0.7);
    this.button2.anchor.set(0,1);
  }
  startGame() {
    this.game.state.start('level1');
  }
  startCredits() {
    this.game.state.start('menu');
  }
}