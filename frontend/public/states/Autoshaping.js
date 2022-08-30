import { gameState, world } from "../consts/Const";
import {txt9 } from "../consts/txt";

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
var limit1 = 0;
var limit2 = 0;
var end = 0;

let pass = 0;

var dataMatrix = {
  puntos:{},
  tiempo:[],
  evento:[],
};

const listIti = [10000];
const stiDur = 3000; 
const reiDur = 3000;
//anterogrado = 1, retrogrado = 2
const arreglo = 1;
const dem = 3000;
const ensayos = listIti.length

export default class Autoshaping extends Phaser.Scene
{
    create()
    {
        initTime = new Date().getTime();
        trialTime = new Date().getTime();
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
        gameState.tTxt3 =  new Txt(this, x/2 + (x/256 * 22) ,y/2 ,txt9,x,y, 'h2', 31, 'center');
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

        var Bullet = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            
            initialize:
            //aquí las funciones declaran en que lugar va estar y que velocidad va ser disparada 
            function Bullet (scene)
            {
              Phaser.GameObjects.Image.call(this, scene, gameState.player.x, gameState.player.y, 'bullet');
              this.setScale(0.2)
              this.incX = 0;
              this.incY = 0;
              this.lifespan = 0;
              this.speed = Phaser.Math.GetSpeed(600, 1);
            },
            // aquí declara si está visible el disparo y sí está activo
            fire: function (x, y)
            {
              this.setActive(true);
              this.setVisible(true);
              this.rotation = gameState.player.rotation;
              
              //  los disparos estarán en función de la posición del jugador 
              this.setPosition(gameState.player.x, gameState.player.y);
              
              // El angulo de disparo será entre x y la x del jugador (trayectora)
              var angle = Phaser.Math.Angle.Between(x, y, gameState.player.x, gameState.player.y);
              this.incX = Math.cos(angle);
              this.incY = Math.sin(angle);
              
              //Esta parte del codigo es solo cuando se quiera que el disparo sea contino (contante con el input) y no discreto
              this.lifespan = 500;
              },
              
            update: function (time, delta)
            {
              this.lifespan -= delta;
              this.x -= this.incX * (this.speed * delta);
              this.y -= this.incY * (this.speed * delta);
              
              if (this.lifespan <=  0)
              {
                this.setActive(false);
                this.setVisible(false);
              }
            }
            });
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
         dataMatrix.tiempo.push(elapsedTime);
         dataMatrix.evento.push('rCon');
         console.log('respo Co')
         console.log(dataMatrix);
           
         
        });

        gameState.ecAct.active = false;

        gameState.ecDeact = this.physics.add.collider(gameState.sti, bullets, (stimuli,bullet) => 
        {
            stimuli.play('hit', true);
            bullet.destroy();
            console.log(elapsedTime);
            dataMatrix.tiempo.push(elapsedTime);
            dataMatrix.evento.push('rOr');
            console.log('respo Or')
            console.log(dataMatrix)   
         });

         gameState.centAct = this.physics.add.collider(gameState.cent, bullets, (reinforcer,bullet) => 
         {
           bullet.destroy();
           reinforcer.play('hit', true);
           setTimeout(function(){ reinforcer.play('normal', true) }, 100);
           console.log(elapsedTime);
           dataMatrix.tiempo.push(elapsedTime);
           dataMatrix.evento.push('rIn');
           gameState.score += 10; 
           gameState.tTxt3.txt.setText(`Puntos: ${gameState.score}`);  
           dataMatrix.puntos = gameState.score;
           console.log(gameState.score)
           
           
          });

          gameState.centAct.active = false;

          gameState.centDeact = this.physics.add.collider(gameState.cent, bullets, (reinforcer,bullet) => 
          {
            reinforcer.play('hit', true);
            bullet.destroy();
            console.log(elapsedTime);
            dataMatrix.tiempo.push(elapsedTime);
            dataMatrix.evento.push('rSM');
           });

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
        Phaser.Geom.Circle.CircumferencePoint(gameState.circle1, a, gameState.player);
        Phaser.Geom.Circle.CircumferencePoint(gameState.circle2, a, gameState.point);

        //Declara a donde estará apuntanto el sujeto 
        gameState.player.setRotation(Phaser.Math.Angle.Between(gameState.point.x, gameState.point.y, gameState.player.x, gameState.player.y) - Math.PI / 2);
      if(gameState.cursors.left.isDown)
      {
        a += 0.1;
        gameState.player.angle += 0.01;
        if(a >= Phaser.Math.PI2)
        {
          a -= Phaser.Math.PI2
        };
      };
      
      if(gameState.cursors.right.isDown)
      {
        a -= 0.1;
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

    ecStart()
    {
      console.log("hola mundo");
      dataMatrix.tiempo.push(elapsedTime);
      dataMatrix.evento.push('ECstart');
      console.log(dataMatrix)
         
      gameState.ecDeact.active = false;
      gameState.sti.play('normal', true);
      gameState.ecAct.active = true;
    }

    ecEnd()
    {
      gameState.ecAct.active = false;
      gameState.ecDeact.active = true;
      dataMatrix.tiempo.push(elapsedTime);
      dataMatrix.evento.push('ECend');
       
      console.log(Date.now() -initTime);
      gameState.sti.play('hit', true);
      

    }

    reinStart()
    {
      dataMatrix.tiempo.push(elapsedTime);
      dataMatrix.evento.push('RStart');
        
      console.log(Date.now() - initTime)
      gameState.centDeact.active = false;
      gameState.cent.play('normal', true);
      gameState.centAct.active = true;
    }

    reinEnd()
    {
      dataMatrix.tiempo.push(elapsedTime);
      dataMatrix.evento.push('rEnd');
      console.log(Date.now() -initTime);
      gameState.cent.play('hit', true);
      gameState.centAct.active = false;
      gameState.centDeact.active = true;

    }




    timer() 
    {
      initTime = new Date().getTime();
      console.log(initTime)
        var that = this
        

        intervol = setInterval(function () {
          for (var i = 0; i < 10000; i++) 
          {
            // YOUR CODE
            elapsedTime = new Date().getTime() -initTime;
  
          
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
            if(elapsedTime <iti)
            {
              gameState.sti.play('hit', true);
              gameState.cent.play('hit', true);
            }
            if(elapsedTime > startS-1 && limit1 == 0)
            {
              that.ecStart()
              limit1 = 1;
            }
            else if(elapsedTime > endS-1 && limit1 == 1)
            {
              that.ecEnd()
             
              limit1 = 2;
              
            }
            else if(elapsedTime > startR-1 && limit2 == 0)
            {
              that.reinStart()
              limit2 = 1;

            }
            else if(elapsedTime > endR-1 && limit2 == 1)
            {
              that.reinEnd();
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
                that.scene.stop('Experimento');
                toString(dataMatrix.puntos)
    
                const options = {
                  method: "POST",
                  header: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({"start_experiment":initTime, "end_experiment": new Date().getTime(),"puntos": dataMatrix.puntos,"evento": dataMatrix.evento, "tiempo": dataMatrix.tiempo}),
                };

                fetch('/experiment', options);
                
                clearInterval(intervol);
                
                console.log(dataMatrix)
                console.log('ya estuvo');
              }
            }

            
    
          }
      }, 1/1000);
       
    }


}



