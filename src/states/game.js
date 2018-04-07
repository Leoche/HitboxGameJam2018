class Game extends Phaser.State {

  constructor() {
    super();
  }
  preload() {
    this.load.tilemap('forest', '/assets/levels/forest.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('terrain', '/assets/spritesheets/terrain.png');
    this.game.load.image('player', 'assets/images/player.png');
    this.game.load.spritesheet('champi', 'assets/spritesheets/sprite_walk_cycle.png', 128, 128, 6);
  }
  create() {
    console.log("Game!");
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 600;

    this.map = this.game.add.tilemap('forest', 64, 64);
    this.map.addTilesetImage('terrain','terrain');

    this.layer = this.map.createLayer("terrain");
    this.colliderlayer = this.map.createLayer("collider");
    this.layer.resizeWorld();
    this.colliderlayer.resizeWorld();
    this.colliderlayer.visible = false;

    this.map.setCollision(6, true, this.colliderlayer);

    for(var i in this.map.objects){
      var obj = this.map.objects[i][0];
      if (obj.name === "player") {
        console.log('obj', obj.x);
        this.player = new Player(game, obj.x, obj.y, this.colliderlayer);
      }
    }

    this.game.camera.follow(this.player);
    this.game.add.sprite(this.player);
    var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    this.text = game.add.text(15, 15, "Energy: 0", style);
    this.text.fixedToCamera = true;
    this.text.anchor.set(0);
  }
  update() {
    this.game.physics.arcade.collide(this.player, this.colliderlayer);
    this.text.setText("Energy: " + this.player.energy);
  }
  render(){
    this.game.debug.body(this.player);
  }
  _startGame () {
    this.game.state.start('game');
  }
}
