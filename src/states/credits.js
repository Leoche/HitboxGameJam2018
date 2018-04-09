class Credits extends Phaser.State {

  constructor() {
   super();
 }

 preload() {

  this.game.load.image('background', 'assets/images/UI/CREDITS.jpg');
  this.game.load.spritesheet('buttonBack', 'assets/images/UI/BOUTONS_BACK.png',300,150,2);
}

create() {

  this.background = this.game.add.image(0,0,'background');

  this.button2 = game.add.button(10, this.game.height-10, 'buttonBack', this._startGame, this, 1, 2, 0);
  this.button2.anchor.set(0,1);
  this.button2.scale.setTo(0.5,0.5);
}


customevent(){

}
_startGame () {
 this.game.state.start('menu');
}
}
