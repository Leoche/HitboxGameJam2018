class Game extends Phaser.State {
// c'est quoi le 1 en 4° arg du sprite ?
  constructor() {
    super();
  }
  preload() {
    this.game.load.image('background', 'assets/images/background.png')
    this.load.tilemap('forest', '/assets/levels/forest.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', '/assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('terrain', '/assets/spritesheets/terrain.png');
    this.game.load.image('bg1', 'assets/images/DEAD_01.png');
    this.game.load.image('bg2', 'assets/images/DEAD_02.png');
    this.game.load.image('bg3', 'assets/images/DEAD_03.png');
    this.game.load.image('champ_top1', 'assets/images/champ_01_top.png');
    this.game.load.image('champ_tile1', 'assets/images/champ_01_tile.png');
    this.game.load.image('champ_base1', 'assets/images/champ_01_base.png');
    this.game.load.spritesheet('player', 'assets/spritesheets/SPRITE_CHAMPI.png', 128, 128, 50);
    this.game.load.spritesheet('thorn', 'assets/spritesheets/RoncesFusionner02.png',64,64,6);
    this.game.load.audio('jump', 'assets/audio/jump.wav');
    this.game.load.audio('walk', 'assets/audio/walk.mp3')
  }
  create() {
    this.debug = true;
    this.objects = [];
    console.log("Game!");


    this.bg1 = this.game.add.tileSprite(0,0,2400,1000,'bg1');
    this.bg1.anchor.setTo(0.5);
    this.bg2 = this.game.add.tileSprite(0,0,2400,1000,'bg2');
    this.bg2.anchor.setTo(0.5);
    this.bg3 = this.game.add.tileSprite(0,0,2400,1000,'bg3');
    this.bg3.anchor.setTo(0.5);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 600;

    this.champis = [];
    this.ronceGroup = this.game.add.physicsGroup()
    this.physicsGroup = game.add.physicsGroup();

    this.map = this.game.add.tilemap('level2', 64, 64);
    this.map.addTilesetImage('terrain','terrain');

    this.layer = this.map.createLayer("terrain");
    this.colliderlayer = this.map.createLayer("collider");
    this.layer.resizeWorld();
    this.colliderlayer.resizeWorld();
    this.colliderlayer.visible = false;


    this.layerover = this.map.createLayer("terrainover");
    this.layerover.resizeWorld();

    this.map.setCollision(6, true, this.colliderlayer);
    console.log('this.physicsGroup', this.physicsGroup);

    for(var i in this.map.objects.objects){
      var obj = this.map.objects.objects[i];
      if (obj.name === "player") {
        console.log('Added player');
        this.player = new Player(game, obj.x, obj.y, this.colliderlayer);
        this.objects.push(this.player);
      } else if (obj.type === "champiv") {
        console.log('Added champiv');
        var newChamp = new Champiv(game, obj.x, obj.y, obj.properties.height, obj.properties.chapeau);
        this.champis.push(newChamp);
        this.objects.push(newChamp);
        this.physicsGroup.add(newChamp);
      }
      else if (obj.type === "ronce"){
        console.log('Added ronce');
        var thorn = new Thorn(game, obj.x, obj.y);
        this.objects.push(thorn);
        this.ronceGroup.add(thorn);
      }
    }

    this.thorn = new Thorn(game, 500, 1088);
    this.ronceGroup.add(this.thorn);

    this.game.camera.follow(this.player);
    this.game.add.sprite(this.player);
    var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    this.text = game.add.text(15, 15, "Energy: 0", style);
    this.text.fixedToCamera = true;
    this.text.anchor.set(0);
  }
  update() {
    console.log(this.game.camera.x)
    console.log(this.game.camera.y)
    var that = this;
    this.player.touchingChamp = false;
    this.game.physics.arcade.collide(this.player, this.colliderlayer);
    this.game.physics.arcade.collide(this.player, this.physicsGroup, function () {
      that.player.touchingChamp = true;
    });
    this.text.setText("Energy: " + this.player.energy);
    this.bg1.x= this.game.camera.x*0.6;
    this.bg2.x= this.game.camera.x*0.3;
    this.bg3.x= this.game.camera.x*0.1;
  }
  render(){

    for(var i in this.objects){
      this.game.debug.body(this.objects[i]);
    }
  }
  _startGame () {
    this.game.state.start('game');
  }
  animationStarted(){

  }
   calculParallaxeDiffX(xpar){
    const xnow = this.camera.x
    const jeuX = this.map.x*64;
    const constX = 0;
    const xcam = jeuX-constX;
    const deltaX = xpar-xcam;
    const perCamX = 1-((xcam-xnow)/xcam);
    return -(deltaX*perCamX);

  }
    calculParallaxeDiffY(ypar){
    const ynow = this.camera.y
    const jeuY = this.map.y*64;
    const constY = 0;
    const ycam = jeuY-constY;
    const deltaY = ypar-ycam;
    const perCamY = 1-((ycam-ynow)/ycam);
    return -(deltaY*perCamY);

  }
}
