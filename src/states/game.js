class Game extends Phaser.State {

  constructor() {
    super();
  }
  preload() {
  }
  create() {
    console.log("Game!");
  }
  update() {
  }
  _startGame () {
    this.game.state.start('game');
  }
}
