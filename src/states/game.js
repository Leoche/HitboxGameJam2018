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

    this.player = game.add.sprite(304, 165, 'player', 1);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.body.setSize(58, 131, 30, 30);
    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.set(0, 180);
    this.player.body.bounce.set(.1);

    this.game.camera.follow(this.player);
    this.game.add.sprite(this.player);

    this.cursors = game.input.keyboard.createCursorKeys();
  }
  update() {

    this.game.physics.arcade.collide(this.player, this.layer);
    if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;
        //this.player.play('left');
    }
    if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
        //player.play('right');
    }
    if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -500;
        //this.player.play('up');
    }
    if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 200;
        //player.play('down');
    }
    this.player.body.velocity.x *= 0.97;
  }
  render(){
    this.game.debug.body(this.player);
  }
  _startGame () {
    this.game.state.start('game');
  }
}
