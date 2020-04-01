class Move {

    constructor() {}

    static pacman = function() {
        var left = 1;
        var right = 0;
        var up = 1.5;
        var down = 0.5;
        var speed = 4 * .1;
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
                pacman.x -= speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        } else if (pacmanDir == right) {
            if (canMoveRight)
                pacman.x += speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        } else if (pacmanDir == up) {
            if (canMoveUp)
                pacman.y -= speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        } else if (pacmanDir == down) {
            if (canMoveDown)
                pacman.y += speed * Time.scaledDeltaTime * Draw.normalizedUnit();
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

        // Smoothing (adjusting x and y position if it gets misaligned while turning)
        if (pacmanDir == right || pacmanDir == left) {
            pacman.y = lerp(pacman.y, pacman.roundedAbsoluteY(), 0.1);
        } else if (pacmanDir == up || pacmanDir == down) {
            pacman.x = lerp(pacman.x, pacman.roundedAbsoluteX(), 0.1);
        }
    }

    static blinky = function() {

    }

    static inky = function() {

    }

    static pinky = function() {

    }

    static sue = function() {

    }
}