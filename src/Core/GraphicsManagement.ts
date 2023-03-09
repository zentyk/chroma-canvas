import Entity from "./Entity";

namespace Graphics {
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
            context.drawImage(this.image,this.x,this.y,this.w,this.h);
        }
    }
    export class SpriteSheet {

    }
    export class SpriteAtlas {
    }
}

export default Graphics;