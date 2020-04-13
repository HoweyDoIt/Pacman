class Move {

    constructor() { }

    static pacman() {
        Move.moveObject(pacman);

        // Smoothing (adjusting x and y position if it gets misaligned while turning)
        if (pacman.moveDir === 'right' || pacman.moveDir === 'left') {
            pacman.y = lerp(pacman.y, pacman.roundedAbsoluteY(), 0.1);
        } else if (pacman.moveDir === 'up' || pacman.moveDir === 'down') {
            pacman.x = lerp(pacman.x, pacman.roundedAbsoluteX(), 0.1);
        }
    }

    static blinky() {
        Move.moveObject(blinky);
    }

    static inky() {

    }

    static pinky() {

    }

    static sue() {

    }

    static moveObject(obj) {
        var speed = 2 * obj.moveSpeed //* .8;
        var minDistance = 1;

        // Teleport (tunnels) when going off-screen
        if (obj.moveDir === 'left' && obj.leftObject() === undefined)
            obj.x = (Levels.levelSetup[obj.roundedY()].length - 1) * unit + (unit / 2);

        if (obj.moveDir === 'right' && obj.rightObject() === undefined)
            obj.x = unit / 2;

        // Get available movement directions
        var canMoveLeft = obj.leftObject() > 2 || (obj.leftObject() <= 0 && obj.gridX() - (obj.roundedX() - 1) > minDistance);
        var canMoveRight = obj.rightObject() > 2 || (obj.rightObject() <= 0 && (obj.roundedX() + 1) - obj.gridX() > minDistance);
        var canMoveUp = obj.topObject() > 2 || (obj.topObject() <= 0 && obj.gridY() - (obj.roundedY() - 1) > minDistance);
        var canMoveDown = obj.bottomObject() > 2 || (obj.bottomObject() <= 0 && (obj.roundedY() + 1) - obj.gridY() > minDistance);

        // Move
        if (obj.moveDir === 'left') {
            if (canMoveLeft)
                obj.x -= speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        } else if (obj.moveDir === 'right') {
            if (canMoveRight)
                obj.x += speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        } else if (obj.moveDir === 'up') {
            if (canMoveUp)
                obj.y -= speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        } else if (obj.moveDir === 'down') {
            if (canMoveDown)
                obj.y += speed * Time.scaledDeltaTime * Draw.normalizedUnit();
        }
    }
}