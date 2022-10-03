export class Enemy {
    constructor(gameWidth) {
        this.x = gameWidth;

        this.markedForDeletion = false;
    }

    update() {
        this.x += this.speedX;
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }
    draw(context, debugMode) {
        debugMode && context.strokeRect(this.x, this.y, this.width, this.height);
        this.image &&
            context.drawImage(
                this.image,
                this.frameX * this.width,
                this.frameY * this.height,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width,
                this.height,
            );
        this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
        context.font = '20px Helvetica';
        debugMode && context.fillText(this.lives, this.x, this.y);
    }
    getEnemy() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }
    setDeletion(state) {
        this.markedForDeletion = state;
    }
    setLives(num) {
        this.lives += num;
    }
    getLives() {
        return this.lives;
    }
    getScore() {
        return this.score;
    }
    getType() {
        return this.type;
    }
}
