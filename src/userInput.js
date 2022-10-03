export class UserInput {
    constructor() {
        //this.game = game;
        window.addEventListener('keydown', (e) => {
            if (
                (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
                this.getKeys().indexOf(e.key) === -1
            ) {
                this.setKeys(e.key);
            }
            if (e.key === ' ') {
                this.shootTop();
            }
            if (e.key === 'd') {
                this.toggleDebugMode();
            }
        });
        window.addEventListener('keyup', (e) => {
            this.removeKey(e.key);
        });
    }
}
