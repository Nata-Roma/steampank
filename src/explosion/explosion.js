export class Explosion {
    constructor() {
        this.frameX = 0;
        this.fps = 25;
        this.timer = 0;
        this.interval = 1000 / this.fps;
        this.markedForDeletion = false;
    }

    update(deltaTime, gameSpeed) {
        this.x -= gameSpeed;
        if (this.timer > this.interval) {
            this.frameX += 1;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.setDeletion(true);
    }

    draw(context) {
        if (this.image) {
            context.drawImage(
                this.image,
                this.frameX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width,
                this.height,
            );
        }
    }

    setDeletion(state) {
        this.markedForDeletion = state;
    }
}
