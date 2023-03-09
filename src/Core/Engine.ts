import InputManagement from "../InputManagement";
import SpriteManager from "./SpriteManager";
import SceneManagement from "./SceneManagement";

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
        public inputManager : InputManagement;
        public config : any;
        private then : any;
        private delta: any;
        private now: any;SceneManagement;
        public sceneManager : SceneManagement.SceneManager;
        constructor(config : Config) {
            this.config = config as Config;
            this.then = Date.now();
            this.spriteManager = new SpriteManager();
        }

        Init() {
            try {
                this.canvas = document.getElementById(this.config.canvasId) as HTMLCanvasElement;
                this.canvas.style.width = String(2050);
                this.canvas.style.height = String(3400);
                if(this.canvas instanceof HTMLCanvasElement) {
                    this.context = this.canvas.getContext('2d');
                }
            } catch(e) {
                alert(`${this.config.errorTypes.ENERR} ${e.message}`);
            }
            this.sceneManager = new SceneManagement.SceneManager(this.config,this.spriteManager,this.context);
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
}

export default Marrus;