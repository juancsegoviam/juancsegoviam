import Phaser from "phaser"

//Imagenes
import button1 from  '../images/rect.png';
import button2 from '../images/rect2.png';
import button3 from '../images/rect3.png';
import player from '../images/player.png';
import bullet from '../images/bullet.png';
import sti from '../images/sti.png';
import cent from '../images/cent.png';
import teclaI from '../images/teclai.png';
import teclaD from '../images/teclaD.png';
import tbar from '../images/tbar.png'
import barra from '../images/barra.png'

//Constantes
import {tutorial} from "../consts/Const"

//Objetos 
import ProgressBar from "../object/ProgessBar";
import Txt from "../object/Txt";
import { txt1 } from "../consts/txt";
import CustomButton from "../object/CustomButton";

//referencias 
var x  = window.innerWidth-15;
var y =  window.innerHeight-20;
var xr = 1905;
var yr = 917;
var ratio = ((x/xr)+(y/yr))/2
var ratioy = (y/yr)/2
console.log(x,y)


export default class Preload extends Phaser.Scene{
    preload()
    {

        this.load.image('button1', button1);
        this.load.image('button2', button2);
        this.load.image('button3', button3);
        this.load.image('player', player);
        this.load.image('bullet', bullet);
        this.load.image('tbar',tbar)

        this.load.spritesheet('sti', sti, { frameWidth: 500 , frameHeight: 500 });
        this.load.spritesheet('cent', cent, { frameWidth: 500 , frameHeight: 500 });
        this.load.spritesheet('teclaI', teclaI, { frameWidth: 150, frameHeight: 150});
        this.load.spritesheet('teclaD', teclaD, { frameWidth: 150 , frameHeight: 150});
        this.load.spritesheet('barra', barra, { frameWidth: 150 , frameHeight: 150});

        const progressBar = new ProgressBar(this, x, y);
        this.add.existing(progressBar)
        
    };

    create()
    {
      
        tutorial.btn1 = this.add.existing(new CustomButton(this, x/2 , y/2 + 50, 'button1','button2', 'button3', 'CONTINUAR', 'Tutorial').setScale(ratio));

       
        tutorial.txt1 = new Txt(this, tutorial.btn1.x - ((x/256 * 58) ) , tutorial.btn1.y - ((tutorial.btn1.height * ratioy)*6) ,txt1,x,y, 'p', 31, 'right') ;

    };
  
}