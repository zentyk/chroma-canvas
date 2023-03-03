import InputManager from "./InputManager";
import SpriteManager from "./SpriteManager";
import Entity from "./Entity";

namespace Marrus {
    export class Engine {
        public canvas : HTMLElement;
        public context : CanvasRenderingContext2D;
        public spriteManager : SpriteManager;
        public inputManager : InputManager;
        private config : any;
        private then : any;
        private delta: any;
        private now: any;
        public sceneManager: Marrus.SceneManager;
        constructor(config : any) {
            this.config = config;
            this.then = Date.now();
            this.spriteManager = new SpriteManager();
        }
        public player : any;

        Init() {
            try {
                this.canvas = document.getElementById(this.config.canvasId);
                if(this.canvas instanceof HTMLCanvasElement) {
                    this.context = this.canvas.getContext(this.config.context);
                } else {
                    throw new Error(`${this.config.errorTypes.ENERR}: Canvas element not found`);
                }
            } catch(e) {
                alert(e.message);
            }
            this.spriteManager.LoadSprites();
            //this.canvas.addEventListener('mousemove',this.inputManager.OnMouseMove);
            //this.canvas.addEventListener('mousedown',this.inputManager.OnMouseDown);
            //this.canvas.addEventListener('mouseup',this.inputManager.OnMouseUp);
            //this.canvas.addEventListener('mouseout',this.inputManager.OnMouseOut);
            this.sceneManager = new SceneManager(this.config,this.spriteManager,this.context);
            this.Main();
        }

        Main() {
            this.then = Date.now();
            this.Render();
            let params = [];
            params.push({isNew: true});
            let scene1 = this.sceneManager.AddScene(new Scene(this.context,this.config,this.spriteManager, params));

            this.sceneManager.SetScene(this.sceneManager.scenes[0]);
        }

        private Render() {
            this.now = Date.now();
            this.delta = this.now - this.then;
            if(this.delta > 1000/60) {
                this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.sceneManager.UpdateScene();
                this.then = this.now;
            }
            window.requestAnimationFrame(this.Render.bind(this));
        }
    }

    class Sprite extends Entity {
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

    class SceneManager {
        scenes : any = [];
        private currentScene : Scene;
        private context: CanvasRenderingContext2D;
        private config: any;
        private spriteManager: SpriteManager;
        constructor(config,spriteManager,context : CanvasRenderingContext2D) {
            this.config = config;
            this.spriteManager = spriteManager;
            this.context = context;
        }

        AddScene(scene) {
            this.scenes.push(scene);
        }

        SetScene(scene : any) {
            this.currentScene = scene;
        }

        UpdateScene() {
            this.currentScene.Update(this.context);
        }
    }

    class Scene {
        public objects : any = [];
        public backgroundColor : string;
        public parameters : boolean = false;
        private spriteManager: SpriteManager;

        constructor(context : CanvasRenderingContext2D,config : any, spriteManager : SpriteManager, parameters? : boolean) {
            this.parameters = parameters;
            this.spriteManager = spriteManager;
            if(config.backgroundColor) {
                this.backgroundColor = config.backgroundColor
            } else {
                this.backgroundColor = 'black';
            }
            this.Init();
        }

        Init() {
            this.objects.push(new Sprite(0,0,100,100,'red',this.spriteManager.images[0]));
            for(let i=0; i < this.objects.length; i++) {
                this.objects[i].Start();
            }
            this.ActionButton();
        }

        Update(context: CanvasRenderingContext2D) {
            this.Draw(context);
            for(let i=0; i < this.objects.length; i++) {
                this.objects[i].Update(context);
            }
        }

        Draw(context : CanvasRenderingContext2D) {
            context.fillStyle = this.backgroundColor;
            context.fillRect(0,0,context.canvas.width,context.canvas.height);
        }

        ActionButton () {
            if(this.parameters){

            } else {
                //search entry id
                //if found, update entry
                //else, create new entry
            }
        }
    }
}

export default Marrus;