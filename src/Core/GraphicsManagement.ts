import {Entity,IEntity} from "./Entity";

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
            context.drawImage(this.image,
                context.canvas.clientWidth/this.x,
                context.canvas.clientHeight/this.y,
                context.canvas.clientWidth/this.w,
                context.canvas.clientHeight/this.h);
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
            context.drawImage(this.images[this.currentImage],
                context.canvas.clientWidth/this.x,
                context.canvas.clientHeight/this.y,
                context.canvas.clientWidth/this.w,
                context.canvas.clientHeight/this.h);
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
    export class Circle implements IEntity {
        public x : number;
        public y : number;
        public h: number;
        public w: number;
        public radius : number;
        public color : string;

        public min : number;

        constructor(x : number, y : number, radius : number, color : string, min : number) {
            this.min = min*1000;
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
        }

        Start() {

        }

        Update(context : CanvasRenderingContext2D) {
            this.Draw(context);
        }

        Draw(context : CanvasRenderingContext2D) {
            context.beginPath();
            context.arc((context.canvas.clientWidth/(this.x)), (context.canvas.clientHeight/this.y), (this.min * 0.05), 0, 2 * Math.PI, false);
            context.fillStyle = this.color;
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = '#003300';
            context.stroke();
        }
    }
}

export default Graphics;