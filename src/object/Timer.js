class Timer {
    constructor(duration, callback) {
        this.end = Time.timeSinceStart + duration;
        this.callback = callback;
        // console.log('Timer - Start:', Time.timeSinceStart, 'Duration:', duration, 'End:', this.end);
    };
}