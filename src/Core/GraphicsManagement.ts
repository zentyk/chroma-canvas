import {Entity,IEntity} from "./Entity";

namespace Graphics {
    export class Sprite extends Entity {
        public color : string;
        public alpha : number = 1.0;
        public image : HTMLImageElement;

        constructor(x: number, y: number, h: number, w: number, color: string, alpha:number, image?: HTMLImageElement) {
            super(x, y, h, w);
            this.alpha = alpha;
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
            if(this.image) {
                context.globalAlpha = this.alpha;
                context.drawImage(this.image,this.x,this.y,this.w,this.h);
            } else {
                context.fillStyle = this.color;
                context.fillRect(this.x, this.y, this.w, this.h);
            }
        }
    }
    export class SpriteSheet implements IEntity {
        public images : HTMLImageElement[];
        public imageLength : number;
        private currentImage : number = 0;
        private renderSpeed : number;
        public h : number;
        public w : number;
        public x : number;
        public y : number;

        constructor(x: number, y: number, h: number, w: number, renderSpeed, imageLength : number, images : HTMLImageElement[]) {
            this.x = x;
            this.y = y;
            this.h = h;
            this.w = w;
            this.renderSpeed = renderSpeed;
            this.imageLength = imageLength-1;
            this.images = images;
        }

        Start(): void {
            for(let i = 0; i < this.imageLength; i++) {
                let i = 0;
                setInterval(() => {
                    this.currentImage = i;
                    i++;
                    if(i >= this.imageLength) {
                        i = 0;
                    }
                }, this.renderSpeed);

            }
        }

        Update(context: CanvasRenderingContext2D): void {
            this.Draw(context);
        }

        Draw(context: CanvasRenderingContext2D): void {
            context.drawImage(this.images[this.currentImage],this.x,this.y,this.w,this.h);
        }

    }
    export class SpriteAtlas implements IEntity {
        h: number;
        w: number;
        x: number;
        y: number;

        Draw(context: CanvasRenderingContext2D): void {
        }

        Start(): void {
        }

        Update(context: CanvasRenderingContext2D): void {
        }
    }
}

export default Graphics;