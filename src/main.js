const game = new Phaser.Game(1200, 700, Phaser.AUTO, 'game_canvas');

game.state.add('menu', new Menu());
game.state.add('ALIVE_0', new Game('ALIVE', "0"));
game.state.add('ALIVE_1', new Game('ALIVE', "1"));
game.state.add('ALIVE_2', new Game('ALIVE', "2"));
game.state.add('DEAD_0', new Game('DEAD', "0"));
game.state.add('DEAD_1', new Game('DEAD', "1"));
game.state.add('DEAD_2', new Game('DEAD', "2"));
game.state.add('credits', new Credits());

game.state.start('menu');
