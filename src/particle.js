import { helper } from './utils/helper';
import { gearsData } from './utils/utils';

export class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = helper.gearsImage;
        this.frameX = Math.floor(Math.random() * gearsData.columns);
        this.frameY = Math.floor(Math.random() * gearsData.rows);
        this.spriteSize = gearsData.size;
        this.sizeModifier = Math.random() * gearsData.sizeModifier + gearsData.addSizeModifier;
        this.size = this.spriteSize * this.sizeModifier;
        this.markedForDeletion = false;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * -15;
        this.gravity = 0.5;
        this.angle = 0;
        this.velocityAngel = Math.random() * 0.2 - 0.1;
        this.bounced = 0;
        this.bouncedBottom = Math.random() * 80 + 60;
    }

    update(gameHeight, gameSpeed) {
        this.angle += this.velocityAngel;
        this.speedY += this.gravity;
        this.x -= this.speedX + gameSpeed;
        this.y += this.speedY;
        if (this.y > gameHeight + this.size || this.y < 0 - this.size) {
            this.setDeletion(true);
        }
        if (this.y > gameHeight - this.bouncedBottom && this.bounced < 2) {
            this.bounced += 1;
            this.speedY *= -0.7;
        }
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(
            this.image,
            this.frameX * this.spriteSize,
            this.frameY * this.spriteSize,
            this.spriteSize,
            this.spriteSize,
            -this.size * 0.5,
            -this.size * 0.5,
            this.size,
            this.size,
        );
        context.restore();
    }

    setDeletion(state) {
        this.markedForDeletion = state;
    }
}
