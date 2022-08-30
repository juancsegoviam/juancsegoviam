import Phaser from "phaser";

export default class ProgressBar extends Phaser.GameObjects.Container 
{
    constructor(scene, x, y ) 
    {
        super(scene, x, y)
        scene.load.on('progress', function (value) {
            console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
        });

        scene.load.on('fileprogress', function (file) {
            console.log(file.src);
        });

        scene.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            
        });
        
        var progressBar = scene.add.graphics();
        var progressBox = scene.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect((x/2)-150, (y/2) - 10 , 320, 50);

        scene.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect((x/2)-140, (y/2) , 300 * value, 30);
        });

       
        var loadingText = scene.make.text({
            x: x / 2 + 20,
            y: y / 2 - 50,
            text: 'Cargando..',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }});
            loadingText.setOrigin(0.5, 0.5);

            var percentText = scene.make.text({
                x: x / 2 + 10 ,
                y: y / 2 + 15,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
    }

   

}