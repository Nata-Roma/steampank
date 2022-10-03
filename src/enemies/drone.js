import { Enemy } from '../enemy';
import { helper } from '../utils/helper';
import { enemyData } from '../utils/utils';

export class Drone extends Enemy {
    constructor(x, y, name, gameWidth, gameHeight) {
        super(gameWidth, x, y);
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.lives = 0;
        this.score = 0;
        this.image = null;
        this.init(gameHeight, name);
    }
    async init(gameHeight, name) {
        const data = enemyData.find((item) => item.name === name);
        this.width = data.width;
        this.height = data.height;
        //this.y = Math.random() * (gameHeight * 0.95 - this.height);
        this.speedX = Math.random() * data.speed + data.addSpead;
        this.lives = data.lives;
        this.score = data.score;
        this.type = data.type;
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * data.rows);
        this.maxFrame = data.maxFrame;
        this.image = await helper.getImage(data);
    }
}
