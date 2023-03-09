import SpriteManager from "./SpriteManager";
import Marrus from "./Engine";

namespace SceneManagement {
    export class SceneManager {
        scenes : any = [];
        private currentScene : Scene;
        private context: CanvasRenderingContext2D;
        private config: any;
        private spriteManager: SpriteManager;
        constructor(config,spriteManager,context) {
            this.config = config;
            this.spriteManager = spriteManager;
            this.context = context;
        }

        public AddScene(scene) {
            this.scenes.push(scene);
        }

        SetScene(scene : any) {
            this.currentScene = scene;
        }

        UpdateScene() {
            this.currentScene.Update();
        }
    }
    export class Scene {
        public engine : Marrus.Engine;
        public objects : any = [];
        public backgroundColor : string;
        public parameters : any;
        private spriteManager: SpriteManager;

        constructor(engine : Marrus.Engine,parameters? : any) {
            this.engine = engine;
            this.parameters = parameters;
            this.spriteManager = this.engine.spriteManager;
            if(this.engine.config.backgroundColor) {
                this.backgroundColor = this.engine.config.backgroundColor
            } else {
                this.backgroundColor = 'black';
            }
            this.Preload();
        }

        Preload() {
            this.spriteManager.LoadSprites();
            this.Init();
        }

        Init() {
            for(let i=0; i < this.objects.length; i++) {
                this.objects[i].Start();
            }
        }

        public AddObject(object) {
            this.objects.push(object);
        }

        public RemoveObject(object) {
            this.objects.splice(this.objects.indexOf(object),1);
        }

        Update() {
            this.Draw();
            for(let i=0; i < this.objects.length; i++) {
                this.objects[i].Update(this.engine.context);
            }
        }

        Draw() {
            this.engine.context.fillStyle = this.backgroundColor;
            this.engine.context.fillRect(0,0,this.engine.context.canvas.width,this.engine.context.canvas.height);
        }
    }
}
export default SceneManagement;