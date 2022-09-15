
import { gameState, world } from "../consts/Const";import {txt11 } from "../consts/txt";
import Txt from "../object/Txt";
var x  = window.innerWidth-15;
var y =  window.innerHeight-20;

export default class Final extends Phaser.Scene

{
    create()
    {
        gameState.tTxt =  new Txt(this, x/2 + (x/256 * 10) ,y/2 ,txt11,x,y, 'h1', 31, 'center');
    }
}