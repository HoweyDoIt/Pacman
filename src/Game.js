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
    this.document.onkeydown = Input.checkKey;

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

    Draw.level();

    gameObjects.forEach(go => {
        go.update();
    });

    window.requestAnimationFrame(() => this.update())
}

function initializeLevel() {
    Levels.levelSetup = Levels.level1;
    Levels.levelDynamic = Levels.level1;

    pacman = new GameObject('yellow', 13.5, 26, 0.667, Move.pacman, Draw.pacman);
    blinky = new GameObject('red', 13.5, 14, 0.667, Move.blinky, Draw.ghost);
    inky = new GameObject('cyan', 12, 17, 0.667, Move.inky, Draw.ghost);
    pinky = new GameObject('hotpink', 13.5, 17, 0.667, Move.pinky, Draw.ghost);
    sue = new GameObject('orange', 15, 17, 0.667, Move.sue, Draw.ghost);

    gameObjects = [pacman, blinky, inky, pinky, sue];
    ghosts = [blinky, inky, pinky, sue];
}

function lerp(start, end, factor) {
    return start * (1 - factor) + end * factor;
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}