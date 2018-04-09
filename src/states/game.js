class Game extends Phaser.State {
  constructor(levelType, levelNumber) {
    super();
    this.levelType = levelType;
    this.levelNumber = levelNumber;
  }
  preload() {
    this.load.tilemap('level1', '/assets/levels/' + this.levelType + "_" + this.levelNumber + '.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.image('terrain', '/assets/spritesheets/terrain.png');

    this.game.load.image('bg1', 'assets/images/' + this.levelType + '/FOND_01.png');
    this.game.load.image('bg2', 'assets/images/' + this.levelType + '/FOND_02.png');
    this.game.load.image('bg3', 'assets/images/' + this.levelType + '/FOND_03.png');
    this.game.load.image('champ_top1_alive', 'assets/images/' + this.levelType + '/CHAPEAU_01.png');
    this.game.load.image('champ_top2_alive', 'assets/images/' + this.levelType + '/CHAPEAU_02.png');
    this.game.load.image('champ_top3_alive', 'assets/images/' + this.levelType + '/CHAPEAU_03.png');
    this.game.load.image('veine_top1_alive', 'assets/images/' + this.levelType + '/VEINE_01.png');
    this.game.load.image('veine_top2_alive', 'assets/images/' + this.levelType + '/VEINE_02.png');
    this.game.load.image('veine_top3_alive', 'assets/images/' + this.levelType + '/VEINE_03.png');
    this.game.load.image('champ_tile_alive', 'assets/images/' + this.levelType + '/TIGE.png');
    this.game.load.image('champ_base_alive', 'assets/images/' + this.levelType + '/BASE.png');

    this.game.load.spritesheet('player', 'assets/spritesheets/player.png', 128, 128, 50);
    this.game.load.spritesheet('thorn', 'assets/spritesheets/ronce.png',64,64,6);

    this.game.load.audio('jump', 'assets/audio/jump2.wav');
    this.game.load.audio('walk', 'assets/audio/walknew.wav');
    this.game.load.audio('ambiance1', 'assets/audio/ambiance1.wav');
    this.game.load.audio('ambiance2', 'assets/audio/ambiance2.wav');
    this.game.load.audio('echoPas','assets/audio/echopas.wav');
  }
  create() {

    this.fxAmb2 = this.game.add.audio('ambiance1');
    this.fxAmb2.loop = true;
    this.fxAmb2.play();

    this.objects = [];
    console.log("Game!");

    this.fxAmb1 = game.add.audio('jump');
    this.fxAmb1.addMarker('amb1', 0, 50);
    this.fxAmb1.play('amb1');
    this.fxAmb1.loopFull(0.6);

    this.bg1 = this.game.add.tileSprite(0,0,2400,1000,'bg1');
    this.bg1.fixedToCamera = true;
    this.bg2 = this.game.add.tileSprite(0,0,2400,1000,'bg2');
    this.bg2.fixedToCamera = true;
    this.bg3 = this.game.add.tileSprite(0,0,2400,1000,'bg3');
    this.bg3.fixedToCamera = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 600;

    this.champis = [];
    this.ronceGroup = this.game.add.physicsGroup()
    this.physicsGroup = game.add.physicsGroup();

    this.map = this.game.add.tilemap('level1', 64, 64);
    this.map.addTilesetImage('terrain','terrain');

    this.layer = this.map.createLayer("terrain");
    this.colliderlayer = this.map.createLayer("collider");
    this.layerover = this.map.createLayer("terrainover");
    this.layer.resizeWorld();
    this.colliderlayer.resizeWorld();
    this.colliderlayer.visible = false;
    this.layerover.resizeWorld();

    this.map.setCollision(6, true, this.colliderlayer);

    this.end = {x:0, y:0};
    this.objectsAdded = {
      player:0,
      champis:0,
      ronces:0,
      end:0,
    }
    for(var i in this.map.objects.objects){
      var obj = this.map.objects.objects[i];
      if (obj.name === "player") {
        this.objectsAdded.player++;
        this.player = new Player(game, obj.x, obj.y, this.colliderlayer, this.champis);
      } else if (obj.type === "champiv") {
        this.objectsAdded.champis++;
        var newChamp = new Champiv(game, obj.x, obj.y, obj.properties.sens, obj.properties.height, obj.properties.chapeau);
        this.champis.push(newChamp);
        this.objects.push(newChamp);
        this.physicsGroup.add(newChamp);
      }
      else if (obj.type === "ronce"){
        this.objectsAdded.ronces++;
        var newThorn = new Thorn(game, obj.x, obj.y);
        this.objects.push(newThorn);
        this.physicsGroup.add(newThorn);
      }
      else if (obj.name === "end"){
        this.objectsAdded.end++;
        this.end.x = obj.x;
        this.end.y = obj.y;
        this.end.next = obj.properties.next;
      }
    }
    console.log("Initialised world '" +this.levelType + "_" + this.levelNumber + ".json' with \n",
      this.objectsAdded.player + " player, ",
      this.objectsAdded.champis + " champis, ",
      this.objectsAdded.ronces + " ronces, ",
      this.objectsAdded.end + " end");

    this.thorn = new Thorn(game, 500, 1088);
    this.ronceGroup.add(this.thorn);

    this.game.camera.follow(this.player);
    this.game.add.sprite(this.player);
    var style = { font: "1px Arial", fill: "#ffffff", align: "center" };
    this.text = game.add.text(15, 15, "Energy: 0", style);
    this.text.fixedToCamera = true;
    this.text.anchor.set(0);
  }
  update() {
    var that = this;
    this.player.touchingChamp = false;
    this.game.physics.arcade.collide(this.player, this.colliderlayer);
    this.bg1.tilePosition.set(-this.game.camera.x/4, -this.game.camera.y/4);
    this.bg2.tilePosition.set(-this.game.camera.x/3, -this.game.camera.y/3);
    this.bg3.tilePosition.set(-this.game.camera.x/2, -this.game.camera.y/2);

    this.handleLeech()
    if(this.distanceBetweenPoints(this.player, this.end) < 64){
      game.state.start(this.end.next);
    }
    this.game.physics.arcade.collide(this.player, this.physicsGroup, function () {
      that.player.touchingChamp = true;
    });
  }
  handleLeech() {
    if(this.findNearest()){
      var nearest = this.findNearest()
      nearest.tinter = true;
      if(game.input.keyboard.isDown(77)){
        nearest.interact();
        var that = this;
        this.game.physics.arcade.collide(this.physicsGroup, this.player, function(){
          that.player.body.y+=5;
        });
      }
    }
  }
  findNearest(){
    var distance = 9999999;
    var choosenOne = null;
    for(var i in this.champis){
      var obj = this.champis[i];
      this.champis[i].tinter = false;
      if(this.distanceBetweenPoints(this.player, {x: obj.x, y: obj.y-(obj.tigeHeightMax+200)/2}) < distance){
        distance = this.distanceBetweenPoints(this.player, {x: obj.x, y: obj.y-(obj.tigeHeightMax+200)/2});
        choosenOne = i
      }
    }
    return this.champis[choosenOne];
  }
  distanceBetweenPoints(p1, p2) {
    return Math.abs(Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)));
  }
  render(){
    return;
    this.game.debug.body(this.player);
    for(var i in this.objects){
      this.game.debug.body(this.objects[i]);
    }
  }
}
