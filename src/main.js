// WELCOME TO THE MAIN SCRIPT!

// It's a very boring script, but it's useful to make
// the code more understandable.

// First, we need to define our Phaser game using the
// Phaser script we are loading on index.html

const game = new Phaser.Game(1200, 700, Phaser.AUTO, 'game_canvas');

// Since we are loading the other scripts on index.html BEFORE
// loading this script, we know we have the state classes up and
// running, so we can create them using 'new' (ES6!).

// So let's just add them to our game.state!

game.state.add('menu', new Menu());
game.state.add('credits', new Credits());
game.state.add('end', new End());
game.state.add('game', new Game());
game.state.add('game2', new Game2());

// Finally, we have to start from somewhere, so let's choose a
// state to begin our game!

game.state.start('game2');
