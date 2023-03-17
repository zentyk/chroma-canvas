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
        this.Player = new Graphics.SpriteSheet(200, 200, 200,200,100,7,[
            this.engine.spriteManager.images[0],
            this.engine.spriteManager.images[1],
            this.engine.spriteManager.images[2],
            this.engine.spriteManager.images[3],
            this.engine.spriteManager.images[4],
            this.engine.spriteManager.images[5],
            this.engine.spriteManager.images[6],
        ]);
        let sprite = new Graphics.Sprite(500,200,200,200,'white',this.engine.spriteManager.images[0]);
        this.AddObject(this.Player);
        this.AddObject(sprite);
        super.Init();
    }

    Update() {
        super.Update();
    }
}