class Input {
    constructor() {}

    static checkKey(e) {
        var left = 1;
        var right = 0;
        var up = 1.5;
        var down = 0.5;

        switch (e.keyCode) {
            case 37:
                if (pacman.leftObject() > 2 && Draw.pacmanDir != left) {
                    Draw.pacmanDir = left;
                }
                break;
            case 38:
                if (pacman.topObject() > 2 && Draw.pacmanDir != up) {
                    Draw.pacmanDir = up;
                }
                break;
            case 39:
                if (pacman.rightObject() > 2 && Draw.pacmanDir != right) {
                    Draw.pacmanDir = right;
                }
                break;
            case 40:
                if (pacman.bottomObject() > 2 && Draw.pacmanDir != down) {
                    Draw.pacmanDir = down;
                }
                break;
        }
    }
}