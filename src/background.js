import { Layer } from './layer';
import { helper } from './utils/helper';

export class Background {
    constructor(backgroundLayers) {
        this.layers = [];
        this.frontLayer = null;
        this.init(backgroundLayers);
    }
    update(speed) {
        this.layers.forEach((layer) => layer.update(speed));
    }
    updateFrontLayer(speed) {
        this.frontLayer?.update(speed);
    }
    draw(context) {
        this.layers?.forEach((layer) => layer.draw(context));
    }
    drawFrontLayer(context) {
        this.frontLayer?.draw(context);
    }

    async init(backgroundLayers) {
        for (let i = 0; i < backgroundLayers.length - 1; i++) {
            const image = await helper.getImage(backgroundLayers[i]);
            this.layers.push(new Layer(image, backgroundLayers[i].speed));
        }

        const frontData = backgroundLayers.find((item) => item.name === 'frontLayer');
        if (frontData) {
            const image = await helper.getImage(frontData);
            this.frontLayer = new Layer(image, frontData.speed);
        }
    }
}
