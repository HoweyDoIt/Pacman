class Move {

    constructor() {}

    static pacman() {
        // var left = 1;
        // var right = 0;
        // var up = 1.5;
        // var down = 0.5;

        var speed = 4 * .8;
        var minDistance = 1;

        // Teleport (tunnels) when going off-screen
        if (pacman.moveDir == 'left' && pacman.leftObject() == undefined)
            pacman.x = (Levels.levelSetup[pacman.roundedY()].length - 1) * unit + (unit / 2);

        if (pacman.moveDir == 'right' && pacman.rightObject() == undefined)
            pacman.x = unit / 2;

        // Get available movement directions
        var canMoveLeft = pacman.leftObject() > 2 || (pacman.leftObject() <= 0 && pacman.gridX() - (pacman.roundedX() - 1) > minDistance);
        var canMoveRight = pacman.rightObject() > 2 || (pacman.rightObject() <= 0 && (pacman.roundedX() + 1) - pacman.gridX() > minDistance);
        var canMoveUp = pacman.topObject() > 2 || (pacman.topObject() <= 0 && pacman.gridY() - (pacman.roundedY() - 1) > minDistance);
        var canMoveDown = pacman.bottomObject() > 2 || (pacman.bottomObject() <= 0 && (pacman.roundedY() + 1) - pacman.gridY() > minDistance);

        // Move
        if (pacman.moveDir == 'left') {
            if (canMoveLeft)
                pacman.x -= speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        } else if (pacman.moveDir == 'right') {
            if (canMoveRight)
                pacman.x += speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        } else if (pacman.moveDir == 'up') {
            if (canMoveUp)
                pacman.y -= speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        } else if (pacman.moveDir == 'down') {
            if (canMoveDown)
                pacman.y += speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        }

        // Smoothing (adjusting x and y position if it gets misaligned while turning)
        if (pacman.moveDir == 'right' || pacman.moveDir == 'left') {
            pacman.y = lerp(pacman.y, pacman.roundedAbsoluteY(), 0.1);
        } else if (pacman.moveDir == 'up' || pacman.moveDir == 'down') {
            pacman.x = lerp(pacman.x, pacman.roundedAbsoluteX(), 0.1);
        }
    }

    static blinky() {

    }

    static inky() {

    }

    static pinky() {

    }

    static sue() {

    }
}