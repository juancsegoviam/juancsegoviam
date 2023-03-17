import Phaser from 'phaser';
import Tutorial from "./states/Tutorial.js";
import Tutorial2 from './states/Tutorial2.js';
import Preload from './states/Preload.js';
import Tutorial3 from './states/Tutorial3.js';
import Tutorial4 from './states/Tutorial4';
import Tutorial42 from './states/Tutorial42'
import Autoshaping from './states/Autoshaping.js';
import Anterogrado from './states/Anterogrado.js';
import Retrogrado from './states/Retrogrado.js'
import ECsolo from './states/ECsolo.js'
import Backward from './states/Backward.js';
import Final from './states/Final.js';
import ECalone from './states/ECalone'
import Anterogrado2 from './states/Anterogrado2';




var puntos;
var x  = window.innerWidth -15;
var y =  window.innerHeight- 25;
console.log(cond)





const config = {
    
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: x,
        height: y,
      },
    type: Phaser.Auto,
    //backgroundColor: '#616161',
    physics: {
        default: 'arcade',
        arcade:{
            gravity:{ y: 0},
            enableBody: true,
            debug: false
        }
    } 
}

const game = new Phaser.Game(config);



game.scene.add('Preload', Preload);
game.scene.add('Tutorial', Tutorial);
game.scene.add('Tutorial2', Tutorial2);
game.scene.add('Tutorial3', Tutorial3);
game.scene.add('Autoshaping', Autoshaping);
game.scene.add('Anterogrado', Anterogrado);
game.scene.add('Anterogrado2', Anterogrado2);
game.scene.add('Retrogrado', Retrogrado);
game.scene.add('ECsolo', ECsolo);
game.scene.add('Tutorial4', Tutorial4);
game.scene.add('Tutorial42', Tutorial42);
game.scene.add('Final',Final);
game.scene.add('Backward', Backward)
game.scene.add('ECalone', ECalone)


game.scene.start('Preload');


