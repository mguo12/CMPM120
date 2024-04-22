class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");

        this.load.image("greenArm", "arm_greenB.png");
        this.load.image("redEar", "detail_red_ear.png");
        this.load.image("yellowEye", "eye_yellow.png");
        this.load.image("mouthHappy", "mouth_closed_happy.png");
        this.load.image("mouthFangs", "mouth_closed_fangs.png");
        this.load.image("redNose", "nose_red.png");
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        // set arm
        my.sprite.leftArm = this.add.sprite(this.bodyX - 70, this.bodyY + 90, "greenArm");
        my.sprite.leftArm.flipX = true; 
        my.sprite.rightArm = this.add.sprite(this.bodyX + 50, this.bodyY + 90, "greenArm");
        // set ears
        my.sprite.leftEar = this.add.sprite(this.bodyX - 70, this.bodyY - 90, "redEar");
        my.sprite.leftEar.flipX = true; 
        my.sprite.rightEar = this.add.sprite(this.bodyX + 50, this.bodyY - 90, "redEar");

        // set eyes
        my.sprite.eyes = this.add.sprite(this.bodyX - 20, this.bodyY - 30, "yellowEye");

        //set mouth
        my.sprite.mouthHappy = this.add.sprite(this.bodyX, this.bodyY + 50, "mouthHappy");
        my.sprite.mouthFangs = this.add.sprite(this.bodyX, this.bodyY + 50, "mouthFangs");
        
        my.sprite.mouthFangs.visible = false;


        //switch mouth happy or fangs
    
        this.input.keyboard.on('keydown-S', () => {
            my.sprite.mouthHappy.visible = true;
            my.sprite.mouthFangs.visible = false;
        });

        this.input.keyboard.on('keydown-F', () => {
            my.sprite.mouthHappy.visible = false;
            my.sprite.mouthFangs.visible = true;
        });
    }

        

    update() {
        let my = this.my;    // create an alias to this.my for readability
        if (this.input.keyboard.addKey('A').isDown) {
            Object.values(my.sprite).forEach(sprite => {
                if (sprite.x) {
                    sprite.x -= 2;
                    
                }
            });
        }

        if (this.input.keyboard.addKey('D').isDown) {
            Object.values(my.sprite).forEach(sprite => {
                if (sprite.x) {
                    sprite.x += 2;
                }
            });
        }
    }

}