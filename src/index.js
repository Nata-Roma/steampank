import { Game } from './game';
import './styles.css';

class App {
    constructor(parentNode) {
        this.canvas = document.createElement('canvas');
        parentNode.classList.add('body');
        parentNode.append(this.canvas);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.canvas.classList.add('canvas');

        this.button = document.createElement('button');
        parentNode.append(this.button);
        this.button.classList.add('start_btn');
        this.button.textContent = 'Reload';
        this.button.onclick = () => {
            this.button.blur();
            this.canvas.focus();
            this.game = null;
        };

        this.game = new Game(this.canvas.width, this.canvas.height);
        this.lastTime = 0;

            this.animate(this.lastTime);
    }

    animate = (timestamp) => {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.game) {
            this.game.draw(this.context);
            this.game.update(deltaTime);
        } else {
            this.game = new Game(this.canvas.width, this.canvas.height);
        }
        requestAnimationFrame(this.animate);
    };
}






const app = new App(document.body);
