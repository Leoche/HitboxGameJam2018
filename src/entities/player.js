var Player = function (game, x, y, colliders) {

//  We call the Phaser.Sprite passing in the game reference
//  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
Phaser.Sprite.call(this, game, x, y, 'player');

this.isAlive = true;
this.initialX = x;
this.initialY = y;

this.addSounds();
this.game = game;
this.anchor.setTo(0.5, 1);
this.realWidth = this.width;
this.realHeight = this.height;

this.walkAnim = this.animations.add('walk',[0,1,2,3,4,5,6,7,8,9],5);
this.animations.add('idle',[10,11,12,13,14],10);
this.animations.add('jump',[20,21,22,23,24,25,26],5);
this.animations.add('run',[30,31,32,33,34,35],5);
this.animations.add('die',[40,41,42,43],5);


game.physics.enable(this, Phaser.Physics.ARCADE);

this.body.setSize(40, 105, 42, 20);
this.body.collideWorldBounds = true;
this.body.gravity.set(0, 180);
this.body.mass = 20;
this.body.bounce.set(.1);
this.energy = 0;
this.facing = 1;
this.colliders = colliders;
this.touchingChamp = false;

game.add.existing(this);

};


Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {

    if(this.isAlive){
      this.scale.setTo(1 + this.energy*.01, 1 + this.energy*.01)
      this.body.updateBounds(this.scale.x, this.scale.y);
      if(this.facing === 0){
        this.scale.x *= -1;
    }

    if(game.input.keyboard.isDown(87) && (this.body.onFloor())){
        this.energy += 2;
        if(this.energy > 100){
            this.energy = 100;
        }
    }
    else{
        this.energy -= 0.5;
        if(this.energy < 0){
            this.energy = 0;
        }
    }
    if(game.input.keyboard.isDown(37)){
        this.key_gauche();
    }
    if(game.input.keyboard.isDown(39)){
        this.key_droite();
    }
    /* up*/
    if(game.input.keyboard.isDown(38) && (this.body.onFloor() || this.touchingChamp)){
        this.body.velocity.y = -700;

    }
    if(this.body.onFloor() && Math.abs(this.body.velocity.x)+Math.abs(this.body.velocity.y<1)){
        this.animations.play('idle');
    }

    this.anim();

    /*Velocity*/


    this.game.physics.arcade.collideSpriteVsTilemapLayer(this, this.colliders);

    this.game.physics.arcade.overlap(this, this.ronceGroup, this.collisionHandler, null, this);
}

    if(game.input.keyboard.isDown(38) && (this.body.onFloor() || this.touchingChamp)){ // UP
        this.body.velocity.y = -700;
        this.fxJump.play('jump');
        this.fxWalk.stop('walk');
    }

    this.body.velocity.x *= 0.97;
    if (this.body.onFloor() || this.touchingChamp) {
        this.body.velocity.x *= 0.7;
    }

    if(game.input.keyboard.isDown(82)){
        this.restart();
    }


    this.game.physics.arcade.collideSpriteVsTilemapLayer(this, this.colliders);

};



Player.prototype.addSounds = function(){
    this.fxJump = this.fx = game.add.audio('jump');
    this.fxJump.allowMultiple = true;
    this.fxJump.addMarker('jump', 0, 2);
    this.fxWalk = this.fx = game.add.audio('walk');
    this.fxWalk.addMarker('walk', 0, 10);
    this.fxEcho = this.fx = game.add.audio('echoPas');
    this.fxEcho.addMarker('echoPas', 0, 10);
}

Player.prototype.collisionHandler = function (player, ronce) {

    //console.log("hit")
    this.isAlive = false;
    //  If the player collides with a chilli it gets eaten :)
    this.animations.play('die');


}

Player.prototype.restart = function(){
    //console.log(game.frameTotal);
    this.body.x = this.initialX;
    this.body.y = this.initialY;
    this.isAlive = true;
}

Player.prototype.key_gauche= function(){
    if (this.body.onFloor)
    {
        this.body.velocity.x = -300;
    }
    else{
        this.body.velocity.x = -150;
    }
    this.facing = 0;
}

Player.prototype.key_droite= function(){
    if (this.body.onFloor) this.body.velocity.x = 300-this.energy*1.5;
    else this.body.velocity.x = 150;
    this.facing = 1;
}

Player.prototype.anim= function(){
    if(!this.body.onFloor()){
        this.fxWalk.stop('walk');
    }
    if(Math.abs(this.body.velocity.x) > 10){

        if(!this.fxWalk.isPlaying){
            this.fxWalk.play('walk');
            console.log("walkplayed");
        }


        if(Math.abs(this.body.velocity.x) > 250){
            if(this.animations.currentAnim.name != "run"){
                this.animations.play('run', 10, true);
            }
        }else{
            if(this.animations.currentAnim.name != "walk"){
                this.animations.play('walk', 10, true);
            }
        }
    }
    else{
        if(this.body.onFloor() || this.touchingChamp){
            if(this.animations.currentAnim.name != "idle"){
                this.animations.play('idle');
            }
        }
        else{
            if(this.animations.currentAnim.name != "jump"){
                this.animations.play('jump');
            }
        }
    }

}


Player.prototype.anyKeyPressed = function(keyboard){
    if(keyboard.isDown(87) || keyboard.isDown(37)|| keyboard.isDown(37)|| keyboard.isDown(39) || keyboard.isDown(38) || keyboard.isDown(82)){
        return true;
    }
}
