class AI {

    constructor() {

    }

    // mode, 1, 2-4, 5+
    static modePatterns = [
        ['scatter', 7, 7, 5],
        ['chase', 20, 20, 20],
        ['scatter', 7, 7, 5],
        ['chase', 20, 20, 20],
        ['scatter', 5, 5, 5],
        ['chase', 20, 1033, 1037],
        ['scatter', 5, 1 / 60, 1 / 60],
        ['chase', -1, -1, -1]
    ];
}