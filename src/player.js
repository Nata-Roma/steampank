import { Projectile } from './projectile';
import { helper } from './utils/helper';
import { playerData } from './utils/utils';

export class Player {
    constructor() {
        this.width = 120;
        this.height = 190;
        this.x = 20;
        this.y = 120;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
        this.speedY = 0;
        this.maxSpeed = 2;
        this.powerUp = false;
        this.powerUpTimer = 0;
        this.powerUpLimit = 5000;
        this.projectiles = [];
        this.image = null;
        this.init();
    }
    async init() {
        this.image = await helper.getImage(playerData);
    }

    update(keys, deltaTime, gameHeight, increaseAmmo) {
        this.setSpeedY(keys);
        this.y += this.speedY;
        if (this.y + this.height / 2 > gameHeight) this.y = gameHeight - this.height / 2;
        if (this.y < -this.height / 2) this.y = -this.height / 2;
        this.projectiles.forEach((projectile) => projectile.update());
        this.projectiles = this.projectiles.filter((projectile) => !projectile.markedForDeletion);
        if (this.powerUp) {
            if (this.powerUpTimer > this.powerUpLimit) {
                this.removePowerUp();
            } else {
                this.powerUpTimer += deltaTime;
                increaseAmmo(0.1);
            }
        }
    }
    draw(context, debugMode) {
        if (debugMode) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        this.projectiles.forEach((projectile) => projectile.draw(context));
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
    }

    shootTop(ammo, gameWidth, removeAmmo) {
        if (ammo) {
            this.projectiles.push(new Projectile(gameWidth, this.x + 80, this.y + 30));
            removeAmmo();
            this.powerUp && this.shootBottom(ammo, gameWidth);
        }
    }

    shootBottom(ammo, gameWidth) {
        if (ammo) {
            this.projectiles.push(new Projectile(gameWidth, this.x + 80, this.y + 175));
        }
    }

    setSpeedY(keys) {
        if (keys.indexOf('ArrowUp') > -1) {
            this.speedY = -this.maxSpeed;
        } else if (keys.indexOf('ArrowDown') > -1) {
            this.speedY = this.maxSpeed;
        } else {
            this.speedY = 0;
        }
    }

    getPlayer() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }
    setPowerUp() {
        this.powerUp = true;
        this.frameY = 1;
        this.powerUpTimer = 0;
    }
    removePowerUp() {
        this.powerUp = false;
        this.frameY = 0;
        this.powerUpTimer = 0;
    }
    getPowerUp() {
        return this.powerUp;
    }
}
