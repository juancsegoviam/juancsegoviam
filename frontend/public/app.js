import Phaser from 'phaser';
import Tutorial from "./states/Tutorial.js";
import Tutorial2 from './states/Tutorial2.js';
import Preload from './states/Preload.js';
import Tutorial3 from './states/Tutorial3.js';
import Tutorial4 from './states/Tutorial4'
import Autoshaping from './states/Autoshaping.js';



var x  = window.innerWidth -15;
var y =  window.innerHeight- 25;





const config = {
    width: x,
    height: y,
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
game.scene.add('Tutorial4', Tutorial4);


game.scene.start('Preload');


