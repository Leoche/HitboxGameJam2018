class Game extends Phaser.State {
// c'est quoi le 1 en 4° arg du sprite ?
  constructor() {
    super();
  }
  preload() {
    this.game.load.image('background', 'assets/images/background.png')
    this.load.tilemap('forest', '/assets/levels/forest.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('terrain', '/assets/spritesheets/terrain.png');
    this.game.load.image('player', 'assets/images/player.png');
    
    // added assets
    // this.game.load.image('thorn', 'assets/images/Ronces/ronce1Etat1.png')
    //this.game.load.spritesheet('mummy','assets/spritesheets/momie.png', 37, 45, 18);// ?,y,?
    this.game.load.spritesheet('thorn', 'assets/spritesheets/roncesFusionner02.png',64,64,6);


  }
  create() {
    console.log("Game!");
    this.background = this.game.add.image(0,0,'background');
    this.background.fixedToCamera = true;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 600;

    this.map = this.game.add.tilemap('forest', 64, 64);
    this.map.addTilesetImage('terrain','terrain');
    this.map.setCollisionBetween(0, 83);

    this.layer = this.map.createLayer("collider");
    this.layer.resizeWorld();

    this.player = new Player(game, 304, 165);

    this.game.camera.follow(this.player);
    this.game.add.sprite(this.player);
    this.paulsBullshit();
    var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    this.text = game.add.text(15, 15, "Energy: 0", style);
    this.text.fixedToCamera = true;
    this.text.anchor.set(0);
  }
  update() {
    var that = this;
    this.player.onFloor = false;
    this.game.physics.arcade.collide(this.player, this.layer);
    this.text.setText("Energy: " + this.player.energy);
  }
  paulsBullshit(){

    //this.anim.onStart.add(this.animationStarted, this);
    this.thorn = this.game.add.sprite(1000,1152,'thorn',6);
    this.animThorn = this.thorn.animations.add('grow');
    this.animThorn.play(5,true);
  }
  render(){
    this.game.debug.body(this.player);
  }
  _startGame () {
    this.game.state.start('game');
  }
  animationStarted(){

  }
}
