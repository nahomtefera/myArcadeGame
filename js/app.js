// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed;
    // Once the bugs reach the end of the screen
    // They will be assigned new random speeds
    if (this.x >= 415){
        this.x = 0;
        this.speed = Math.floor((Math.random() * 4) +1)
        this.x = this.x + this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function (x, y) {

    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
}

Player.prototype.handleInput = function(key) {

    // This will move the player INSIDE the game board
    if (key == "up" && player.y > -10){
        player.y -= 15;
    } else if (key == "down" && player.y < 430) {
        player.y +=15; 
    } else if (key == "left" && player.x > -15) {
        player.x -=15;
    } else if (key == "right" && player.x < 415) {
        player.x +=15;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Instantiating Enemies
let enemy1, enemy2, enemy3;

enemy1 = new Enemy(5, 50, Math.floor((Math.random() * 3) + 1));
enemy2 = new Enemy(5, 130, Math.floor((Math.random() * 3) + 1));
enemy3 = new Enemy(5, 215, Math.floor((Math.random() * 3) + 1));

let allEnemies = [];

allEnemies.push(enemy1, enemy2, enemy3);

// Instatiating Player
let player;

player = new Player(205, 380);


/*
This part will prevent the scroll functionality on 'keydown'
*/
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

