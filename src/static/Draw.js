// Draw Unit
var gridW = 28;
var gridH = 31;

var baseUnit = 20;
var unit = 20;

function normalizedUnit() {
    return unit / baseUnit;
}

function drawRect(color, x, y, w, h) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    // ctx.beginPath();
    // ctx.strokeStyle = 'gray';
    // ctx.rect(x, y, w, h);
    // ctx.stroke();
}

function drawBackground() {
    drawRect('black', 0, 0, canvas.width, canvas.height);
}

function drawCircle(color, x, y) {
    var circleSize = unit / 1.5;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x * 20 + (unit / 2), y * 20 + (unit / 2), circleSize, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawText(text, x, y) {
    ctx.fillText(text, x, y);
}

function debugDrawLevel() {
    for (var y = 0; y < gridH; y++)
        for (var x = 0; x < gridW; x++) {
            var c = '';
            var s = 15

            var unit = 20;
            var unit = 20;

            switch (Levels.level1[y][x]) {
                case 0:
                    c = 'blue';
                    s = 15;
                    break;
                case 1:
                    c = 'gray';
                    s = 3;
                    break;
                case 2:
                    c = 'white';
                    s = 5;
                    break;
                case 3:
                    c = 'black';
                    break;
                case 4:
                    c = 'yellow';
                    s = 10
                    break;
            }
            ctx.beginPath();
            ctx.strokeStyle = c;
            // ctx.fillStyle = c;
            ctx.rect(x * unit + (unit - s) / 2, y * unit + (unit - s) / 2, s, s);
            // ctx.fillRect(x * 20, y * 20, 20, 20);
            ctx.stroke();
        }
}

function startLevelDraw() {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
}

function doLevelDraw() {
    for (var y = 0; y < gridH; y++)
        for (var x = 0; x < gridW; x++) {
            if (Levels.level1[y][x] == 0) {
                var drawWall = getWallType(x, y);
                drawWall(x * unit, y * unit);
            }
        }
}

function endLevelDraw() {
    ctx.stroke();
}

//////////////////////////////
// Pacman drawing logic
//////////////////////////////

var pacmanAnim = 0;
var pacmanDir = 0;

function drawPacman(color, x, y, scale) {
    var frames = [0.0, 0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1];
    var frameChangePerSecond = 30;
    var size = scale * unit / 1.5;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, frames[pacmanAnim] * Math.PI + (Math.PI * pacmanDir), (1.0 + frames[pacmanAnim]) * Math.PI + (Math.PI * pacmanDir), false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, size, (1 - frames[pacmanAnim]) * Math.PI + (Math.PI * pacmanDir), (1 + (1 - frames[pacmanAnim])) * Math.PI + (Math.PI * pacmanDir), false);
    ctx.fill();

    var event = Time.frameCount % Math.round(60 / frameChangePerSecond); // 60 = old fps

    if (event == 0)
        pacmanAnim++;
    if (pacmanAnim >= frames.length)
        pacmanAnim = 0;
}

//////////////////////////////
// Ghost drawing logic
//////////////////////////////

function drawGhost(color, x, y, w, h) {
    var ghostSize = unit / 2;
    var curX = x * unit + (unit / 2) - ghostSize;
    var curY = y * unit + unit;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(curX, curY);

    ctx.arc(x * unit + (unit / 2), y * unit + (unit / 2), ghostSize, Math.PI, 0, false);

    curX += ghostSize * 2;
    ctx.lineTo(curX, curY);

    curX -= ghostSize * 2;
    ctx.lineTo(curX, curY);

    ctx.fill();
}

//////////////////////////////
// Pellet drawing logic
//////////////////////////////

function drawPellets() {
    for (var y = 0; y < gridH; y++)
        for (var x = 0; x < gridW; x++) {
            if (Levels.level1[y][x] == 1)
                drawPellet(unit / 8, x, y);

            if (Levels.level1[y][x] == 2)
                drawPellet(unit / 3, x, y);
        }
}

function drawPellet(circle, x, y) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x * unit + (unit / 2), y * unit + (unit / 2), circle, 0, Math.PI * 2, true);
    ctx.fill();
}


//////////////////////////////
// Wall drawing logic
//////////////////////////////

