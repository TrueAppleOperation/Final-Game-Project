class MenuScreen extends Phaser.Scene {
    constructor() {
        super("mainMenu");
        this.my = {sprite: {}};

        this.backgroundX = 720;
        this.backgroundY = 450;

        this.titleX = 1000;
        this.titleY = 350;

        this.frameX = 750;
        this.frameY = 500;
    }

preload() {
        this.load.setPath("./assets/");

        // Menu Screen
        this.load.image("backgroundMenu","Background.png");
        this.load.image("titleMenu","GameName.png");   
        this.load.image("startButton","START.png");  
        this.load.image("creditsButton","CREDITS.png");
        this.load.image("lvlButton","Level.png");
        this.load.image("tip","tip.png");
        this.load.image("CreditsPage","creditsPage.png");
        this.load.image("Exit2","Exit2.png");

        // Comments
        this.load.image("comment1", "Comment 1.png");
        this.load.image("comment2", "Comment 2.png");
        this.load.image("comment3", "Comment 3.png");
        this.load.image("arrow", "Arrow.png");
        this.load.image("clickMe","ClickMe.png");
        
        // Level Choice Selection
        this.load.image("Frame","ChoiceFrame.png");
        this.load.image("Exit","Exit.png");
        this.load.image("Lvl1", "LevelOneWord.png");
        this.load.image("Lvl2", "LevelTwoWord.png");
        this.load.image("Lvl3", "LevelThreeWord.png");
        this.load.image("Pro", "ProLevelWord.png");

        // Sound
        this.load.audio("switch_002", "switch_002.ogg"); 
        this.load.audio("BackgroundMusic", "MenuMusic.mp3");
        this.load.audio("bong", "bong_001.ogg");
    }

create (){
    let my = this.my;

    this.sound.play('BackgroundMusic', { loop: true });

    my.sprite.background = this.add.sprite(this.backgroundX, this.backgroundY, "backgroundMenu");
        my.sprite.background.scale = 0.4;
    my.sprite.title = this.add.sprite(this.titleX, this.titleY, "titleMenu");
        my.sprite.title.scale = 0.2;
    my.sprite.startB = this.add.sprite(this.titleX+22.5, this.titleY+125, "startButton");
        my.sprite.startB.scale = 0.05;
    my.sprite.lvlB= this.add.sprite(this.titleX+20, this.titleY+190, "lvlButton");
        my.sprite.lvlB.scale = 0.078;
    my.sprite.creditsB= this.add.sprite(this.titleX+23, this.titleY+250, "creditsButton");
        my.sprite.creditsB.scale = 0.051;
    my.sprite.tip = this.add.sprite(this.titleX+22.5, this.titleY+300, "tip");
        my.sprite.tip.scale = 0.25;
    
    // Choice Frame
    my.sprite.dark = this.add.sprite(this.backgroundX, this.backgroundY, "DarkBackdrop");
        my.sprite.dark.visible = false;
    my.sprite.frame = this.add.sprite(this.frameX, this.frameY, "Frame");
        my.sprite.frame.scale = 0.45;
        my.sprite.frame.visible = false;
    my.sprite.exit = this.add.sprite(this.frameX+220, this.frameY-200, "Exit");
        my.sprite.exit.scale = 0.05;
        my.sprite.exit.visible = false;
    my.sprite.lvl1 = this.add.sprite(this.frameX, this.frameY-100, "Lvl1");
        my.sprite.lvl1.scale = 0.25;
        my.sprite.lvl1.visible = false;
    my.sprite.lvl2 = this.add.sprite(this.frameX+3, this.frameY-25, "Lvl2");
        my.sprite.lvl2.scale = 0.1193;
        my.sprite.lvl2.visible = false;
    my.sprite.lvl3 = this.add.sprite(this.frameX+3, this.frameY+45, "Lvl3");
        my.sprite.lvl3.scale = 0.1279;
        my.sprite.lvl3.visible = false;
    my.sprite.Prolvl = this.add.sprite(this.frameX+8, this.frameY+115, "Pro");
        my.sprite.Prolvl.scale = 0.105;
        my.sprite.Prolvl.visible = false;
    
    // Comments
    my.sprite.c1 = this.add.sprite(this.titleX+200, this.titleY+393, "comment1");
        my.sprite.c1.scale = 0.32;
        my.sprite.c1.alpha = 0.8;
        my.sprite.c1.visible = false;
    my.sprite.c2 = this.add.sprite(this.titleX+200, this.titleY+399, "comment2");
        my.sprite.c2.scale = 0.32;
        my.sprite.c2.alpha = 0.8;
        my.sprite.c2.visible = false;
    my.sprite.c3 = this.add.sprite(this.titleX+200, this.titleY+400, "comment3");
        my.sprite.c3.scale = 0.32;
        my.sprite.c3.alpha = 0.8;
        my.sprite.c3.visible = false;
    my.sprite.Arrow = this.add.sprite(this.titleX+201, this.titleY+400, "arrow");
        my.sprite.Arrow.scale = 0.32;
        my.sprite.Arrow.alpha = 0.8;
        my.sprite.Arrow.visible = false;
    my.sprite.Bee = this.add.sprite(this.titleX+120, this.titleY+490, "bee");
        my.sprite.Bee.scale = 11;
        my.sprite.Bee.flipX = true;
    my.sprite.ClickMe = this.add.sprite(this.titleX+270, this.titleY+500, "clickMe");
        my.sprite.ClickMe.scale = 0.15;

    // Credits
    my.sprite.creditPage = this.add.sprite(this.frameX, this.frameY-35, "CreditsPage");
        my.sprite.creditPage.scale = 0.9;
        my.sprite.creditPage.visible = false;   
    my.sprite.exit2 = this.add.sprite(this.frameX+225, this.frameY-250, "Exit2");
        my.sprite.exit2.scale = 0.04;
        my.sprite.exit2.visible = false;

    // Button Functions
    my.sprite.startB.setInteractive({ useHandCursor: true });
    my.sprite.creditsB.setInteractive({ useHandCursor: true });
    my.sprite.lvlB.setInteractive({ useHandCursor: true });
    my.sprite.exit.setInteractive({ useHandCursor: true });
    my.sprite.exit2.setInteractive({ useHandCursor: true });
    my.sprite.Bee.setInteractive({ useHandCursor: true });

    // Levels
    my.sprite.lvl1.setInteractive({ useHandCursor: true });
    my.sprite.lvl2.setInteractive({ useHandCursor: true });
    my.sprite.lvl3.setInteractive({ useHandCursor: true });
    my.sprite.Prolvl.setInteractive({ useHandCursor: true });

    my.sprite.startB.on('pointerover', () => {
    my.sprite.startB.setScale(0.07); // Slightly enlarge on hover
});

    my.sprite.startB.on('pointerout', () => {
    my.sprite.startB.setScale(0.05);
});

    my.sprite.lvlB.on('pointerover', () => {
    my.sprite.lvlB.setScale(0.11); // Slightly enlarge on hover
});

    my.sprite.lvlB.on('pointerout', () => {
    my.sprite.lvlB.setScale(0.078);
});

    my.sprite.creditsB.on('pointerover', () => {
    my.sprite.creditsB.setScale(0.08); // Slightly enlarge on hover
});

    my.sprite.creditsB.on('pointerout', () => {
    my.sprite.creditsB.setScale(0.06);
});

    my.sprite.exit.on('pointerover', () => {
    my.sprite.exit.setScale(0.07); // Slightly enlarge on hover
});

    my.sprite.exit.on('pointerout', () => {
    my.sprite.exit.setScale(0.05);
});

    my.sprite.exit2.on('pointerover', () => {
    my.sprite.exit2.setScale(0.07); // Slightly enlarge on hover
});

    my.sprite.exit2.on('pointerout', () => {
    my.sprite.exit2.setScale(0.05);
});

    my.sprite.lvl1.on('pointerover', () => {
    my.sprite.lvl1.setScale(0.35); // Slightly enlarge on hover
});

    my.sprite.lvl1.on('pointerout', () => {
    my.sprite.lvl1.setScale(0.25);
});

    my.sprite.lvl2.on('pointerover', () => {
    my.sprite.lvl2.setScale(0.175); // Slightly enlarge on hover
});

    my.sprite.lvl2.on('pointerout', () => {
    my.sprite.lvl2.setScale(0.1193);
});

    my.sprite.lvl3.on('pointerover', () => {
    my.sprite.lvl3.setScale(0.185); // Slightly enlarge on hover
});

    my.sprite.lvl3.on('pointerout', () => {
    my.sprite.lvl3.setScale(0.1279);
});

    my.sprite.Prolvl.on('pointerover', () => {
    my.sprite.Prolvl.setScale(0.19); // Slightly enlarge on hover
});

    my.sprite.Prolvl.on('pointerout', () => {
    my.sprite.Prolvl.setScale(0.105);
});

//Press down
    my.sprite.startB.on('pointerdown', () => {
    my.sprite.startB.setScale(0.03);
            const sound = this.sound.add('switch_002');
            sound.play();
});
    my.sprite.startB.on('pointerup', () => {
    my.sprite.startB.setScale(0.05);
    this.scene.start("platformerScene"); // Switch to game scene
});

    my.sprite.lvlB.on('pointerdown', () => {
    my.sprite.lvlB.setScale(0.04);
        const sound = this.sound.add('switch_002');
        sound.play();
});
    my.sprite.lvlB.on('pointerup', () => {
    my.sprite.lvlB.setScale(0.06);
    my.sprite.dark.visible = true;
    my.sprite.frame.visible = true;
    my.sprite.exit.visible = true;
    my.sprite.lvl1.visible = true;
    my.sprite.lvl2.visible = true;
    my.sprite.lvl3.visible = true;
    my.sprite.Prolvl.visible = true;
});

    my.sprite.creditsB.on('pointerdown', () => {
    my.sprite.creditsB.setScale(0.04);
        const sound = this.sound.add('switch_002');
        sound.play();
});
    my.sprite.creditsB.on('pointerup', () => {
    my.sprite.creditsB.setScale(0.06);
    my.sprite.dark.visible = true;
    my.sprite.creditPage.visible = true;
    my.sprite.exit2.visible = true;
});

    my.sprite.exit2.on('pointerdown', () => {
    my.sprite.exit2.setScale(0.04);
        const sound = this.sound.add('switch_002');
        sound.play();
});
    my.sprite.exit2.on('pointerup', () => {
    my.sprite.exit2.setScale(0.06);
    my.sprite.dark.visible = false;
    my.sprite.creditPage.visible = false;
    my.sprite.exit2.visible = false;
});

    my.sprite.exit.on('pointerdown', () => {
    my.sprite.exit.setScale(0.04);
        const sound = this.sound.add('switch_002');
        sound.play();
});
    my.sprite.exit.on('pointerup', () => {
    my.sprite.exit.setScale(0.06);
    my.sprite.dark.visible = false;
    my.sprite.frame.visible = false;
    my.sprite.exit.visible = false;
    my.sprite.lvl1.visible = false;
    my.sprite.lvl2.visible = false;
    my.sprite.lvl3.visible = false;
    my.sprite.Prolvl.visible = false;
});

    my.sprite.lvl1.on('pointerdown', () => {
    my.sprite.lvl1.setScale(0.15);
        const sound = this.sound.add('switch_002');
        sound.play();
});
    my.sprite.lvl1.on('pointerup', () => {
    my.sprite.lvl1.setScale(0.25);
    this.scene.start("platformerScene"); // Switch to game scene
});

    my.sprite.lvl2.on('pointerdown', () => {
    my.sprite.lvl2.setScale(0.08);
        const sound = this.sound.add('switch_002');
        sound.play();
});
    my.sprite.lvl2.on('pointerup', () => {
    my.sprite.lvl2.setScale(0.1193);
    this.scene.start("platformerScene2"); // Switch to game scene

});

    my.sprite.lvl3.on('pointerdown', () => {
    my.sprite.lvl3.setScale(0.09);
        const sound = this.sound.add('switch_002');
        sound.play();
});
    my.sprite.lvl3.on('pointerup', () => {
    my.sprite.lvl3.setScale(0.1279);
    this.scene.start("platformerScene3"); // Switch to game scene

});

    my.sprite.Prolvl.on('pointerdown', () => {
    my.sprite.Prolvl.setScale(0.07);
        const sound = this.sound.add('switch_002');
        sound.play();
});
    my.sprite.Prolvl.on('pointerup', () => {
    my.sprite.Prolvl.setScale(0.105);
    this.scene.start("platformerScene4"); // Switch to game scene

});

my.sprite.Bee.on('pointerdown', () => {
    my.sprite.Bee.setScale(10);
    const sound = this.sound.add('switch_002');
    sound.play();
});

my.sprite.Bee.on('pointerup', () => {
    my.sprite.Bee.setScale(11);
    
    // Initialize click counter if it doesn't exist
    if (typeof my.sprite.Bee.clickCount === 'undefined') {
        my.sprite.Bee.clickCount = 0;
    }
    
    // Hide all comments first
    my.sprite.c1.visible = false;
    my.sprite.c2.visible = false;
    my.sprite.c3.visible = false;
    my.sprite.Arrow.visible = false;
    
    // Increment and cycle the click counter (0-3)
    my.sprite.Bee.clickCount = (my.sprite.Bee.clickCount + 1) % 5;
    
    // Show the appropriate comment based on click count
    switch(my.sprite.Bee.clickCount) {
        case 1:
            my.sprite.c1.visible = true;
            break;
        case 2:
            my.sprite.c2.visible = true;
            break;
        case 3:
            my.sprite.Arrow.visible = true;
            break;
        case 4:
            my.sprite.c3.visible = true;
            break;
    }
});

    //title animation
    this.tweens.add({
        targets: my.sprite.title,
        y: this.titleY - 20,      
        duration: 1500,           
        yoyo: true,               
        repeat: -1,               
        ease: 'Sine.easeInOut'
    });
        this.tweens.add({
        targets: my.sprite.Bee,
        y: my.sprite.Bee.y - 20,
        duration: 700, 
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
    });

    }

update () {
    let my = this.my;

    }
}