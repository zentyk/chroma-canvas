export default class InputManagement {
    constructor() {

    }

    OnMouseMove(e) {

    }

    public OnMouseDown(e) { }

    public OnMouseUp(e) { }

    public OnMouseOut(e) { }

    public GetMousePos(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
            y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
        };
    }
}