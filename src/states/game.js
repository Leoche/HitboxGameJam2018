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
    var that = this;
    this.padEnabled = false;

    game.input.gamepad.start();
    this.pad = game.input.gamepad.pad1;

    this.debug = false;
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
    this.champiGroup = this.game.add.physicsGroup();

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

    this.ronces = [];
    this.ronceGroup = this.game.add.physicsGroup()

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
        if(!obj.properties || !obj.properties.sens) alert("Tiled erreur: un champi n'a pas de propriete: sens");
        if(!obj.properties || !obj.properties.height) alert("Tiled erreur: un champi n'a pas de propriete: height");
        if(!obj.properties || !obj.properties.chapeau) alert("Tiled erreur: un champi n'a pas de propriete: chapeau");
        var newChamp = new Champiv(game, obj.x, obj.y, obj.properties.sens, obj.properties.height, obj.properties.chapeau);
        this.champiGroup.add(newChamp);
        this.champis.push(newChamp);
      }
      else if (obj.type === "ronce"){
        this.objectsAdded.ronces++;
        if(!obj.properties || !obj.properties.sens) alert("Tiled erreur: une ronce n'a pas de propriete: sens");
        var newThorn = new Thorn(game, obj.x, obj.y, obj.properties.sens || 0, obj.properties.start);
        this.ronceGroup.add(newThorn);
        this.ronces.push(newThorn);
      }
      else if (obj.name === "end"){
        this.objectsAdded.end++;
        this.end.x = obj.x;
        this.end.y = obj.y;
        if(!obj.properties || !obj.properties.next) alert("Tiled erreur: un end n'a pas de propriete: next");
        this.end.next = obj.properties.next;
      }
    }
    if(this.objectsAdded.player ===0) alert("Tiled erreur: pas de player dans le niveau");
    console.log("Initialised world '" +this.levelType + "_" + this.levelNumber + ".json' with \n",
      this.objectsAdded.player + " player, ",
      this.objectsAdded.champis + " champis, ",
      this.objectsAdded.ronces + " ronces, ",
      this.objectsAdded.end + " end");

    this.game.camera.follow(this.player);
    var style = { font: "1px Arial", fill: "#ffffff", align: "center" };
    this.text = game.add.text(15, 15, "Energy: 0", style);
    this.text.fixedToCamera = true;
    this.text.anchor.set(0);
  }
  update() {
    var that = this;
    if(!this.pad){
      this.game.controls = {
        left:that.game.input.keyboard.isDown(81),
        right:that.game.input.keyboard.isDown(68),
        up:that.game.input.keyboard.isDown(90),
        power:that.game.input.keyboard.isDown(77),
        restart:that.game.input.keyboard.isDown(82)
      }
    }else{
      this.game.controls = {
        left:this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1,
        right:this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1,
        up:this.pad.isDown(Phaser.Gamepad.XBOX360_A),
        power:this.pad.isDown(Phaser.Gamepad.XBOX360_X),
        restart:this.pad.isDown(Phaser.Gamepad.XBOX360_Y)
      }
    }
    var that = this;
    this.player.touchingChampTop = false;
    this.game.physics.arcade.collide(this.player, this.colliderlayer);
    this.bg1.tilePosition.set(-this.game.camera.x/4, -this.game.camera.y/4);
    this.bg2.tilePosition.set(-this.game.camera.x/3, -this.game.camera.y/3);
    this.bg3.tilePosition.set(-this.game.camera.x/2, -this.game.camera.y/2);

    this.handleLeech()
    if(this.distanceBetweenPoints(this.player.body, this.end) < 64){
      game.state.start(this.end.next);
    }
    this.game.physics.arcade.collide(this.player, this.champiGroup, function (player, obj) {
      that.player.touchingChampTop = (player.y + player.body.height >= obj.body.y) ;
      if(player.lockedTo === null && this.player.body.touching.down && this.player.body.velocity.y < 0 ){
        player.lockedTo = obj;
        if(!this.player.hasJumped){
          this.player.body.velocity.y = 0;
        }
        this.player.hasJumped = false;
      }
    }, null, this);
    this.game.physics.arcade.overlap(this.player, this.ronceGroup, function(player, obj) {
      player.isAlive = false;
    }, null, this);
    if(game.input.keyboard.isDown(89)) this.debug = true;
  }
  handleLeech() {
    if(this.findNearest()){
      var nearest = this.findNearest()
      nearest.tinter = true;
      if(this.game.controls.power){
        nearest.interact();
        var that = this;
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
    if(this.debug){
      this.game.debug.body(this.player);
      for(var i in this.champis){
        this.game.debug.body(this.champis[i]);
      }
      for(var i in this.ronces){
        this.game.debug.body(this.ronces[i]);
      }
    }
  }
}
