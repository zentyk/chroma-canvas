import Marrus from "./Engine";
import Scene = Marrus.Scene;
import Sprite = Marrus.Sprite;
class Scene1 extends Scene {
    private player: any;
    constructor(engine : Marrus.Engine, parameters? : any) {
        super(engine,parameters);
    }
    Preload() {
        this.engine.spriteManager.AddSprites('img.png');
        super.Preload();
    }

    Init() {
        this.player = new Sprite(0,0,100,100,'red',this.engine.spriteManager.images[0]);
        this.AddObject(this.player);
        super.Init();
    }
    
    Update() {
        this.player.x++;
        super.Update();
    }
}

window.onload = function () {
    let config = new Marrus.Config();
    let engine = new Marrus.Engine(config);
    let params = [];
    params.push({isNew: true})
    engine.Init();
    let scene1 = new Scene1(engine,params);
    engine.sceneManager.AddScene(scene1);
    engine.sceneManager.SetScene(scene1);
}