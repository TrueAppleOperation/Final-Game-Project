class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
        this.my = { sprite: {}, vfx: {} };

        this.centerX = 1094;
        this.centerY = 190;
        this.beeX = 70;
        this.beeY = 350;

        this.timerDuration = 10;
        this.timeLeft = this.timerDuration;
    }

    init() {
        // variables and settings
        this.ACCELERATION = 175;
        this.DRAG = 700;
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -500;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
    }

    create() {
        this.background = this.add.image(-200, -300, "BGgame_tiles")
            .setOrigin(0, 0)
            .setDepth(-1)
            .setAlpha(0.9)
            .setScale(0.45);

        // Star
        this.starGroup = this.add.group();
        this.starTimer = this.time.addEvent({
        delay: 200,
        callback: this.spawnStar,
        callbackScope: this,
        loop: true
        });

        this.map = this.add.tilemap("platformer-level-1", 18, 18, 45, 25);
        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 100);
        this.groundLayer.setCollisionByProperty({ collides: true });

        // Player setup
        this.my.sprite.player = this.physics.add.sprite(0, 200, "iceCream");
        this.my.sprite.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.my.sprite.player, this.groundLayer);

        // Make a collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        // Coins
        this.coins = this.map.createFromObjects("Objects", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 15
        });

        this.coins.forEach(coin => {
            coin.y += 100;
        });

        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        this.coinGroup = this.add.group(this.coins);

        this.physics.add.overlap(this.my.sprite.player, this.coinGroup, (obj1, obj2) => {
            obj2.destroy();
            const sound = this.sound.add('bong');
            sound.play();
            this.timeLeft += 5; // Add 5 seconds
            this.timeTextLeft.setText(`${this.timeLeft}`);
        });

        // Level completed
        this.cones = this.map.createFromObjects("LevelCompleted", {
            name: "cone",
            key: "tilemap_sheet",
            frame: 105
        });

        this.cones.forEach(cone => {
            cone.y += 100;
        });

        this.physics.world.enable(this.cones, Phaser.Physics.Arcade.STATIC_BODY);
        this.coneGroup = this.add.group(this.cones);

        this.physics.add.collider(this.my.sprite.player, this.coneGroup, (player, cone) => {
            if (player.body.right >= cone.body.right - 1 && player.body.bottom <= cone.body.top + 1) {
                this.scene.start("platformerScene2", { timer: this.timer });
            }
        });

        // Input setup
        this.cursors = this.input.keyboard.createCursorKeys();
        this.rKey = this.input.keyboard.addKey('R');

        // Debug
        this.physics.world.drawDebug = !this.physics.world.drawDebug;
        this.physics.world.debugGraphic.clear();

        // Snowflake VFX setup
        this.my.vfx.snowflakes = [];
        this.my.vfx.activeFlakes = [];
        
        for (let i = 0; i < 20; i++) {
            this.my.vfx.snowflakes.push(
                this.add.image(0, 0, "snowflake1")
                    .setVisible(false)
                    .setDepth(10)
                    .setScale(0.1)
            );
            this.my.vfx.snowflakes.push(
                this.add.image(0, 0, "snowflake2")
                    .setVisible(false)
                    .setDepth(10)
                    .setScale(0.1)
            );
        }

        // VFX
        this.my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['circle_05.png', 'circle_05.png'],
            scale: {start: 0.027, end: 0.01},
            lifespan: 350,
            alpha: {start: 1, end: 0.1},
        });
        this.my.vfx.walking.stop();

        // Bee
        this.my.sprite.clvl1 = this.add.sprite(this.beeX+85, this.beeY-50, "Commentlvl1");
        this.my.sprite.clvl1.scale = 0.19;
        this.my.sprite.clvl1.alpha = 0.8;
        this.my.sprite.clvl1.visible = false;

        this.my.sprite.Bee = this.add.sprite(this.beeX, this.beeY, "bee");
        this.my.sprite.Bee.setScale(2);
        this.my.sprite.Bee.flipX = true;
        this.my.sprite.Bee.setInteractive();

        this.my.sprite.Bee.on('pointerdown', () => {
            this.my.sprite.Bee.setScale(1.5);
            const sound = this.sound.add('switch_002');
            sound.play();
        });

        this.my.sprite.Bee.on('pointerup', () => {
            this.my.sprite.Bee.setScale(2);
            if (this.my.beeClickState === 0 || this.my.beeClickState === 2) {
                this.my.sprite.clvl1.visible = true;
                this.my.beeClickState = 1;
            } else {
                this.my.sprite.clvl1.visible = false;
                this.my.beeClickState = 2;
            }
        });

        // Flying animation
        this.tweens.add({
            targets: this.my.sprite.Bee,
            y: this.beeY - 10,
            duration: 700, 
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        // Camera setup
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.my.sprite.player, true, 0.25, 0.25);
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

    this.timeTextLeft = this.add.text(16, 16, `${this.timeLeft}`, {
        fontSize: '24px',
        fill: '#ffffff'
    }).setScrollFactor(1);

    this.timeTextCenter = this.add.text(this.cameras.main.width / 2, 16, `${this.timeLeft}`, {
        fontSize: '24px',
        fill: '#ffffff'
    }).setScrollFactor(1).setOrigin(0.5, 0); 

    this.timeTextRight = this.add.text(this.cameras.main.width - 40, 16, `${this.timeLeft}`, {
        fontSize: '24px',
        fill: '#ffffff'
    }).setScrollFactor(1);

        this.timerEvent = this.time.addEvent({
            delay: 1000, 
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
    this.timeLeft--;
    this.timeTextLeft.setText(`${this.timeLeft}`);
    this.timeTextCenter.setText(`${this.timeLeft}`);
    this.timeTextRight.setText(`${this.timeLeft}`);
    
    if (this.timeLeft <= 0) {
        this.timerEvent.remove();
        this.scene.restart();
        this.timeLeft = this.timerDuration;
        }
    }

    update() {
        this.starGroup.getChildren().forEach(star => {
            if (star.y > this.cameras.main.worldView.y + this.cameras.main.height + 50) {
                star.destroy();
                }
        });

        // Fall detection
        if (this.my.sprite.player.y > this.map.heightInPixels + 100) {
            this.timeLeft = this.timerDuration;
        this.timeTextLeft.setText(`${this.timeLeft}`);
        this.timeTextCenter.setText(`${this.timeLeft}`);
        this.timeTextRight.setText(`${this.timeLeft}`);
        this.scene.restart();
        return;
        }

        // Movement controls
        if (this.cursors.left.isDown) {
            this.my.sprite.player.setAccelerationX(-this.ACCELERATION);
            this.my.sprite.player.resetFlip();
            this.my.sprite.player.anims.play('walk', true);
            this.my.vfx.walking.startFollow(this.my.sprite.player, 
                this.my.sprite.player.displayWidth/2+2, 
                this.my.sprite.player.displayHeight/2-3, 
                false);
            this.my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
            if (this.my.sprite.player.body.blocked.down) {
                this.my.vfx.walking.start();
            }
        } 
        else if (this.cursors.right.isDown) {
            this.my.sprite.player.setAccelerationX(this.ACCELERATION);
            this.my.sprite.player.setFlip(true, false);
            this.my.sprite.player.anims.play('walk', true);
            this.my.vfx.walking.startFollow(this.my.sprite.player, 
                this.my.sprite.player.displayWidth/2-19, 
                this.my.sprite.player.displayHeight/2-3, 
                false);
            this.my.vfx.walking.setParticleSpeed(-this.PARTICLE_VELOCITY, 0);
            if (this.my.sprite.player.body.blocked.down) {
                this.my.vfx.walking.start();
            }
        } 
        else {
            this.my.sprite.player.setAccelerationX(0);
            this.my.sprite.player.setDragX(this.DRAG);
            this.my.sprite.player.anims.play('idle');
            this.my.vfx.walking.stop();
        }

        this.updateSnowflakes();

        // Jumping
        if (!this.my.sprite.player.body.blocked.down) {
            this.my.sprite.player.anims.play('jump');
            this.spawnSnowflake();
        }

        if (this.my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            const sound = this.sound.add('drop');
            sound.play();
        }

        // Manual restart
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.resetTimer();
            this.scene.restart();
        }
    }

    spawnStar() {
    const star = this.add.image(
        Phaser.Math.Between(this.cameras.main.worldView.x, this.cameras.main.worldView.x + this.cameras.main.width),
        this.cameras.main.worldView.y - 20,
        "star"
    );
    
    // Star properties
    star.setDepth(0);
    star.setScale(Phaser.Math.FloatBetween(0.001, 0.03));
    star.alpha = Phaser.Math.FloatBetween(1, 1);

    this.physics.world.enable(star);
    star.body.setVelocity(
        Phaser.Math.Between(-20, 20),
        Phaser.Math.Between(50, 100) 
    );

    this.tweens.add({
        targets: star,
        angle: Phaser.Math.Between(-180, 180),
        duration: Phaser.Math.Between(2000, 4000),
        ease: 'Linear'
    });
    
    // Fade out and destroy
    this.tweens.add({
        targets: star,
        alpha: 0,
        duration: 2000,
        onComplete: () => {
            star.destroy();
        }
    });
    
    this.starGroup.add(star);
}

    spawnSnowflake() {
        const flake = this.my.vfx.snowflakes.find(f => !f.visible);
        if (!flake) return;

        flake.setVisible(true);
        flake.setPosition(
            this.my.sprite.player.x + Phaser.Math.Between(-15, 15),
            this.my.sprite.player.y + this.my.sprite.player.displayHeight/2 + 5
        );
        flake.alpha = 1;
        flake.rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);
        
        flake.vx = Phaser.Math.FloatBetween(-0.5, 0.8); 
        flake.vy = Phaser.Math.FloatBetween(1, 3); 
        flake.rotationSpeed = Phaser.Math.FloatBetween(-0.04, 0.04);

        this.my.vfx.activeFlakes.push(flake);
    }

    updateSnowflakes() { 
        for (let i = this.my.vfx.activeFlakes.length - 1; i >= 0; i--) {
            const flake = this.my.vfx.activeFlakes[i];
            flake.x += flake.vx;
            flake.y += flake.vy; 
            flake.rotation += flake.rotationSpeed;
            flake.alpha -= 0.01;
            
            if (flake.alpha <= 0 || flake.y > this.cameras.main.worldView.y + this.cameras.main.height + 50) {
                flake.setVisible(false);
                this.my.vfx.activeFlakes.splice(i, 1);
            }
        }
    }
}