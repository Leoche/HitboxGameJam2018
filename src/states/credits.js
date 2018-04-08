class Credits extends Phaser.State {

  constructor() {
   super();
 }

 preload() {

  this.game.load.image('background', 'assets/images/CREDITS_2.jpg');
  this.game.load.spritesheet('buttonBack', 'assets/images/BOUTONS_BACK.png',256,256,2);
}

create() {
  
  this.background = this.game.add.image(0,0,'background');

  this.button2 = game.add.button(10, 630, 'buttonBack', this._startGame, this, 2, 1, 0);
  this.button2.scale.setTo(0.6,0.6);
 /* this.button = this.game.add.button( 0 ,460,'button',this._startGame,this,2,1,0);

  this.button.position.x = this.game.world.centerX - (this.button.texture.width/2)

  this.button.input.useHandCursor = true;*/

}


customevent(){

}
_startGame () {
 this.game.state.start('menu');
}
}
