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





let init = 0;
let bullets;
let lastFired;
let initTime;
let expTime;
let a = 0;
let elapsedTime;
let intervol;
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
var s1 = 0;
var s2 = 0;
var s3 = 0;
var s4 = 0;
var s5 = 0;
var s6 = 0;
var ending = 0;


let pass = 0;
let pass2 = 0;

let fase;
let operants = 1;




var eventos = {
  puntos: 0,
  tiempoT:[],
  tiempoE:[],
  evento:[],
  fase:[],
  trial:[],
  iti:[]
};

var move = {
  tiempoT:[],
  tiempoE:[],
  move:[],
  operants:[],
  fase:[],
  iti:[],
  trial:[]
};

var shoot = {
  tiempoT:[],
  tiempoE:[],
  disparo:[],
  posi:[],
  fase:[],
  iti:[],
  trial:[]
};

var listIti = [69,213,369,537,721,924,1148,1402,1691,2029,2436,2947,3633,4690,7490];
var listP = [69,213,369,537,721,924,1148,1402,1691,2029,2436,2947,3633,4690,7490]
const stiDur = 3000; 
const reiDur = 3000;
//anterogrado = 1, retrogrado = 2
const arreglo = 1;
const dem = 0;
const ensayos = listIti.length;
const pruebas = listP.length;
var puntos ;
var deg;


