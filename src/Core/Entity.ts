export class Entity {
    public x : number;
    public y : number;
    public h : number;
    public w : number;

    constructor(x : number, y : number, h : number, w : number) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }

    Start() {

    }

    Update(context : CanvasRenderingContext2D) {
        this.Draw(context);
    }

    Draw(context : CanvasRenderingContext2D) {}
}

export interface IEntity {
    x : number;
    y : number;
    h : number;
    w : number;
    Start() : void;
    Update(context : CanvasRenderingContext2D) : void;
    Draw(context : CanvasRenderingContext2D) : void;

}