import InputManager from "./InputManager";
import SpriteManager from "./SpriteManager";

namespace Marrus {
    export class Engine {
        public canvas : HTMLElement;
        public context : CanvasRenderingContext2D;
        public lastFrame : number;
        public fpsTime : number;
        public frameCount : number;
        public fps : number;
        public inputManager : InputManager;
        public spriteManager : SpriteManager;

        constructor(canvas) {
            this.canvas = canvas;

            if(this.canvas instanceof HTMLCanvasElement) {
                this.context = this.canvas.getContext("2d");
            }

            this.lastFrame = 0;
            this.fpsTime = 0;
            this.frameCount = 0;
            this.fps = 0;

            this.spriteManager = new SpriteManager();
        }

        Init() {
            this.inputManager = new InputManager();
            this.spriteManager.LoadSprites();
            this.canvas.addEventListener('mousemove',this.inputManager.OnMouseMove);
            this.canvas.addEventListener('mousedown',this.inputManager.OnMouseDown);
            this.canvas.addEventListener('mouseup',this.inputManager.OnMouseUp);
            this.canvas.addEventListener('mouseout',this.inputManager.OnMouseOut);
            this.Main(0);
        }
        // Main Loop
        Main(tFrame) {
            window.requestAnimationFrame(this.Main);

            this.Update(tFrame);
            this.Render();
        }
        Update(tFrame) {
            let dt = (tFrame-this.lastFrame)/1000;
            this.lastFrame = tFrame;
            this.UpdateFps(dt);
        }
        UpdateFps(dt) {
            if(this.fpsTime > 0.25){
                this.fps = Math.round(this.frameCount/this.fpsTime);
                this.fpsTime=0;
                this.frameCount=0;
            }

            this.fpsTime+=dt;
            this.frameCount++;
        }
        Render(){
            this.DrawFrame();
        }
        DrawFrame() {
            this.context.fillStyle="#d0d0d0";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillStyle="#e8eaec";
            this.context.fillRect(1, 1, this.canvas.width, this.canvas.height);

            this.context.fillStyle="#303030";
            this.context.fillRect(0, 0, this.canvas.width, 65);

            this.context.fillStyle="#ffffff";
            this.context.font="24px Verdana";
            this.context.fillText("Marrus-HTML5 Engine",10,30);

            this.context.fillStyle="#ffffff";
            this.context.font="12px Verdana";
            this.context.fillText("FPS: "+this.fps,13,50);

            this.context.drawImage(this.spriteManager.images[0],10,10);
        }
    }
}

export default Marrus;