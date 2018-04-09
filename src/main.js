const game = new Phaser.Game(1200, 700, Phaser.AUTO, 'game_canvas');

game.state.add('menu', new Menu());
game.state.add('level1', new Game('ALIVE', "1"));
game.state.add('level2', new Game('DEAD', "1"));
game.state.add('credits', new Credits());

game.state.start('menu');
