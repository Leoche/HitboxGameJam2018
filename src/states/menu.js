class Menu extends Phaser.State {

  constructor() {
   super();
 }

 preload() {

  this.game.load.image('background', 'assets/images/UI/START.png');

  this.game.load.spritesheet('buttonCredits', 'assets/images/UI/BOUTONS_CREDITS.png',256,256,2);
  this.game.load.spritesheet('buttonPlay', 'assets/images/UI/BOUTONS_START.png',256,256,2);

}

create() {
  console.log("Menu!");



  this.background = this.game.add.image(0,0,'background');

  //this.input.onDown.add(this._startGame, this);
  this.button = game.add.button(game.world.centerX +300, 600, 'buttonPlay', actionOnClick, this, 2, 1, 0);
  this.button2 = game.add.button(game.world.centerX -500, 600, 'buttonCredits', actionOnClickCredits, this, 2, 1, 0);
  this.button.scale.setTo(0.7,0.7);
  this.button2.scale.setTo(0.8,0.8);
    // button.onInputOver.add(over, this);
    // button.onInputOut.add(out, this);
    // button.onInputUp.add(up, this);
  // this.button.position.x = this.game.world.centerX - (this.button.texture.width/2)

  // this.button.input.useHandCursor = true;

}


customevent(){

}
_startGame () {
 this.game.state.start('level1');
}
}



//button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);






function actionOnClick () {

  this.game.state.start('game');

}
function actionOnClickCredits () {

  this.game.state.start('credits');

}