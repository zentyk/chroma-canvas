import Marrus from "./Core/Engine";
import Graphics from "./Core/GraphicsManagement";
import SceneManagement from "./Core/SceneManagement";

export default class TestRoom extends SceneManagement.Scene {
    private Player : Graphics.SpriteSheet;
    constructor(engine:Marrus.Engine,parameters) {
        super(engine,parameters);
    }

    Preload() {
        this.engine.spriteManager.AddSprites('./assets/gems/gem0.png');
        this.engine.spriteManager.AddSprites('./assets/gems/gem1.png');
        this.engine.spriteManager.AddSprites('./assets/gems/gem2.png');
        this.engine.spriteManager.AddSprites('./assets/gems/gem3.png');
        this.engine.spriteManager.AddSprites('./assets/gems/gem4.png');
        this.engine.spriteManager.AddSprites('./assets/gems/gem5.png');
        this.engine.spriteManager.AddSprites('./assets/gems/gem6.png');
        super.Preload();
    }

    Init() {
        this.Player = new Graphics.SpriteSheet(100, 100, 16,12,100,7,[
            this.engine.spriteManager.images[0],
            this.engine.spriteManager.images[1],
            this.engine.spriteManager.images[2],
            this.engine.spriteManager.images[3],
            this.engine.spriteManager.images[4],
            this.engine.spriteManager.images[5],
            this.engine.spriteManager.images[6],
        ]);
        let sprite = new Graphics.Sprite(100,100,16,12,'white',this.engine.spriteManager.images[0]);
        let circle = new Graphics.Circle(20,50,1,'white',0.1);
        this.AddObject(this.Player);
        this.AddObject(sprite);
        this.AddObject(circle);
        super.Init();
    }

    Update() {
        super.Update();
    }
}