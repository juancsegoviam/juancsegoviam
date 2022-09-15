import Phaser from "phaser";

export default class CustomButton extends Phaser.GameObjects
{
  
    constructor(scene , x, y , normalTexture, overTexture, clickTexture , text, next )
    {
        super(scene, x, y)


        this.upImage = scene.add.image(0,0, normalTexture);
        this.overImage = scene.add.image(0,0, overTexture);
        this.clickImage = scene.add.image(0,0, clickTexture);
        this.text = scene.add.text(0,0, text ,{ font: "32px monospace", fill: '#ffffff' }).setOrigin(0.5)

        this.add(this.upImage);
        this.add(this.overImage);
        this.add(this.clickImage);
        this.add(this.text)

        this.overImage.setVisible(false)
        this.clickImage.setVisible(false)

        this.setSize(this.upImage.width, this.upImage.height);

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.upImage.setVisible(false);
                this.overImage.setVisible(true);
                this.clickImage.setVisible(false)

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.upImage.setVisible(true);
                this.overImage.setVisible(false);
                this.clickImage.setVisible(false)

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.upImage.setVisible(false);
                this.overImage.setVisible(false);
                this.clickImage.setVisible(true);
               
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.upImage.setVisible(false);
                this.overImage.setVisible(true);
                this.clickImage.setVisible(false);
                this.scene.scene.stop(this.scene);
                 
                this.scene.scene.start(next);
                

                

            })
    }

}