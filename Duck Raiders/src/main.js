import Duck from './Scenes/Duck.js';
import MainMenu from './Scenes/MainMenu.js';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 1600,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainMenu, Duck]
};

const game = new Phaser.Game(config);