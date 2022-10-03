import { explosionData, gearsData, projectileData } from './utils';

export class Helper {
    constructor() {
        this.projectileImage = null;
        this.gearsImage = null;
        this.fireExplosion = null;
        this.smokeExplosion = null;

        this.init();
    }
    async init() {
        this.projectileImage = await this.getImage(projectileData);
        this.gearsImage = await this.getImage(gearsData);
        this.fireExplosion = await this.getImage(
            explosionData.find((item) => item.name === 'fireExplosion'),
        );
        this.smokeExplosion = await this.getImage(
            explosionData.find((item) => item.name === 'smokeExplosion'),
        );
    }
    
    async getImage(data) {
        return new Promise((res, rej) => {
            const image = new Image();
            image.onload = () => res(image);
            image.src = data.path;
        });
    }

    getProgectileImage() {
        return this.projectileImage;
    }
}

export const helper = new Helper();
