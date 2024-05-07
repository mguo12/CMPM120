export default class Duck extends Phaser.Scene {
    constructor() {
        super({ key: "Duck" });
        this.duckSprite = null;
        this.bullets = null;
        this.enemyDucks = null;
        this.score = 0;
        this.scoreText = null;
        this.graphics = null;
        this.curves = [];
        this.points = [];
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("playerDuck", "duck_outline_yellow.png");
        this.load.image("enemyDuck1", "duck_outline_white.png");
        this.load.image("enemyDuck2", "duck_outline_brown.png");
        this.load.image("enemyDuck3", "duck_back.png");
        this.load.image("enemyDuck4", "duck_brown.png");
        this.load.image("enemyDuck5", "duck_white.png");
        this.load.image("backgroundBlue", "bg_blue.png");
        this.load.image("playerBullet", "icon_bullet_gold_short.png");
        this.load.image("enemyDuckBullet1", "shot_blue_small.png");
        this.load.image("enemyDuckBullet2", "shot_grey_small.png");
        this.load.image("enemyDuckBullet3", "shot_yellow_small.png");
        this.load.image("enemyDuckBullet4", "shot_brown_small.png");
        this.load.image("enemyDuckBullet5", "shot_yellow_large.png");
        this.load.image("playerHeart", "icon_duck.png");
        this.load.image("gameover", "text_gameover.png");
        this.load.image("go", "text_go.png");
        this.load.image("ready", "text_ready.png")

        this.load.audio("shotSound", "back_004.ogg");
        this.load.audio("hitSound", "confirmation_004.ogg");
        this.load.audio("getHitSound", "minimize_007.ogg");
        this.load.audio("gameoverSound", "toggle_003.ogg");
    }

    create() {
        
        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xffffff } });
        // create background
        this.createBackground();    
        
        // create bullet
        this.createBullets();

        // create enemy
        this.createEnemies();

        // create player duck
        this.createPlayer();

        // reset scores
        this.scoreText = this.add.text(this.sys.game.config.width - 16, 16, "Score: 0", { fontSize: "32px", fill: "#fff" }).setOrigin(1, 0);

        // create enemy bullet
        this.createEnemyBullets();           

        this.playerLives = 3;
        this.livesIcons = [];

        // create player heart
        for (let i = 0; i < this.playerLives; i++) {
            let x = this.sys.game.config.width - 40 * (i + 1);
            let heart = this.add.image(x, 50, "playerHeart").setScale(0.5).setOrigin(0.5);
            this.livesIcons.push(heart);
        }

        // enemy movement
        this.points = [
            100, 100,
            200, 200,
            300, 300,
            400, 400,
            500, 100,
            600, 200,
            700, 300,
            900, 400,
            1100, 200,
            1250, 175,
            1375, 300
        ];
        let spline = new Phaser.Curves.Spline(this.points);
        this.curves.push(spline);

        // player collision detection
        this.physics.add.collider(this.bullets, this.enemyDucks, this.hitEnemy, null, this);

        // enemy collision detection
        this.physics.add.collider(this.duckSprite, this.enemyBullets, this.hitPlayer, null, this);
        
        // reset game
        this.init_game();
        
    }

    init_game() {
        this.score = 0;
        this.scoreText.setText("Score: 0");
    
        this.playerLives = 3;
        this.livesIcons.forEach((icon, index) => {
            icon.setVisible(index < this.playerLives);
        });
    
        this.enemyDucks.clear(true, true);
    
        this.duckSprite.setPosition(800, 950);
        this.duckSprite.setActive(true).setVisible(true);
    
        this.bullets.clear(true, true);
        this.enemyBullets.clear(true, true);
    
        if (this.enemySpawnEvent) {
            this.enemySpawnEvent.remove(false);
        }
    
        this.enemySpawnEvent = this.time.addEvent({
            delay: 2000,
            callback: () => this.spawnEnemy(this.curves[0]),
            callbackScope: this,
            loop: true
        });
    
        this.graphics.clear();
        this.curves.forEach(curve => curve.draw(this.graphics, 64));
    }
    
    
    createBackground() {
        const spacing = 125;
        const numColumns = Math.ceil(this.sys.game.config.width / spacing);
        const numRows = Math.ceil(this.sys.game.config.height / spacing);
        for (let x = 0; x < numColumns; x++) {
            for (let y = 0; y < numRows; y++) {
                this.add.image(x * spacing, y * spacing, "backgroundBlue").setOrigin(0, 0);
            }
        }
    }

    createPlayer() {
        this.duckSprite = this.physics.add.sprite(800, 950, "playerDuck");
        this.duckSprite.setCollideWorldBounds(true);
    
        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,

        });
        this.input.keyboard.on("keydown-SPACE", () => {
            if (this.duckSprite.active) {
                this.shootBullet(this.duckSprite.x, this.duckSprite.y - 20);
                this.sound.play("shotSound");
            }
        });
    }

    createBullets() {
        this.bullets = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            maxSize: 999,
            runChildUpdate: true
        });
    }

    createEnemyBullets() {
        this.enemyBullets = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            maxSize: 30
        });
    }

    hitEnemy(bullet, enemy) {
        if (enemy.data && enemy.data.get('score') !== undefined) {
            this.score += enemy.data.get('score');
            this.scoreText.setText(`Score: ${this.score}`);
        }
    
        bullet.disableBody(true, true);
        bullet.destroy();
        enemy.disableBody(true, true);
        enemy.destroy();
        this.sound.play("hitSound");
    }


    hitPlayer(player, bullet) {
        bullet.disableBody(true, true);
        bullet.destroy();
    
        this.playerLives--;
        if (this.playerLives > 0) {
            this.livesIcons[this.playerLives].setVisible(false);
            this.sound.play("getHitSound");
        } else {
            player.setActive(false).setVisible(false);
            this.showGameOverScreen();
            this.sound.play("gameoverSound");
        }
    }
    showGameOverScreen() {
        this.physics.pause();
        const gameOverImage = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "gameover")

        const gameOverText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "\n \n \n \nClick to Restart", {
            fontFamily: "Monaco, Courier, monospace",
            fontSize: "40px",
            fill: "#d8d8d8"
        }).setOrigin(0.5).setInteractive();
    
        gameOverText.on("pointerdown", () => {
            gameOverText.destroy(); 
            gameOverImage.destroy();
            this.init_game();
        });
    }

    showVictoryScreen() {
        this.physics.pause();
        this.bullets.clear(true, true);
        this.enemyBullets.clear(true, true);
    
        const victoryText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "You Win!", {
            fontFamily: "Monaco, Courier, monospace",
            fontSize: "48px",
            fill: "#00ff00"
        }).setOrigin(0.5);
    
        victoryText.setInteractive();
        victoryText.on("pointerdown", () => {
            this.scene.start("MainMenu");
        });
    }

    createEnemies() {
        this.enemyDucks = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            maxSize: 10,
            runChildUpdate: true
        });
    
        this.time.addEvent({
            delay: 20000,
            callback: () => this.spawnEnemy(this.curves[0]),
            callbackScope: this,
            loop: true
        });
    
        this.enemyDucks.children.iterate((enemy) => {
            enemy.setCollideWorldBounds(true);
        });
    }

    spawnEnemy(curve) {
        const x = Phaser.Math.Between(0, this.sys.game.config.width);
        const duckType = Phaser.Math.Between(1, 5); 
        const type = `enemyDuck${duckType}`;
        const enemy = this.enemyDucks.create(x, 0, type);
        enemy.path = curve;
        enemy.pathT = 0;
        enemy.pathSpeed = 0.0005;
        enemy.pathVector = new Phaser.Math.Vector2();
    
        const scores = [10, 20, 30, 40, 50]; 
        const bulletTypes = ["enemyDuckBullet1", "enemyDuckBullet2", "enemyDuckBullet3", "enemyDuckBullet4", "enemyDuckBullet5"];
        enemy.setData("score", scores[duckType - 1]);
        enemy.setData("bulletType", bulletTypes[duckType - 1]);
    
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                if (enemy.active) {
                    this.shootEnemyBullet(enemy);
                }
            },
            loop: true
        });
    }

    shootEnemyBullet(enemy) {
        const bulletType = enemy.data.get("bulletType");
        let bullet = this.enemyBullets.get(enemy.x, enemy.y, bulletType);
        if (bullet) {
            bullet.setActive(true).setVisible(true);
            bullet.setVelocityY(300);
        }
    }

    shootBullet(x, y) {
        let bullet = this.bullets.get(x, y, "playerBullet");
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setVelocityY(-300);
            bullet.setAngle(270);
        }
    }

update() {
    this.enemyDucks.children.iterate((enemy) => {
        if (enemy.pathT !== undefined) {
            enemy.pathT += enemy.pathSpeed;
            if (enemy.pathT > 1) {
                enemy.pathT = 0;
            }
            enemy.path.getPoint(enemy.pathT, enemy.pathVector);
            enemy.setPosition(enemy.pathVector.x, enemy.pathVector.y);
        }
    });

    this.duckSprite.setX(Phaser.Math.Clamp(this.duckSprite.x, 0, this.sys.game.config.width));
    this.duckSprite.setY(Phaser.Math.Clamp(this.duckSprite.y, 0, this.sys.game.config.height));

    this.enemyDucks.children.iterate((enemy) => {
        if (enemy.active) {
            enemy.setX(Phaser.Math.Clamp(enemy.x, 0, this.sys.game.config.width));
            enemy.setY(Phaser.Math.Clamp(enemy.y, 0, this.sys.game.config.height));
        }
    });

    this.graphics.clear();
    this.curves.forEach(curve => curve.draw(this.graphics, 64));

    if (this.keys.left.isDown) {
        this.duckSprite.x -= 5;
    } 
    if (this.keys.right.isDown) {
        this.duckSprite.x += 5;
    }
}
}