function getWallType(x, y) {
    // Setup left
    var left = false;
    if (x - 1 > 0)
        left = Levels.level1[y][x - 1] > 0;

    // Setup top
    var top = false;
    if (y - 1 > 0)
        top = Levels.level1[y - 1][x] > 0;

    // Setup right
    var right = false;
    if (x + 1 < gridW)
        right = Levels.level1[y][x + 1] > 0;

    // Setup bottom
    var bottom = false;
    if (y + 1 < gridH)
        bottom = Levels.level1[y + 1][x] > 0;

    // Setup Top Left
    var topLeft = false;
    if (y - 1 > 0 && x - 1 > 0)
        topLeft = Levels.level1[y - 1][x - 1] > 0;

    // Setup Top Right
    var topRight = false;
    if (y + 1 < gridH && x - 1 > 0)
        topRight = Levels.level1[y + 1][x - 1] > 0;

    // Setup Bottom Right
    var bottomRight = false;
    if (y + 1 < gridH && x + 1 < gridW)
        bottomRight = Levels.level1[y + 1][x + 1] > 0;

    // Setup Bottom Left
    var bottomLeft = false;
    if (y - 1 > 0 && x + 1 < gridW)
        bottomLeft = Levels.level1[y - 1][x + 1] > 0;

    // if (!(left || right || top || bottom || topLeft || bottomLeft || topRight || bottomRight))
    //     return drawNothing;

    //  left or right and not (top or bottom)
    //      vertical wall
    if ((left || right) && !(top || bottom))
        return drawVertical;

    //  top or bottom and not (left or right)
    //      horizontal wall
    if ((top || bottom) && !(left || right))
        return drawHorizontal;

    //  left and top and not (right or bottom)
    //      top-left corner
    if (left && top && !(right || bottom))
        return drawTLC;

    //  top and right and not (bottom or left)
    //      top-right corner
    if (top && right && !(bottom || left))
        return drawTRC;

    //  right and bottom and not (left or top) 
    //      bottom-right corner
    if (right && bottom && !(left || top))
        return drawBRC;

    //  bottom and left and not (top or right)
    //      bottom-left corner
    if (bottom && left && !(top || right))
        return drawBLC;

    if (topLeft && !(top || right || bottom || left))
        return drawBRC;

    if (topRight && !(top || right || bottom || left))
        return drawTRC;

    if (bottomRight && !(top || right || bottom || left))
        return drawTLC;

    if (bottomLeft && !(top || right || bottom || left))
        return drawBLC;

    return drawNothing;
}

function drawNothing(x, y) {

}

function drawVertical(x, y) {
    var curX = x + (unit / 2);
    var curY = y;

    ctx.moveTo(curX, curY);

    curY += unit;

    ctx.lineTo(curX, curY);
}

function drawHorizontal(x, y) {
    var curX = x;
    var curY = y + (unit / 2);

    ctx.moveTo(curX, curY);

    curX += unit;

    ctx.lineTo(curX, curY);
}

function drawTLC(x, y) {
    var curX = x + unit / 2;
    var curY = y + unit;

    ctx.moveTo(curX, curY);

    var angleVal = 1;

    curX += unit / 2;

    ctx.arc(curX, curY, unit / 2, angleVal * Math.PI, (angleVal + 0.5) * Math.PI, false);
}

function drawTRC(x, y) {
    var curX = x;
    var curY = y + unit / 2;

    ctx.moveTo(curX, curY);

    var angleVal = 1.5;

    curY += unit / 2;

    ctx.arc(curX, curY, unit / 2, angleVal * Math.PI, (angleVal + 0.5) * Math.PI, false);
}

function drawBRC(x, y) {
    var curX = x + unit / 2;
    var curY = y;

    ctx.moveTo(curX, curY);

    var angleVal = 2;

    curX -= unit / 2;

    ctx.arc(curX, curY, unit / 2, angleVal * Math.PI, (angleVal + 0.5) * Math.PI, false);
}

function drawBLC(x, y) {
    var curX = x + unit;
    var curY = y + unit / 2;

    ctx.moveTo(curX, curY);

    var angleVal = 2.5;

    curY -= unit / 2;

    ctx.arc(curX, curY, unit / 2, angleVal * Math.PI, (angleVal + 0.5) * Math.PI, false);
}