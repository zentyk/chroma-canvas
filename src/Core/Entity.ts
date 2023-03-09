export default class Entity {
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

interface IEntity {

}