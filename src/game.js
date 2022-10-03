import { Background } from './background';
import { Player } from './player';
import { UI } from './ui';
import { UserInput } from './userInput';
import { backgroundLayers } from './utils/utils';
import { Angler2 } from './enemies/angler2';
import { Angler1 } from './enemies/angler1';
import { LuckyFish } from './enemies/lucky';
import { Particle } from './particle';
import { Drone } from './enemies/drone';
import { SmokeExplosion } from './explosion/smokeExplosion';
import { FireExplosion } from './explosion/fireExplosion';

export class Game extends UserInput {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.keys = [];
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 350;
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1700;
        this.particles = [];
        this.explosions = [];
        this.gameTime = 0;
        this.gameTimeLimit = 30000;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 100;
        this.speed = 1;

        this.debugMode = false;

        this.player = new Player();
        this.ui = new UI(this.width, this.height);
        this.background = new Background(backgroundLayers);
    }
    update(deltaTime) {
        this.background.update(this.speed);
        this.background.updateFrontLayer(this.speed);

        if (!this.gameOver) this.gameTime += deltaTime;
        if (this.gameTime > this.gameTimeLimit) this.gameOver = true;

        this.player.update([...this.keys], deltaTime, this.height, this.addAmmo);
        if (this.ammoTimer > this.ammoInterval) {
            this.addAmmo(1);
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }

        this.particles.forEach((particle) => particle.update(this.height, this.speed));
        this.particles = this.particles.filter((particle) => !particle.markedForDeletion);

        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy(this.width, this.height);
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }

        this.updateEnemies();
        this.explosions.forEach((explosion) => explosion.update(deltaTime, this.speed));
        this.explosions = this.explosions.filter((explosion) => !explosion.markedForDeletion);
        this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    }
    updateEnemies() {
        this.enemies.forEach((enemy) => {
            enemy.update();
            const enemyData = enemy.getEnemy();
            if (this.checkCollision(this.player.getPlayer(), enemyData)) {
                enemy.setDeletion(true);
                this.addExplosion(enemyData);
                this.throwParticles(enemy.getScore(), enemyData);

                if (!this.gameOver) {
                    if (enemy.getType() === 'lucky') {
                        this.setMaxAmmo();
                        this.player.setPowerUp();
                    } else {
                        this.score -= 1;
                    }
                }
            }
            this.updateProjectiles(enemyData, enemy);
        });
    }
    updateProjectiles(enemyData, enemy) {
        this.player.projectiles.forEach((projectile) => {
            if (this.checkCollision(projectile.getProjectile(), enemyData)) {
                projectile.setDeletion(true);
                this.addExplosion(enemyData);
                enemy.setLives(-1);
                this.throwParticles(1, enemyData);
                if (enemy.getLives() <= 0) {
                    enemy.setDeletion(true);
                    this.addExplosion(enemyData);
                    if (enemy.getType() === 'hive') {
                        for (let i = 0; i < 5; i++) {
                            this.addDrone(enemyData);
                        }
                    }
                    this.throwParticles(enemy.getScore(), enemyData);
                    if (!this.gameOver) {
                        this.score += enemy.getScore();
                    }
                    if (this.score >= this.winningScore) {
                        this.gameOver = true;
                    }
                }
            }
        });
    }

    draw(context) {
        this.background.draw(context);
        this.ui.draw(
            context,
            this.ammo,
            this.score,
            this.gameTime,
            this.gameOver,
            this.score >= this.winningScore,
            this.player.getPowerUp(),
        );
        this.player.draw(context, this.debugMode);
        this.particles.forEach((particle) => particle.draw(context));
        this.enemies.forEach((enemy) => enemy.draw(context, this.debugMode));
        this.explosions.forEach((explosion) => explosion.draw(context));
        this.background.drawFrontLayer(context);
    }

    //keyboard actions
    setKeys(key) {
        this.keys.push(key);
    }
    getKeys() {
        return this.keys;
    }
    removeKey(key) {
        const index = this.keys.indexOf(key);
        if (index > -1) {
            this.keys.splice(index, 1);
        }
    }

    //change ammo quantities
    removeAmmo = () => {
        if (this.ammo) {
            this.ammo -= 1;
        }
    };
    addAmmo = (num) => {
        if (this.ammo < this.maxAmmo) {
            this.ammo += num;
        }
    };
    getAmmo() {
        if (this.ammo) return true;
        return false;
    }
    setMaxAmmo() {
        this.ammo = this.maxAmmo;
    }

    shootTop() {
        this.player.shootTop(this.ammo, this.width, this.removeAmmo);
    }

    addEnemy(width, height, name) {
        const randomize = Math.random();
        if (randomize < 0.3) {
            this.enemies.push(new Angler1(width, height, 'angler1'));
        } else if (randomize < 0.6) {
            this.enemies.push(new Angler2(width, height, 'angler2'));
        } else if (randomize < 0.7) {
            this.enemies.push(new Angler1(width, height, 'hiveWhale'));
        } else {
            this.enemies.push(new LuckyFish(width, height, 'lucky'));
        }
    }
    addDrone(data) {
        this.enemies.push(
            new Drone(
                data.x + Math.random() * data.width,
                data.y + Math.random(data.height) * 0.5,
                'drone',
                this.width,
                this.height,
            ),
        );
    }
    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    toggleDebugMode() {
        this.debugMode = !this.debugMode;
    }

    throwParticles(num, enemyData) {
        for (let i = 0; i < num; i++) {
            this.particles.push(
                new Particle(
                    enemyData.x + enemyData.width * 0.5,
                    enemyData.y + enemyData.height * 0.5,
                ),
            );
        }
    }

    addExplosion(enemyData) {
        const randomize = Math.random();
        if (randomize < 0.5) {
            this.explosions.push(
                new SmokeExplosion(
                    enemyData.x + enemyData.width * 0.5,
                    enemyData.y + enemyData.height * 0.5,
                ),
            );
        } else {
            this.explosions.push(
                new FireExplosion(
                    enemyData.x + enemyData.width * 0.5,
                    enemyData.y + enemyData.height * 0.5,
                ),
            );
        }
    }
}
