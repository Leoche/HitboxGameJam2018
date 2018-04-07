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
    this.map = this.game.add.tilemap('forest', 64, 64);
    this.map.addTilesetImage('terrain','terrain');
    this.map.setCollisionBetween(0, 83);

    this.layer = this.map.createLayer("collider");
    this.layer.resizeWorld();

    this.player = game.add.sprite(104, 165, 'player', 1);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 200;
    this.player.body.setSize(58, 131, 30, 30);
    this.player.body.collideWorldBounds = true;
    this.game.camera.follow(this.player);
    this.game.add.sprite(this.player);

    this.cursors = game.input.keyboard.createCursorKeys();
  }
  update() {

    this.game.physics.arcade.collide(this.player, this.layer);
    this.player.body.velocity.set(0);
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
        this.player.body.velocity.y = -200;
        //this.player.play('up');
    }
    if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 200;
        //player.play('down');
    }
  }
  render(){
    this.game.debug.body(this.player);
  }
  _startGame () {
    this.game.state.start('game');
  }
}
