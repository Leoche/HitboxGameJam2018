class Game extends Phaser.State {

  constructor() {
    super();
  }
  preload() {
    this.load.tilemap('forest', '/assets/levels/forest.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('terrain', '/assets/spritesheets/terrain.png');
    this.game.load.image('player', 'assets/images/player.png');
  }
  create() {
    console.log("Game!");
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
  }
  update() {
    var that = this;
    this.player.onFloor = false;
    this.game.physics.arcade.collide(this.player, this.layer);
    }
    render(){
      this.game.debug.body(this.player);
    }
    _startGame () {
      this.game.state.start('game');
    }
  }
