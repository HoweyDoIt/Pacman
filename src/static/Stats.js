class Stats {
    constructor() {}

    static lives = 3;
    static currentScore = 0;
    static highScore = 10000;

    static addToScore(points) {
        Stats.currentScore += points;

        if (Stats.currentScore > Stats.highScore)
            Stats.highScore = Stats.currentScore;

        // console.log(Stats.currentScore);
    }

    static reset() {
        Stats.lives = 3;
        Stats.currentScore = 0;
    }
}