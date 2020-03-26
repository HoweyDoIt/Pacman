class GameObject {

    constructor(color, x, y, drawFunction) {
        this.color = color;
        this.x = x * unit + (unit / 2);
        this.y = y * unit + (unit / 2);
        this.scale = 1.0;
        this.drawFunction = drawFunction;
    }

    draw() {
        this.drawFunction(this.color, this.x, this.y, this.scale);
    }

    // Nearby Objects

    leftObject() {
        return levelSetup[this.roundedY()][this.roundedX() - 1];
    }

    rightObject() {
        return levelSetup[this.roundedY()][this.roundedX() + 1];
    }

    topObject() {
        return levelSetup[this.roundedY() - 1][this.roundedX()];
    }

    bottomObject() {
        return levelSetup[this.roundedY() + 1][this.roundedX()];
    }

    // Values

    roundedX() {
        return Math.round(this.gridX());
    }

    roundedY() {
        return Math.round(this.gridY());
    }

    gridX() {
        return this.x / unit - 0.5;
    }

    gridY() {
        return this.y / unit - 0.5;
    }

    roundedAbsoluteX() {
        return this.roundedX() * unit + (unit / 2);
    }

    roundedAbsoluteY() {
        return this.roundedY() * unit + unit / 2;
    }
}