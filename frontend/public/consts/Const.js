const gameState = {
    score: 0
    
};


const tutorial = {
    score: 0
};

const world = {}



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




        

export {
    gameState,
    world,
    Bullet,


    tutorial
    
}

