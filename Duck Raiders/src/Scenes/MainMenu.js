export default class Duck extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenu" });
        this.ducks = [];
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("backgroundWood", "bg_wood.png");
        this.load.image("cloud1", "cloud1.png");
        this.load.image('cloud2', "cloud2.png");
        this.load.image("target", "target_colored_outline.png");
        this.load.image("curtain", "curtain.png");
        this.load.image("curtainTop", "curtain_top.png");
        this.load.image("curtainStraight", "curtain_Straight.png");
        this.load.image("Duck", "duck_outline_yellow.png");
        this.load.image("Duck1", "duck_outline_white.png");
        this.load.image("Duck2", "duck_outline_brown.png");
        this.load.image("Duck3", "duck_back.png");
        this.load.image("Duck4", "duck_brown.png");
        this.load.image("Duck5", "duck_white.png");
        this.load.image("go", "text_go.png");
        this.load.image("ready", "text_ready.png")
        this.load.image("water1", "water1.png");
        this.load.image("water2", "water2.png");
        this.load.audio("click", "switch_006.ogg");

    }

    create() {
        this.createBackground(); 

        this.add.image(65, 200, "curtain");
        this.add.image(1535, 200, "curtain").setScale(-1, 1);
           
        this.add.image(300, 150, "cloud1");
        this.add.image(1300, 150, "cloud1");
        this.add.image(500, 200, "cloud2");
        this.add.image(700, 200, "cloud2");
        this.add.image(900, 200, "cloud2");
        this.add.image(1100, 200, "cloud2");

        this.add.image(100,950, "Duck");
        this.add.image(300,950, "Duck1");
        this.add.image(500,950, "Duck2");
        this.add.image(1100,950, "Duck3");
        this.add.image(1300,950, "Duck4");
        this.add.image(1500,950, "Duck5");


        this.add.image(65, 700, "water1");
        this.add.image(197, 700, "water2");
        this.add.image(329, 700, "water2");
        this.add.image(461, 700, "water1");
        this.add.image(593, 700, "water2");
        this.add.image(725, 700, "water1");
        this.add.image(857, 700, "water1");
        this.add.image(989, 700, "water2");
        this.add.image(1121, 700, "water2");
        this.add.image(1253, 700, "water1");
        this.add.image(1385, 700, "water2");
        this.add.image(1517, 700, "water2");
        this.add.image(1649, 700, "water1");

        this.add.image(300, 400, "target");
        this.add.image(1300, 400, "target");

        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "ready");

        const playButton = this.add.image(this.sys.game.config.width / 2, 900, "go").setInteractive();
        playButton.on("pointerdown", () => {
            this.sound.play("click");
            this.scene.start('Duck');
        });

        this.add.text(this.sys.game.config.width / 2, 100, "Duck Raider", { font: "80px", fill: "#FFFF00" }).setOrigin(0.5);
    }

    createBackground() {
        const spacing = 125;
        for (let x = 0; x < this.sys.game.config.width; x += spacing) {
            for (let y = 0; y < this.sys.game.config.height; y += spacing) {
                this.add.image(x, y, "backgroundWood").setOrigin(0, 0);
            }
        }
    }

}