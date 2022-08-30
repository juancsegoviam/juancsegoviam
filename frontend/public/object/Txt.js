import phasre from "phaser";

export default class Txt extends Phaser.GameObjects.Text
{
    constructor(scene, x, y, letters, screenx, screeny, type, number, align)
    {
        super(scene, x, y, letters, screenx, screeny, type, number, align)

        var size;
        var disp;
        var a;

       


        if(type === 'h1') 
        {
            size = screenx * .032

        }
        else if(type === 'h2')
        {
            size = screeny * .03
        }
        else if(type === 'p')
        {
            size = screeny * .02
        }

        if(align == 'center')
        {
            a = 0.5
        }
        else if(align == 'left')
        {
            a = 1.0

        }
        else if(align == 'right')
        {
            a = 0.0
        }

    

        disp = (size)* (number/4)




     


        this.txt = scene.add.text(x - disp, y , letters, { 
            fontFamily: 'Garamond' ,
            fontSize: size,
            setOrigin:0,

            backgroundColor: null,
            color: '#fff',
            stroke: '#fff',
            strokeThickness: 0,
            align: 'center',  // 'left'|'center'|'right'|'justify'
         
        }).setOrigin(0,a)
   
      
    }

    
}