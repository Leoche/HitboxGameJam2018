class Game extends Phaser.State {

  constructor() {
    super();
  }
  preload() {
    this.load.tilemap('forest', '/assets/levels/forest.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('terrain', '/assets/spritesheets/terrain.png');
    this.game.load.image('player', 'assets/images/player.png');
    this.game.load.image('champ_top1', 'assets/images/champ_01_top.png');
    this.game.load.image('champ_tile1', 'assets/images/champ_01_tile.png');
    this.game.load.image('champ_base1', 'assets/images/champ_01_base.png');
    this.game.load.spritesheet('champi', 'assets/spritesheets/sprite_walk_cycle.png', 128, 128, 6);
  }
  create() {
    this.debug = true;
    this.objects = [];
    console.log("Game!");
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 600;

    this.champis = [];
    this.physicsGroup = game.add.physicsGroup();

    this.map = this.game.add.tilemap('forest', 64, 64);
    this.map.addTilesetImage('terrain','terrain');

    this.layer = this.map.createLayer("terrain");
    this.colliderlayer = this.map.createLayer("collider");
    this.layer.resizeWorld();
    this.colliderlayer.resizeWorld();
    this.colliderlayer.visible = false;

    this.map.setCollision(6, true, this.colliderlayer);
    console.log('this.physicsGroup', this.physicsGroup);

    for(var i in this.map.objects.objects){
      var obj = this.map.objects.objects[i];
      if (obj.name === "player") {
        this.player = new Player(game, obj.x + 400, obj.y, this.colliderlayer);
        this.objects.push(this.player);
      } else if (obj.type === "champiv") {
        var newChamp = new Champiv(game, obj.x, obj.y);
        this.champis.push(newChamp);
        this.objects.push(newChamp);
        this.physicsGroup.add(newChamp);
      }
    }
    this.game.world.bringToTop(this.map);
    this.game.world.bringToTop(this.player);

    this.game.camera.follow(this.player);
    this.game.add.sprite(this.player);


    var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    this.text = game.add.text(15, 15, "Energy: 0", style);
    this.text.fixedToCamera = true;
    this.text.anchor.set(0);
  }
  update() {
    var that = this;
    this.player.touchingChamp = false;
    this.game.physics.arcade.collide(this.player, this.colliderlayer);
    this.game.physics.arcade.collide(this.player, this.physicsGroup, function () {
      that.player.touchingChamp = true;
    });
    this.text.setText("Energy: " + this.player.energy);
  }
  render(){
    return;
    for(var i in this.objects){
      this.game.debug.body(this.objects[i]);
    }
  }
  _startGame () {
    this.game.state.start('game');
  }
}
