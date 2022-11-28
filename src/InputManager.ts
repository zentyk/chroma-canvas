class InputManager {
    constructor() {}

    OnMouseMove(e){}
    OnMouseDown(e){}
    OnMouseUp(e){}
    OnMouseOut(e){}

    GetMousePos(canvas,e) {
        let rect = canvas.getBoundingClientRect();
        return {
            x : Math.round((e.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
            y : Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
        };
    }
}

export default InputManager;