export default class Autoshaping extends Phaser.Scene
{
    create()
    {
     

    

        gameState.player = this.physics.add.image(x/2,y/2, 'player').setDisplaySize(104 * ratio,104 * ratio);




        gameState.point = new Phaser.Geom.Rectangle(0, 0, 16, 16);
        gameState.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});
        gameState.circle1 = new Phaser.Geom.Circle(x/2,y/2, 110 * ratio);
        gameState.circle2 = new Phaser.Geom.Circle(x/2,y/2, 380 * ratio);
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.sti = this.physics.add.sprite(752,100,'sti').setDisplaySize(140 * ratio, 140 * ratio);
        gameState.cent = this.physics.add.sprite(752,100,'cent').setDisplaySize(140 * ratio, 140 * ratio);
        Phaser.Geom.Circle.CircumferencePoint(gameState.circle2, 4.7, gameState.sti);
        Phaser.Geom.Circle.CircumferencePoint(gameState.circle2, 5.5, gameState.cent);
        
        
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
              frames: this.anims.generateFrameNumbers('cent', { start: 1, end: 1 }),
              frameRate: 1,
              repeat: -1
            });
        gameState.cent.anims.create(
            {
                key: 'normal',
                frames: this.anims.generateFrameNumbers('cent', { start: 0, end: 0 }),
                frameRate: 1,
                repeat: -1
                });

        gameState.cent.play('hit', true);

        
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
         
         //Registros
         
         eventos.tiempoE.push(elapsedTime);
         eventos.evento.push('rCon');
         eventos.fase.push(fase);
         eventos.iti.push(iti);
         if(fase == "Adq"){
          eventos.trial.push(pass + 1)} 
         else if(fase == "Test"){
          eventos.trial.push(pass2 + 1)}
           
         
        });

        gameState.ecAct.active = false;

        gameState.ecDeact = this.physics.add.collider(gameState.sti, bullets, (stimuli,bullet) => 
        {
            stimuli.play('hit', true);
            bullet.destroy();

            //Registros

            eventos.tiempoE.push(elapsedTime);
            eventos.evento.push('rOr');
            eventos.fase.push(fase);
            eventos.iti.push(iti);
            if(fase == "Adq"){
              eventos.trial.push(pass + 1)} 
            else if(fase == "Test"){
              eventos.trial.push(pass2 + 1)}
         });

         gameState.centAct = this.physics.add.collider(gameState.cent, bullets, (reinforcer,bullet) => 
         {
           bullet.destroy();
           reinforcer.play('hit', true);
           setTimeout(function(){ reinforcer.play('normal', true) }, 100);
           gameState.score += 10; 
           gameState.tTxt3.txt.setText(`Puntos: ${gameState.score}`);
           gameState.tTxt4 =  new Txt(this, gameState.cent.x  , gameState.cent.y ,txt13,x,y, 'h2', 31, 'center');
           Phaser.Geom.Circle.CircumferencePoint(gameState.circle2, 5,  gameState.tTxt4.txt);
           this.tweens.add({
            targets: gameState.tTxt4.txt,
            y: gameState.tTxt4.txt.y - 1000,
            ease: 'Power1',
            duration: 2000,
            delay: 500,
            yoyo: false,
            repeat: 0,});
           setTimeout(function(){ gameState.tTxt4.txt.destroy()}, 100);
           
           
           //Registros

           eventos.puntos = gameState.score
           eventos.tiempoE.push(elapsedTime);
           eventos.evento.push('rIn');
           eventos.fase.push(fase);
           eventos.iti.push(iti);
           if(fase == "Adq"){
            eventos.trial.push(pass + 1)} 
           else if(fase == "Test"){
            eventos.trial.push(pass2 + 1)}  
          });

          gameState.centAct.active = false;

          gameState.centDeact = this.physics.add.collider(gameState.cent, bullets, (reinforcer,bullet) => 
          {
            reinforcer.play('hit', true);
            bullet.destroy();

             //Registros

           eventos.tiempoE.push(elapsedTime);
           eventos.evento.push('rSn');
           eventos.fase.push(fase);
           eventos.iti.push(iti);
           if(fase == "Adq"){
            eventos.trial.push(pass + 1)} 
           else if(fase == "Test"){
            eventos.trial.push(pass2 + 1)}
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
        deg = Phaser.Math.Angle.Normalize(a);

     

        //Declara a donde estará apuntanto el sujeto 
        gameState.player.setRotation(Phaser.Math.Angle.Between(gameState.point.x, gameState.point.y, gameState.player.x, gameState.player.y) - Math.PI / 2);
        if(gameState.cursors.right.isDown)
        {
          a += 0.05;
          gameState.player.angle += 0.01;
          if(a >= Phaser.Math.PI2)
          {
            a -= Phaser.Math.PI2
          };
          

          move.tiempoE.push(elapsedTime);
          move.move.push(deg);
          move.fase.push(fase);
          move.iti.push(iti);
          move.operants.push(operants)
          if(fase == "Adq"){
            move.trial.push(pass + 1)} 
          else if(fase == "Test"){
            move.trial.push(pass2 + 1)}
      };
      if(Phaser.Input.Keyboard.JustDown(gameState.cursors.right)){
        operants++
      }
    
      
      if(gameState.cursors.left.isDown)
      {
        a -= 0.05;
        gameState.player.angle += 0.01;
        if(a >= Phaser.Math.PI2)
        {
          a -= Phaser.Math.PI2;
        };

       

        

        move.tiempoE.push(elapsedTime);
        move.move.push(deg);
        move.fase.push(fase);
        move.iti.push(iti);
        move.operants.push(operants)
        if(fase == "Adq"){
          move.trial.push(pass + 1)} 
        else if(fase == "Test"){
          move.trial.push(pass2 + 1)}
      };
      if(Phaser.Input.Keyboard.JustDown(gameState.cursors.left)){
        operants++
      }
      
      
      if(Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) 
      {
        var bullet = bullets.get();
        if (bullet)
        {
          bullet.fire(gameState.point.x, gameState.point.y);
          lastFired = 50;
        };

        shoot.tiempoE.push(elapsedTime);
        shoot.disparo.push('Sht');
        shoot.posi.push(deg);
        shoot.iti.push(iti);
        shoot.fase.push(fase);
        if(fase == "Adq"){
          shoot.trial.push(pass + 1)} 
        else if(fase == "Test"){
          shoot.trial.push(pass2 + 1)}
      };
    }

    register(x,trial){
      console.log("recibido",x,trial)
      console.log(iti)
      eventos.tiempoE.push(elapsedTime);
      eventos.fase.push(fase);
      eventos.iti.push(iti);
      move.tiempoE.push(elapsedTime);
      move.fase.push(fase);
      move.iti.push(iti);
      move.operants.push(operants);
      shoot.tiempoE.push(elapsedTime);
      shoot.posi.push(deg);
      shoot.fase.push(fase);
      shoot.iti.push(iti);
      
      eventos.trial.push(trial + 1);
      move.trial.push(trial + 1);
      shoot.trial.push(trial  + 1);
      if(x == 1){
        eventos.evento.push('stTrial');
        console.log(eventos.evento)
        move.move.push('stTrial');
        shoot.disparo.push('stTrial');
      }
      else if(x == 2){
        eventos.evento.push('ECstart');
        move.move.push('ECstart');
        shoot.disparo.push('ECstart');
      }
      else if(x == 3){
        eventos.evento.push('ECend');
        move.move.push('ECend');
        shoot.disparo.push('ECend');
      }
      else if(x == 4){
        eventos.evento.push('Rstart');
        move.move.push('Rstart');
        shoot.disparo.push('Rstart');

      }
      else if(x == 5){
        eventos.evento.push('Rend');
        move.move.push('Rend');
        shoot.disparo.push('Rend');

      }
      

      

  
      
    } ;

    activity(x){
     
     
     
        if(x == 1){
          gameState.sti.play('hit', true);
          gameState.cent.play('hit', true);
        }
        else if(x == 2){
          gameState.ecDeact.active = false;
          gameState.sti.play('normal', true);
          gameState.ecAct.active = true;
        }
        else if(x == 3){
          gameState.ecAct.active = false;
          gameState.ecDeact.active = true;
          gameState.sti.play('hit', true);
        }
        else if(x == 4){
          gameState.centDeact.active = false;
          gameState.cent.play('normal', true);
          gameState.centAct.active = true;
  
        }
        else if(x == 5){
          gameState.cent.play('hit', true);
          gameState.centAct.active = false;
          gameState.centDeact.active = true;
  

      } 
    
  

    };
   



    timer() 
    {
      var x = 0;
      
      fase = "Adq"
      
      initTime = new Date().getTime();
      expTime = new Date(initTime)
      console.log(expTime)
      
      var that = this


        intervol = setInterval(function () {
          for (var i = 0; i < 10000; i++) {
            switch(init){
              case 0:
                  switch(fase){
                      case "Adq":
                          index = Math.floor(Math.random() * listIti.length);
                          iti = listIti[index];
                          listIti.splice(index,1)
                          switch(arreglo){
                            case 1:
                              startS = iti ;
                              endS = startS + stiDur;
                              startR = dem + endS;
                              endR = startR + reiDur;
                              end = endR
                              break
                            }
                       
                          init = 1;
                          s1 = 1;
                          s2 = 1;
                          s3 = 1;
                          s4 = 1;
                          s5 = 1;
                          s6 = 1;
                          break
                      case "Test":
                          index = Math.floor(Math.random() * listP.length);
                          iti = listP[index];
                          listP.splice(index,1)
                          switch(arreglo){
                              case 1:
                                startS = iti ;
                                endS = startS + stiDur;
                                startR = dem + endS;
                                endR = startR + reiDur;
                                end = endR
                                break
                              }
                            init = 1;
                            s1 = 1;
                            s2 = 1;
                            s3 = 1;
                            s4 = 1;
                            s5 = 1;
                            s6 = 1;   
                          break
                  }
              case 1:
                  elapsedTime = new Date().getTime() -initTime;
           
                  switch(fase){
                    case "Adq":
                      switch(true){
                        case elapsedTime < startS:
                                  x = 1;
                                  
                               
                                  if(s1 == 1){
                                    console.log(s1)
                                    that.register(x,pass)
                                    s1++
                                  }
                                  limit1 = 1
                                  break;
                              case elapsedTime > startS-1 && limit1 == 1:

                                  x = 2;
                                  console.log(s2)
                                  if(s2 == 1){
                                    that.activity(x)
                                    that.register(x,pass)
                                    s2++
                                  }
                            
                                  limit1 = 2
                                  break
                                  
                              case elapsedTime > endS-1 && limit1 == 2:
                                  x = 3;
                                  if(s3 == 1){
                                    that.activity(x)
                                    that.register(x,pass)
                                    s3++
                                  }
                                  
                                  limit1 = 3
                                  limit2 = 1
                                  break
                                  
                              case elapsedTime > startR-1 && limit2 == 1:
                      
                                  x = 4;
                                  if(s4 == 1){
                                    that.activity(x)
                                    that.register(x,pass)
                                    s4++
                                  }
                                  limit2 = 2
                                  break
                              case elapsedTime > endR-1 && limit2 == 2:
                                  x = 5;
                                  if(s5 == 1){
                                    that.activity(x)
                                    that.register(x,pass)
                                    s5++
                                  }
                            
                                  limit2 = 3
                                  limit1 = 0;
                                  limit2 = 0;
                                  initTime = new Date().getTime();
                            
                                  par = 0;
                                  pass++;
                                  console.log(pass)
                                  init = 0
                                  break}
                      switch(pass){
                                  case ensayos:
                                      fase = "Test";
                                
                                      break;}
                      break;
                    case "Test":
                      switch(true){
                        case elapsedTime < startS:
                                  x = 1;
                                  
                               
                                  if(s1 == 1){
                                  
                                    that.register(x,pass2)
                                    s1++
                                  }
                                  limit1 = 1
                                  break;
                              case elapsedTime > startS-1 && limit1 == 1:

                                  x = 2;
                           
                                  if(s2 == 1){
                                    that.activity(x)
                                    that.register(x,pass2)
                                    s2++
                                  }
                            
                                  limit1 = 2
                                  break
                                  
                              case elapsedTime > endS-1 && limit1 == 2:
                                  x = 3;
                                  if(s3 == 1){
                                    that.activity(x)
                                    that.register(x,pass2)
                                    s3++
                                  }
                                  
                                  limit1 = 3
                                  limit2 = 1
                                  break
                                  
                              case elapsedTime > startR-1 && limit2 == 1:
                      
                                  x = 4;
                                  if(s4 == 1){

                                    that.register(x,pass2)
                                    s4++
                                  }
                                  limit2 = 2
                                  break
                              case elapsedTime > endR-1 && limit2 == 2:
                                  x = 5;
                                  if(s5 == 1){
                                    that.activity(x)
                                    that.register(x,pass2)
                                    s5++

                                  }
                            
                                  limit2 = 3
                                  limit1 = 0;
                                  limit2 = 0;
                                  initTime = new Date().getTime();
                            
                                  par = 0;
                                  pass2++;
  
                                  init = 0
                                  s6 = 1
                                  

                                  break}
                      switch(pass2){
                                  case ensayos:

                                  ending = 1
                                  
                                    break;}
                                  
                     
                  }
          
                 
          
          
          }
        
         
          };
          if(ending == 1){
            console.log("mm")
            clearInterval(intervol)
            that.save()
          }


      }, 1/1000);

      
       
    }

    save(){
      toString(eventos.puntos)

            
      const options = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        "start_experiment":expTime.toString(), 
        "end_experiment": new Date().toString(),
        "puntos": eventos.puntos,
        "tiempoE":eventos.tiempoE,
        "evento": eventos.evento, 
        "fase": eventos.fase, 
        "iti": eventos.iti,
        "trial": eventos.trial,
      
        "tiempoM":move.tiempoE,
        "move":move.move,
        "operants":move.operants,
        "fasem":move.fase,
        "itim":move.iti,
        "trialm":move.trial,

        "tiempoD":shoot.tiempoE,
        "disparo":shoot.disparo,
        "position":shoot.posi,
        "faseD":shoot.fase,
        "itid":shoot.iti,
        "triald":shoot.trial








      
      }),
      };
  
      fetch('/experiment', options);


      puntos=eventos.puntos;
      console.log(eventos,move,shoot)
      console.log('ya estuvo');
      


  
      this.scene.start('Final');
      this.scene.stop('Autoshaping');
      
      


    }
    

    

    



}


export{puntos}


