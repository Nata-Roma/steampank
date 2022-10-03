export class UI {
    constructor(width, height) {
        this.color = 'white';
        this.powerUpColor = '#ffffbd';
        this.fontFamily = 'Bangers';
        this.fontSize = 25;
        this.width = width;
        this.height = height;
    }
    draw(context, ammo, score, gameTime, isOver, isWin, powerUp) {
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.fillText('Score: ' + score, 20, 40);
        context.fillText(`Timer: ${this.formatNumToText(gameTime)}`, 20, 100);

        if (isOver) {
            context.textAlign = 'center';
            let message1, message2;
            if (isWin) {
                message1 = 'You win!';
                message2 = 'Well done!';
            } else {
                message1 = 'You lose!';
                message2 = 'Try again next time!';
            }
            context.font = `75px ${this.fontFamily}`;
            context.fillText(message1, this.width / 2, this.height / 2 - 25);
            context.font = `30px ${this.fontFamily}`;
            context.fillText(message2, this.width / 2, this.height / 2 + 25);
        }

        if (powerUp) context.fillStyle = this.powerUpColor;
        for (let i = 0; i < ammo; i++) {
            context.fillRect(20 + 7 * i, 50, 3, 20);
        }

        context.restore();
    }

    formatNumToText(num) {
        return (num / 1000).toFixed(1);
    }
}
