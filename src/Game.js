//////////////////////////////////////////////////////
///
///     Zack Newman
///     A Collection of Helpful JS scripts
///     Created on 3.12.20
/// 
/// 
//////////////////////////////////////////////////////

// Variables
var canvas;
var ctx;

// Game Objects
var pacman;
var inky;
var blinky;
var pinky;
var sue;

// Game Variables
var score = 0;
var lives = 3;

// Initialization
window.onload = function() {
    // Initialize Canvas
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Initialize Input
    this.document.onkeydown = this.checkKey;

    // Execute functions
    this.start();
}

function start() {
    console.log('start');
    Time.setupTime();
    initializeLevel();
    // spawn();
    update();
}

function update() {
    Time.updateTime();
    move();
    smooth();
    draw();
    window.requestAnimationFrame(() => this.update())
}

function initializeLevel() {
    Levels.levelSetup = Levels.level1;
    Levels.levelDynamic = Levels.level1;

    pacman = new GameObject('yellow', 13.5, 26, drawPacman);
    blinky = new GameObject('red', 13.5, 14, drawGhost);


    // for (var y = 0; y < gridH; y++)
    //     for (var x = 0; x < gridW; x++) {
    //         // console.log(x + ',' + y);
    //         switch (Levels.levelSetup[y][x]) {
    //             case 4:
    //                 console.log('Pacman found');
    //                 pacman = new GameObject('yellow', x, y, drawPacman);
    //                 break;
    //                 // case 5:
    //                 //     inky = new GameObject('cyan', x * unit + (unit / 2), y + unit + (unit / 2), drawGhost);
    //                 //     break;
    //                 // case 6:
    //                 //     pinky = new GameObject('pink', x * unit + (unit / 2), y + unit + (unit / 2), drawGhost);
    //                 //     break;
    //                 // case 7:
    //                 //     blinky = new GameObject('red', x * unit + (unit / 2), y + unit + (unit / 2), drawGhost);
    //                 //     break;
    //                 // case 8:
    //                 //     sue = new GameObject('orange', x * unit + (unit / 2), y + unit + (unit / 2), drawGhost);
    //                 //     break;
    //         }
    //     }
}

function checkKey(e) {

    switch (e.keyCode) {
        case 37:
            if (pacman.leftObject() > 2 && pacmanDir != 1) {
                if (pacmanDir != 0) {
                    // pacman.x = pacman.roundedAbsoluteX();
                    // pacman.y = pacman.roundedAbsoluteY();
                }
                pacmanDir = 1;
            }
            break;
        case 38:
            if (pacman.topObject() > 2 && pacmanDir != 1.5) {
                if (pacmanDir != 0.5) {
                    // pacman.x = pacman.roundedAbsoluteX();
                    // pacman.y = pacman.roundedAbsoluteY();
                }
                pacmanDir = 1.5;
            }
            break;
        case 39:
            if (pacman.rightObject() > 2 && pacmanDir != 0) {
                if (pacmanDir != 1) {
                    // pacman.x = pacman.roundedAbsoluteX();
                    // pacman.y = pacman.roundedAbsoluteY();
                }
                pacmanDir = 0;
            }
            break;
        case 40:
            if (pacman.bottomObject() > 2 && pacmanDir != 0.5) {
                if (pacmanDir != 1.5) {
                    // pacman.x = pacman.roundedAbsoluteX();
                    // pacman.y = pacman.roundedAbsoluteY();
                }
                pacmanDir = 0.5;
            }
            break;
    }
}

function move() {
    var left = 1;
    var right = 0;
    var up = 1.5;
    var down = 0.5;
    var speed = 4 * .8;
    var minDistance = 1;

    if (pacmanDir == left && pacman.leftObject() == undefined)
        pacman.x = (Levels.levelSetup[pacman.roundedY()].length - 1) * unit + (unit / 2);

    if (pacmanDir == right && pacman.rightObject() == undefined)
        pacman.x = unit / 2;

    var canMoveLeft = pacman.leftObject() > 2 || (pacman.leftObject() <= 0 && pacman.gridX() - (pacman.roundedX() - 1) > minDistance);
    var canMoveRight = pacman.rightObject() > 2 || (pacman.rightObject() <= 0 && (pacman.roundedX() + 1) - pacman.gridX() > minDistance);
    var canMoveUp = pacman.topObject() > 2 || (pacman.topObject() <= 0 && pacman.gridY() - (pacman.roundedY() - 1) > minDistance);
    var canMoveDown = pacman.bottomObject() > 2 || (pacman.bottomObject() <= 0 && (pacman.roundedY() + 1) - pacman.gridY() > minDistance);

    if (pacmanDir == left) {
        if (canMoveLeft)
            pacman.x -= speed * Time.scaledDeltaTime * normalizedUnit();
    } else if (pacmanDir == right) {
        if (canMoveRight)
            pacman.x += speed * Time.scaledDeltaTime * normalizedUnit();
    } else if (pacmanDir == up) {
        if (canMoveUp)
            pacman.y -= speed * Time.scaledDeltaTime * normalizedUnit();
    } else if (pacmanDir == down) {
        if (canMoveDown)
            pacman.y += speed * Time.scaledDeltaTime * normalizedUnit();
    }

    // Check for Dots
    var curX = pacman.roundedX();
    var curY = pacman.roundedY();
    var curTile = Levels.levelDynamic[curY][curX];

    // Small Dots
    if (curTile == 3) {
        Levels.levelDynamic[curY][curX] = 5;
    }

    // Big Dots
    if (curTile == 4) {
        Levels.levelDynamic[curY][curX] = 5;
    }
}

// Responsible for lerping sideways position values to rounded values
function smooth() {
    var left = 1;
    var right = 0;
    var up = 1.5;
    var down = 0.5;

    if (pacmanDir == right || pacmanDir == left) {
        pacman.y = lerp(pacman.y, pacman.roundedAbsoluteY(), 0.1);
    } else if (pacmanDir == up || pacmanDir == down) {
        pacman.x = lerp(pacman.x, pacman.roundedAbsoluteX(), 0.1);
    }
}

function draw() {
    drawBackground();

    startLevelDraw();
    doLevelDraw();
    endLevelDraw();
    drawCage();
    pacman.draw();

    blinky.draw();

    drawPellets();


    // inky.draw();
    // pinky.draw();
    // sue.draw();
}

function lerp(start, end, factor) {
    return start * (1 - factor) + end * factor;
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}