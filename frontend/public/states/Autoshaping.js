import { gameState, world, holo, Bullet } from "../consts/Const";

import {txt9, txt13 } from "../consts/txt";

//Objetos
import Txt from "../object/Txt";


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




let bullets;
let lastFired;
let initTime;
let expTime;
let a = 0;
let elapsedTime;
let intervol;
let trialTime;
var index;
var iti;
var startS;
var startR;
var endS;
var endR;
var par = 0;
var par2 = 0;
var limit1 = 0;
var limit2 = 0;
var end = 0;

let pass = 0;
let test = 0;
let fase;
let hola = '123456'

var dataMatrix = {
  puntos: "no puntos",
  tiempoT:[],
  tiempoE:[],
  evento:[],
  fase:[]
};

const listIti = [369,7490,69,1148,213,4690,1691,3633,537, 721, 924,1402, 2947,2029,2436];
const listP = [369,7490,69,1148,213,4690,1691,3633,537, 721, 924,1402, 2947,2029,2436];
const stiDur = 3000; 
const reiDur = 3000;
//anterogrado = 1, retrogrado = 2
const arreglo = 1;
const dem = 3000;
const ensayos = listIti.length;
const pruebas = listP.length;

export default class Autoshaping extends Phaser.Scene
{
    create()
    {
     

     console.log(cond)


        gameState.player = this.physics.add.image(x/2,y/2, 'player').setDisplaySize(104 * ratio,104 * ratio);




        gameState.point = new Phaser.Geom.Rectangle(0, 0, 16, 16);
        gameState.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});
        gameState.circle1 = new Phaser.Geom.Circle(x/2,y/2, 130 * ratio);
        gameState.circle2 = new Phaser.Geom.Circle(x/2,y/2, 400 * ratio);
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.sti = this.physics.add.sprite(752,100,'sti').setDisplaySize(80 * ratio, 80 * ratio);
        gameState.cent = this.physics.add.sprite(752,100,'cent').setDisplaySize(80 * ratio, 80 * ratio);
        Phaser.Geom.Circle.CircumferencePoint(gameState.circle2, 4.7, gameState.sti);
        Phaser.Geom.Circle.CircumferencePoint(gameState.circle2, 5, gameState.cent);
        
        
        gameState.tTxt3 =  new Txt(this,x/2 + (x/256 * 22) ,y/2 ,txt9,x,y, 'h2', 31, 'center');
  
        
        gameState.sti.anims.create(
            {
                key: 'hit',
                frames: this.anims.generateFrameNumbers('sti', { start: 1, end: 1 }),
                frameRate: 1,
                repeat: -1 
            });
        gameState.sti.anims.create(
            {
                key: 'normal',
                frames: this.anims.generateFrameNumbers('sti', { start: 0, end: 0 }),
                frameRate: 1,
                repeat: -1 
                });
        gameState.sti.play('hit', true);

        gameState.cent.anims.create(
            {
              key: 'hit',
              frames: this.anims.generateFrameNumbers('cent', { start: 0, end: 0 }),
              frameRate: 1,
              repeat: -1
            });
        gameState.cent.anims.create(
            {
                key: 'normal',
                frames: this.anims.generateFrameNumbers('cent', { start: 1, end: 1 }),
                frameRate: 1,
                repeat: -1
                });

        gameState.sti.play('cent', true);

        
          bullets = this.physics.add.group(
            {
              classType: Bullet,
              maxSize: 50,
              runChildUpdate: true 
            }
            );

        gameState.ecAct = this.physics.add.collider(gameState.sti, bullets, (stimuli,bullet) => 
       {
         bullet.destroy();
         stimuli.play('hit', true);
         setTimeout(function(){ stimuli.play('normal', true) }, 100);
         dataMatrix.tiempoE.push(elapsedTime);
         dataMatrix.evento.push('rCon');
         console.log('respo Co')
         console.log(dataMatrix);
         dataMatrix.fase.push(fase)
           
         
        });

        gameState.ecAct.active = false;

        gameState.ecDeact = this.physics.add.collider(gameState.sti, bullets, (stimuli,bullet) => 
        {
            stimuli.play('hit', true);
            bullet.destroy();
            console.log(elapsedTime);
            dataMatrix.tiempoE.push(elapsedTime);
            dataMatrix.evento.push('rOr');
            console.log('respo Or')
            console.log(dataMatrix)   
            dataMatrix.fase.push(fase)
         });

         gameState.centAct = this.physics.add.collider(gameState.cent, bullets, (reinforcer,bullet) => 
         {
           bullet.destroy();
           reinforcer.play('hit', true);
           setTimeout(function(){ reinforcer.play('normal', true) }, 100);
           console.log(elapsedTime);
           dataMatrix.tiempoE.push(elapsedTime);
           dataMatrix.evento.push('rIn');
           gameState.score += 10; 
           gameState.tTxt3.txt.setText(`Puntos: ${gameState.score}`);  
           dataMatrix.puntos = gameState.score;
           console.log(dataMatrix.puntos)
           dataMatrix.fase.push(fase)

           gameState.tTxt4 =  new Txt(this, gameState.cent.x  , gameState.cent.y ,txt13,x,y, 'h2', 31, 'center');

           Phaser.Geom.Circle.CircumferencePoint(gameState.circle2, 5,  gameState.tTxt4.txt);
     
           this.tweens.add({
             targets: gameState.tTxt4.txt,
             y: gameState.tTxt4.txt.y - 100,
             ease: 'Power1',
             duration: 2000,
             delay: 500,
             yoyo: false,
             repeat: 0
         });
           
           
          });

          gameState.centAct.active = false;

          gameState.centDeact = this.physics.add.collider(gameState.cent, bullets, (reinforcer,bullet) => 
          {
            reinforcer.play('hit', true);
            bullet.destroy();
            console.log(elapsedTime);
            dataMatrix.tiempoE.push(elapsedTime);
            dataMatrix.evento.push('rSM');
            dataMatrix.fase.push(fase)
           });

         fase = "Adq"
          this.timer();
    }

    update(time,delta)
    {
        gameState.graphics.clear();
        gameState.graphics.lineStyle(2,0x48A9A6);
        gameState.graphics.strokeCircleShape(gameState.circle1);
        gameState.graphics.lineStyle(2,0xC1666B);
        gameState.graphics.strokeCircleShape(gameState.circle2);
        gameState.graphics.fillStyle(0xff00ff);
        gameState.graphics.fillRect(gameState.point.x - 8, gameState.point.y - 8, gameState.point.width, gameState.point.height);
        gameState.graphics.fillRect(gameState.point2.x - 8, gameState.point2.y - 8, gameState.point2.width, gameState.point2.height);
        Phaser.Geom.Circle.CircumferencePoint(gameState.circle1, a, gameState.player);
        Phaser.Geom.Circle.CircumferencePoint(gameState.circle2, a, gameState.point);

        //Declara a donde estará apuntanto el sujeto 
        gameState.player.setRotation(Phaser.Math.Angle.Between(gameState.point.x, gameState.point.y, gameState.player.x, gameState.player.y) - Math.PI / 2);
      if(gameState.cursors.right.isDown)
      {
        a += 0.03;
        gameState.player.angle += 0.01;
        if(a >= Phaser.Math.PI2)
        {
          a -= Phaser.Math.PI2
        };
      };
      
      if(gameState.cursors.left.isDown)
      {
        a -= 0.03;
        gameState.player.angle += 0.01;
        if(a >= Phaser.Math.PI2)
        {
          a -= Phaser.Math.PI2;
        };
      };
      
      if(Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) 
      {
        var bullet = bullets.get();
        if (bullet)
        {
          bullet.fire(gameState.point.x, gameState.point.y);
          lastFired = 50;
        };
      };
    }

    ecStart(fase)
    {
      console.log(fase);
      dataMatrix.tiempoE.push(elapsedTime);
      dataMatrix.evento.push('ECstart');
      dataMatrix.fase.push(fase)
      console.log(dataMatrix)
         
      gameState.ecDeact.active = false;
      gameState.sti.play('normal', true);
      gameState.ecAct.active = true;
  
    }

    ecEnd(fase)
    {
      gameState.ecAct.active = false;
      gameState.ecDeact.active = true;
      dataMatrix.tiempoE.push(elapsedTime);
      dataMatrix.evento.push('ECend');
      dataMatrix.fase.push(fase)
       
      console.log(Date.now() -initTime);
      gameState.sti.play('hit', true);
      

    }

    reinStart(fase)
    {
      dataMatrix.tiempoE.push(elapsedTime);
      dataMatrix.evento.push('RStart');
      dataMatrix.fase.push(fase)
        
      console.log(Date.now() - initTime)
      gameState.centDeact.active = false;
      gameState.cent.play('normal', true);
      gameState.centAct.active = true;
    }

    reinEnd(fase)
    {
      dataMatrix.tiempoE.push(elapsedTime);
      dataMatrix.evento.push('rEnd');
      dataMatrix.fase.push(fase)
      

      console.log(Date.now() -initTime);
      gameState.cent.play('hit', true);
      gameState.centAct.active = false;
      gameState.centDeact.active = true;

    }




    timer() 
    {
      
      initTime = new Date().getTime();
      expTime = new Date(initTime)
      console.log(expTime)
      
      var that = this
        

        intervol = setInterval(function () {
          for (var i = 0; i < 10000; i++) 
          {
            // YOUR CODE
            elapsedTime = new Date().getTime() -initTime;
            if(fase == "Adq")
            {
              if(par == 0)
            {
              
              index = Math.floor(Math.random() * listIti.length);
              iti = listIti[index];
              if(arreglo == 1) 
              {
                startS = iti ;
                endS = startS + stiDur;
                startR = iti + dem;
                endR = startR + reiDur;
                end = endR
                
              }
              else if(arreglo == 2)
              {
                startS = iti + dem;
                endS = startS + stiDur;
                startR = iti ;
                endR = startR + reiDur;
                end = endS
              }
              par = 1;
              
            }
            if(elapsedTime < iti)
            {
              gameState.sti.play('hit', true);
              gameState.cent.play('hit', true);
            }
            if(elapsedTime > startS-1 && limit1 == 0)
            {
              that.ecStart(fase)
              limit1 = 1;
            }
            else if(elapsedTime > endS-1 && limit1 == 1)
            {
              that.ecEnd(fase)
             
              limit1 = 2;
              
            }
            else if(elapsedTime > startR-1 && limit2 == 0)
            {
              that.reinStart(fase)
              limit2 = 1;

            }
            else if(elapsedTime > endR-1 && limit2 == 1)
            {
              that.reinEnd(fase);
              limit2 = 2;
            }
            else if(elapsedTime >= end)
            {
              limit1 = 0;
              limit2 = 0;
              initTime = new Date().getTime();
              pass++;
              par = 0
              if(pass == ensayos)
              {
               
                fase = "Test";
               
              }
            }

            } else if(fase == "Test"){
          
              index = Math.floor(Math.random() * listP.length);
              iti = listIti[index];
              if(par2 == 0)
            {
              
              index = Math.floor(Math.random() * listIti.length);
              iti = listIti[index];
              if(arreglo == 1) 
              {
                startS = iti ;
                endS = startS + stiDur;
                startR = iti + dem;
                endR = startR + reiDur;
                end = endR
                
              }
              else if(arreglo == 2)
              {
                startS = iti + dem;
                endS = startS + stiDur;
                startR = iti ;
                endR = startR + reiDur;
                end = endS
              }
              par2 = 1;
              
            }
            if(elapsedTime < iti)
            {
              gameState.sti.play('hit', true);
              gameState.cent.play('hit', true);
            }
            if(elapsedTime > startS-1 && limit1 == 0)
            {
              that.ecStart(fase)
              limit1 = 1;
            }
            else if(elapsedTime > endS-1 && limit1 == 1)
            {
              that.ecEnd(fase)
             
              limit1 = 2;
              
            }
            else if(elapsedTime > startR-1 && limit2 == 0)
            {
             
              limit2 = 1;

            }
            else if(elapsedTime > endR-1 && limit2 == 1)
            {
             
              limit2 = 2;
            }
            else if(elapsedTime >= end)
            {
              limit1 = 0;
              limit2 = 0;
              initTime = new Date().getTime();
              test++;
              par = 0
              if(test == pruebas)
              {
                
                
                toString(dataMatrix.puntos)
    
                const options = {
                  method: "POST",
                  header: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({"start_experiment":expTime.toString(), "end_experiment": new Date().toString(),"puntos": dataMatrix.puntos,"evento": dataMatrix.evento, "tiempo": dataMatrix.tiempoE, "fase": dataMatrix.fase}),
                };
            
                fetch('/experiment', options);

              
              
                
                clearInterval(intervol);
                that.scene.start('Final');
                that.scene.stop('Autoshaping');
                
                console.log(dataMatrix)
                console.log('ya estuvo');
              }
            }
            
              

            }
            
  
          
            

            
    
          }
      }, 1/1000);
       
    }


    



}



