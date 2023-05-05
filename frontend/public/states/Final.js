
import { gameState, world } from "../consts/Const";0
import {puntos} from "../states/Autoshaping";
import {puntes} from "../states/Backward";
import {puntis} from "../states/ECalone";
import {puntos2} from "../states/Anterogrado"
import {puntes2} from "../states/Retrogrado"
import {puntis2} from "../states/ECsolo"



import Txt from "../object/Txt";
var x  = window.innerWidth-15;
var y =  window.innerHeight-20;

export default class Final extends Phaser.Scene

{
    create()
    {
       switch(cond){
        case "EXP":
            var dinero = puntos * .01
            break;
        case "BCW":
            var dinero = puntes * .01
            break;
        case "ECA":
            var dinero = puntis * .01
            break;
        case "ANT":
            var dinero = puntos2 * .01
            break;
        case "RET":
            var dinero = puntes2 * .01
            break;
        case "ECS":
            var dinero = puntis2 * .01
            break;

       }
        
        console.log(dinero)
        const txt11 = `Muchísimas gracias por participar.\n Ganaste $${dinero} pesos.\nTe pedimos que le digas al investigador que ya\n acabaste con el experimento.\n Para salir de pantalla completa \npresiona F11 si usas Windows o Linux o \nCTRL+CMD+f si usas Mac.\n `
        gameState.tTxt =  new Txt(this, x/2 - (x/256 * 15) ,y/2 ,txt11,x,y, 'h1', 31, 'center');

    }
}