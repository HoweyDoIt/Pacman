class Input {
    constructor() { }

    static leftPressed = false;
    static rightPressed = false;
    static upPressed = false;
    static downPressed = false;

    static checkKeyDown(e) {
        // var left = 1;
        // var right = 0;
        // var up = 1.5;
        // var down = 0.5;

        switch (e.keyCode) {
            case 37:
                Input.leftPressed = true;

                // if (pacman.leftObject() > 2 && Draw.pacmanDir != left) {
                //     Draw.pacmanDir = left;
                // }
                break;
            case 38:
                Input.upPressed = true;

                // if (pacman.topObject() > 2 && Draw.pacmanDir != up) {
                //     Draw.pacmanDir = up;
                // }
                break;
            case 39:
                Input.rightPressed = true;

                // if (pacman.rightObject() > 2 && Draw.pacmanDir != right) {
                //     Draw.pacmanDir = right;
                // }
                break;
            case 40:
                Input.downPressed = true;

                // if (pacman.bottomObject() > 2 && Draw.pacmanDir != down) {
                //     Draw.pacmanDir = down;
                // }
                break;
        }
    }

    static checkKeyUp(e) {
        switch (e.keyCode) {
            case 37:
                Input.leftPressed = false;
                break;
            case 38:
                Input.upPressed = false;
                break;
            case 39:
                Input.rightPressed = false;
                break;
            case 40:
                Input.downPressed = false;
                break;
        }
    }

    static update() {
        if (Input.leftPressed === true) {
            if (pacman.leftObject() > 2 && pacman.moveDir != 'left') {
                pacman.moveDir = 'left';
            }
        }

        if (Input.upPressed === true) {
            if (pacman.topObject() > 2 && pacman.moveDir != 'up') {
                pacman.moveDir = 'up';
            }
        }

        if (Input.rightPressed === true) {
            if (pacman.rightObject() > 2 && pacman.moveDir != 'right') {
                pacman.moveDir = 'right';
            }
        }

        if (Input.downPressed === true) {
            if (pacman.bottomObject() > 2 && pacman.moveDir != 'down') {
                pacman.moveDir = 'down';
            }
        }
    }
}