export default class Viewport {
    Instance: CanvasRenderingContext2D;
    constructor() {
        let canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        this.Instance = canvas.getContext('2d');
        this.Instance.canvas.height = document.documentElement.clientHeight * 0.8;
        this.Instance.canvas.width = document.documentElement.clientWidth * 0.8;
    }

    Resize() {
        let h = window.innerHeight * 0.98;
        let ratio = this.Instance.canvas.width / this.Instance.canvas.height;
        let w = h * ratio;

        this.Instance.canvas.style.width = w + 'px';
        this.Instance.canvas.style.height = h + 'px';
    }

    SetBackgroundColor(color) {
        //set background color
        document.body.style.backgroundColor = color;
        this.Instance.fillStyle = color;
        this.Instance.fillRect(0,0,this.Instance.canvas.width,this.Instance.canvas.height);
    }
}