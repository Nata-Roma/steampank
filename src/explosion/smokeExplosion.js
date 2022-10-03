import { helper } from '../utils/helper';
import { explosionData } from '../utils/utils';
import { Explosion } from './explosion';

export class SmokeExplosion extends Explosion {
    constructor(x, y) {
        super();
        this.image = helper.smokeExplosion;
        this.data = explosionData.find((item) => item.name === 'smokeExplosion');
        this.spriteWidth = this.data.width;
        this.spriteHeight = this.data.height;
        this.width = this.data.width;
        this.height = this.data.height;
        this.maxFrame = this.data.maxFrame;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }
}
