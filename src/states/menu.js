class Menu extends Phaser.State {

    constructor() {
     super();
   }

    preload() {
      this.game.load.image('background', 'assets/background.png');
    }

    create() {
      console.log("Menu!");
      this.background = this.game.add.image(0,0,'background');
      this.input.onDown.add(this._startGame, this);
    }

    _startGame () {
     this.game.state.start('game');
   }
 }
