export default class tutorialBar extends Phaser.GameObjects.Container 
{
    constructor(scene,x,y,value)
    {
        super(scene,x,y)
        
       this.bar = scene.add.image(x,y,'tbar')

       this.value = value;
    
    }
 
    setPercent(percent)
    {

        percent = percent/this.value;
        this.bar.displayWidth  = 200*percent;
    }

}