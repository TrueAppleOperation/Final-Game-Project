class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");
        // Load characters spritesheet
        this.load.image("iceCream", "tile_0107.png");
        this.load.image("DarkBackdrop","Dark.png");

        this.load.image("BGgame_tiles", "BackgroundGame.png");
        
        this.load.image("tilemap_tiles", "tilemap_packed.png");                         
        this.load.tilemapTiledJSON("platformer-level-1", "platformer-level-1.tmj");   
        this.load.tilemapTiledJSON("platformer-level-2", "platformer-level-2.tmj");
        this.load.tilemapTiledJSON("platformer-level-3", "platformer-level-3.tmj");
        this.load.tilemapTiledJSON("platformer-level-4", "platformer-level-4.tmj");


        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        this.load.image("star", "STAR.png");
        this.load.image("bee", "tile_0052.png");
        this.load.image("snowflake1", "snowflake_01.png");  
        this.load.image("snowflake2", "snowflake_02.png"); 

        // Comments
        this.load.image("Commentlvl1", "Comment lvl1.png"); 
        this.load.image("Comment1lvl2", "Comment1 lvl2.png"); 
        this.load.image("Comment2lvl2", "Comment2 lvl2.png");
        this.load.image("Commentlvl3", "Comment lvl3.png"); 
        this.load.image("Commentlvl4", "Comment lvl4.png"); 

        // Audio
        this.load.audio("bong", "bong_001.ogg");
        this.load.audio("drop", "jump2.wav");

        //Level completed
        this.load.image("GAMEcompleted","GAMEcompleted2.png");
        this.load.image("MainMenuButton","MainMenuButton2.png");

        // Particle Pack asset pack.
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: [{ key: 'iceCream', frame: 0 }],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{ key: 'iceCream', frame: 0 }],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [{ key: 'iceCream', frame: 0 }]
        });

        this.scene.start("mainMenu");
    }

    update() {
    }
}