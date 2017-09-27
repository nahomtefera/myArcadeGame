// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 30;
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
        this.speed = Math.floor((Math.random() * 3) +1)
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

// Open modal and choose character
$(document).ready(function(){
    $("#myModal").modal()
});

let chosenChar = "images/char-boy.png";

$(".chars").click(function(){
    chosenChar = $(this).find("img").attr("src");
    player.sprite = chosenChar;
    $("#myModal").modal("hide");    
    player.render();
});

let Player = function (x, y) {

    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.sprite = chosenChar;
};

Player.prototype.update = function() {
    addScore(); 
    showScore();
    winGame();
};

function checkCollisions() {
    for(let i = 0; i < allEnemies.length; i++){    
        if (player.x < allEnemies[i].x + allEnemies[i].width && player.x + player.width > allEnemies[i].x && player.y < allEnemies[i].y + allEnemies[i].height && player.y + player.height > allEnemies[i].y ){
                console.log("Colision detected");
                if(score > 0){
                    score--;
                }    
                resetGame();
            }
    }
}
// function to decide how to win the game
function winGame(){
    if(score === 10){
        $("#winningGame").modal();
        score = 0;
        enemy1.x = 5;
        enemy2.x = 5;
        enemy3.x = 5;
        enemy1.speed = 0;
        enemy2.speed = 0;
        enemy3.speed = 0;
    }
}

// Play Again
$(".restart-game").click(function(){
    resetGame();
    $("#winningGame").modal("hide");
});

//Change Character
$(".change-char").click(function(){
    $("#myModal").modal();
});

function resetGame(){
    //reset player position
    player.x = 205;
    player.y = 380;
    //reset enemies position
    enemy1.x = 5;
    enemy1.y = 50;;
    enemy1.speed = Math.floor((Math.random() * 3) +1);  
    enemy2.x = 5;
    enemy2.y = 130;
    enemy2.speed = Math.floor((Math.random() * 3) +1);      
    enemy3.x = 5;
    enemy3.y = 215;
    enemy3.speed = Math.floor((Math.random() * 3) +1);  

}
// Player.prototype.checkCollisions = function() {
//     for (let i = 0; i < allEnemies.length; i++){
        
//     }if (player.x < allEnemies[i].x + allEnemies[i].width && player.x + player.width > allEnemies[i].x && player.y < allEnemies[i].y + allEnemies[i].height && player.y + player.height > allEnemies[i].y ){
//             console.log("Colision detected")
//         }
// }

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
}

Player.prototype.handleInput = function(key) {

    // This will move the player INSIDE the game board
    if (key == "up" && player.y > 0){
        player.y -= 15;
    } else if (key == "down" && player.y < 425) {
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

// Creating enemies with starting point and random speed
enemy1 = new Enemy(5, 50, Math.floor((Math.random() * 3) + 1));
enemy2 = new Enemy(5, 130, Math.floor((Math.random() * 3) + 1));
enemy3 = new Enemy(5, 215, Math.floor((Math.random() * 3) + 1));

let allEnemies = [];

allEnemies.push(enemy1, enemy2, enemy3);

// Instatiating Player
let player;

player = new Player(205, 380);




// Winning and Losing

let score = 0, deaths = 0;

function addScore(){
    if(player.y <= -10) {
        score++;
        resetGame();
        console.log("you did it, score: " + score);
    }
}

function showScore(){
    $(".score").html(score)
    if(score < 4 && ($(".score").hasClass("btn-warning") || $(".score").hasClass("btn-success"))){
        $(".score").removeClass("btn-warning btn-success");
        $(".score").addClass("btn-danger");
    }else if(score > 4 && score < 9 && ($(".score").hasClass("btn-danger") || $(".score").hasClass("btn-success"))){
        $(".score").removeClass("btn-danger btn-success");
        $(".score").addClass("btn-warning");
    }else if(score >= 9 && ($(".score").hasClass("btn-danger") || $(".score").hasClass("btn-warning"))){
        $(".score").removeClass("btn-danger btn-warning");
        $(".score").addClass("btn-success");
    }
}
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

