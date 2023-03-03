import InputManager from "./InputManager";
import SpriteManager from "./SpriteManager";
import Entity from "./Entity";

namespace Marrus {
    enum errorTypes {
        ENERR = "Engine Error",
        SYSERR = "System Error",
        GRAPHERR = "Graphics Error",
        MATHERR = "Math Error",
        NETERR = "Network Error",
        GERR = "Game Error",
        FILEERR = "File Error",
        MEMERR = "Memory Error",
        SOUNDERR = "Sound Error",
    }

    export class Config {
        public readonly title = "WL_Match-3";
        public readonly fps = 60;
        public readonly width = 800;
        public readonly height = 600;
        public readonly backgroundColor = '#16725e';
        public readonly canvasId = "viewport";
        public readonly errorTypes = errorTypes;
    }
    export class Engine {
        public canvas : HTMLCanvasElement;
        public context : CanvasRenderingContext2D;
        public spriteManager : SpriteManager;
        public inputManager : InputManager;
        public config : any;
        private then : any;
        private delta: any;
        private now: any;
        public sceneManager: Marrus.SceneManager;
        constructor(config : Config) {
            this.config = config as Config;
            this.then = Date.now();
            this.spriteManager = new SpriteManager();
        }

        Init() {
            try {
                this.canvas = document.getElementById(this.config.canvasId) as HTMLCanvasElement;
                if(this.canvas instanceof HTMLCanvasElement) {
                    this.context = this.canvas.getContext('2d');
                }
            } catch(e) {
                alert(`${this.config.errorTypes.ENERR} ${e.message}`);
            }
            this.sceneManager = new SceneManager(this.config,this.spriteManager,this.context);
            //this.canvas.addEventListener('mousemove',this.inputManager.OnMouseMove);
            //this.canvas.addEventListener('mousedown',this.inputManager.OnMouseDown);
            //this.canvas.addEventListener('mouseup',this.inputManager.OnMouseUp);
            //this.canvas.addEventListener('mouseout',this.inputManager.OnMouseOut);
            console.log(`🍕 Marrus Engine 1.0 presents : ${this.config.title}`);
            this.Main();
        }

        Main() {
            this.then = Date.now();
            this.Render();
        }

        private Render() {
            this.now = Date.now();
            this.delta = this.now - this.then;
            if(this.delta > 1000/this.config.fps) {
                this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.sceneManager.UpdateScene();
                this.then = this.now;
            }
            window.requestAnimationFrame(this.Render.bind(this));
        }
    }

    export class Sprite extends Entity {
        public color : string;
        public image : HTMLImageElement;

        constructor(x: number, y: number, h: number, w: number, color: string, image?: HTMLImageElement) {
            super(x, y, h, w);
            this.color = color;
            this.image = image;
        }

        Start() {
            super.Start();
        }

        Update(context : CanvasRenderingContext2D) {
            super.Update(context);
        }

        Draw(context : CanvasRenderingContext2D) {
            super.Draw(context);
            context.drawImage(this.image,this.x,0);
        }
    }

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
        public engine : Engine;
        public objects : any = [];
        public backgroundColor : string;
        public parameters : any;
        private spriteManager: SpriteManager;

        constructor(engine : Engine,parameters? : any) {
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

export default Marrus;