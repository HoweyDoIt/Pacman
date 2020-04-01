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
var gameObjects;
var ghosts;

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
    Time.setup();
    initializeLevel();
    update();
}

function update() {
    Time.update();

    drawGame();

    gameObjects.forEach(go => {
        go.update();
    });

    window.requestAnimationFrame(() => this.update())
}

function initializeLevel() {
    Levels.levelSetup = Levels.level1;
    Levels.levelDynamic = Levels.level1;

    pacman = new GameObject('yellow', 13.5, 26, 0.667, Move.pacman, drawPacman);
    blinky = new GameObject('red', 13.5, 14, 0.667, Move.blinky, drawGhost);
    inky = new GameObject('blue', 12, 17, 0.667, Move.inky, drawGhost);
    pinky = new GameObject('pink', 13.5, 17, 0.667, Move.pinky, drawGhost);
    sue = new GameObject('orange', 15, 17, 0.667, Move.sue, drawGhost);

    gameObjects = [pacman, blinky, inky, pinky, sue];
    ghosts = [blinky, inky, pinky, sue];
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

function drawGame() {
    Draw.background();

    Draw.level();
    // startLevelDraw();
    // doLevelDraw();
    // endLevelDraw();

    drawCage();

    drawDots();
}

function lerp(start, end, factor) {
    return start * (1 - factor) + end * factor;
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}