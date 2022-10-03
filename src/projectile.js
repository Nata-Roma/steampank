import { helper } from "./utils/helper";

export class Projectile {
    constructor(game, x, y, gameWidth) {
        this.game = game;
        this.gameWidth = gameWidth
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 3;
        this.spead = 3;
        this.markedForDeletion = false;
        this.projectileImage = null;
    }
    
    update() {
        if(!this.projectileImage) this.projectileImage = helper.getProgectileImage();
        this.x += this.spead
        if(this.x > this.gameWidth * 0.8) this.markedForDeletion = true;
    }
    draw(context) {
        // context.fillStyle = 'yellow';
        // context.fillRect(this.x, this.y, this.width, this.height);
        if(this.projectileImage) {
            context.drawImage(this.projectileImage, this.x, this.y);
        }
    }
    getProjectile() {
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
}
