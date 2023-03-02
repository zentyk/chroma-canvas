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
    }
}

export default Marrus;