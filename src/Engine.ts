import InputManager from "./InputManager";
import SpriteManager from "./SpriteManager";

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
        constructor(config : any) {
            this.config = config;
            this.then = Date.now();
            this.spriteManager = new SpriteManager();
        }
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
                this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
                this.Draw();
                this.then = this.now;
            }
            window.requestAnimationFrame(this.Render.bind(this));
        }

        private Draw() {
            this.context.drawImage(this.spriteManager.images[0],0,0);
        }
    }
}

export default Marrus;