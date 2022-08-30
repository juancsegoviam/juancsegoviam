import Phaser from "phaser";

//Constantes
import {tutorial} from "../consts/Const"
import { txt2,txt3,txt4,txt5,txt6 } from "../consts/txt";

//Objetos
import Txt from "../object/Txt";
import BlankButton from "../object/BlankButton"
import tutorialBar from "../object/tutorialBar";
import CustomButton from "../object/CustomButton";

//referencias 
var x  = window.innerWidth-15;
var y =  window.innerHeight-20;
var xr = 1905;
var yr = 917;
var ratio = ((x/xr)+(y/yr))/2

//variables
var cont;
var ratiox = x/xr;
var ratioy = y/yr
var fun;
var a = 0;







export default class Boot extends Phaser.Scene{

    
     
    create() 
    {
      //Declaración de capas
      tutorial.c1 = {};
      tutorial.cc = {};

      //Base
      tutorial.player = this.physics.add.image(x/2,y/2, 'player').setDisplaySize(104 * ratio,104 * ratio);
      tutorial.point = new Phaser.Geom.Rectangle(0, 0, 16, 16);
      tutorial.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: "#FF0000" }});
      tutorial.circle1 = new Phaser.Geom.Circle(x/2,y/2, 130 * ratio);
      tutorial.circle2 = new Phaser.Geom.Circle(x/2,y/2, 400 * ratio);
      tutorial.teclaD = this.physics.add.sprite(x/16 + (x/256 * 42), y/16 + (y/256 * 20), 'teclaD').setScale(ratio)

      //Instrucciones
      tutorial.tTxt1 = new Txt(this, tutorial.teclaD.x - (tutorial.teclaD.width/3) , tutorial.teclaD.y +(y/256 * 5)  ,txt5,x,y, 'h2', 31, 'center');
      tutorial.tTxt2 = new Txt(this, tutorial.tTxt1.x - (x/256 * 5), tutorial.teclaI.y +(y/256 * 25)  ,txt4,x,y, 'h2', 31, 'center');
      tutorial.rect = this.add.rectangle( x/16 + (x/256 * 25), y/16 + (y/256 * 60), 220, 40, 0x808080);

       //Barra de progreso
      tutorial.progress = this.add.graphics(0,0);
      tutorial.progress.fillStyle(0xff0000);
      tutorial.progress.fillRect(x/2, y - ((y/16)*9))
      tutorial.tbar = new tutorialBar(this, tutorial.rect.x,tutorial.rect.y,6);

       //Animacion de la tecla a presionar 
      tutorial.teclaD.anims.create(
        {
          key: 'hit',
          frames: this.anims.generateFrameNumbers('teclaD', { start: 0, end: 1 }),
          frameRate: 1,
          repeat: -1
        });

      tutorial.teclaD.play('hit',true);


      //Capa 1
      tutorial.c1
      tutorial.c1.base = this.add.graphics();
      tutorial.c1.Mask =  this.add.graphics().setVisible(false);
      tutorial.c1.bMask = tutorial.c1.Mask.createGeometryMask().setInvertAlpha(true);
      tutorial.c1.bMask2 = tutorial.c1.Mask.createGeometryMask().setInvertAlpha(true);
      tutorial.c1.base.setMask(tutorial.c1.bMask);
      tutorial.c1.base.fillStyle(0x000000).fillRect(0, 0, x, y).setAlpha(0.8);
      tutorial.c1.base.setMask(tutorial.c1.bMask2);
      tutorial.c1.Mask .fillStyle(0xC47AC0).fillRect(x/16, y/16, 375 * ratiox, 240 * ratioy);
      tutorial.c1.button = new BlankButton(this, x/2 , (y/256 * 150), 'button1','button2', 'button3', 'Continuar', con).setScale(ratio);
      this.add.existing(tutorial.c1.button);
      tutorial.c1.tTxt = new Txt(this,x/2 + (x/256 * 5), (y/256 * 105) ,txt3,x,y, 'h2', 31);
     
      function con(){
        tutorial.c1.base.destroy();
        tutorial.c1.tTxt.txt.destroy();
        tutorial.c1.button.destroy();
        cont = 1
      };
      
      
    }

  

    update()
    {
      
      tutorial.graphics.clear();
      tutorial.graphics.lineStyle(2,0x48A9A6);
      tutorial.graphics.strokeCircleShape(tutorial.circle1);
      tutorial.graphics.lineStyle(2,0xC1666B);
      tutorial.graphics.strokeCircleShape(tutorial.circle2);
      tutorial.graphics.fillStyle(0xff00ff);
      tutorial.graphics.fillRect(tutorial.point.x - 8, tutorial.point.y - 8, tutorial.point.width, tutorial.point.height);
      Phaser.Geom.Circle.CircumferencePoint(tutorial.circle1, a, tutorial.player);
      Phaser.Geom.Circle.CircumferencePoint(tutorial.circle2, a, tutorial.point);
      tutorial.cursors = this.input.keyboard.createCursorKeys();
      tutorial.player.setRotation(Phaser.Math.Angle.Between(tutorial.point.x, tutorial.point.y, tutorial.player.x, tutorial.player.y) - Math.PI / 2);
    
      tutorial.tbar.setPercent(a)

      

      if(a > 6.2){
        cont = 0 
        fun = 1
      

      }

      if(fun === 1){
        this.change()
        fun++
      }
      
   

      if(cont === 1) 
      {
        if(tutorial.cursors.right.isDown)
        {
          console.log(a)
          a += 0.06;
          tutorial.player.angle += 0.01;
          if(a >= Phaser.Math.PI2)
          {
            a -= Phaser.Math.PI2
          };
        };
      }



    }
    change() 
    {
      tutorial.cc.base = this.add.graphics();
      tutorial.cc.Mask =  this.add.graphics().setVisible(false);
      tutorial.cc.bMask = tutorial.cc.Mask.createGeometryMask().setInvertAlpha(true);
      tutorial.cc.bMask2 = tutorial.cc.Mask.createGeometryMask().setInvertAlpha(true);
      tutorial.cc.base.setMask(tutorial.cc.bMask);
      tutorial.cc.base.fillStyle(0x000000).fillRect(0, 0, x, y).setAlpha(0.8);
        
      const button = new CustomButton(this, x/2 , y/2 + 50, 'button1','button2', 'button3', 'Continuar', 'Tutorial3').setScale(ratio);
      this.add.existing(button)
        
    
      tutorial.cc.txt = new Txt(this, button.x , button.y - ((button.height * ratio)*2.0) ,txt6,x,y, 'h2', 31, 'right')
       

    }


   

        
        
 }