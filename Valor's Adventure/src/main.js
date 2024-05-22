
import Preload from './Scenes/PreloadScene.js';
import Home from './Scenes/HomeScene.js';
import Start from './Scenes/StartScene.js';
import Over from './Scenes/OverScene.js';

window.GameWidth = document.getElementById('phaser-game').offsetWidth;
window.GameHeight = document.getElementById('phaser-game').offsetHeight;
window.GameState = 'GAME OVER'
window.GameTime = '00:00'
window.GameScore = 0
window.GameVolume = 1


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: window.GameWidth,
    height: window.GameHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Preload, Home, Start, Over]
};

const game = new Phaser.Game(config);
