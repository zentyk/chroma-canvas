import Viewport from "./Components/Viewport";
export default class Lucius {
    Viewport : Viewport
    constructor() {
        this.Init();
    }
    Init() {
        let h =  document.documentElement.clientHeight * 0.99;
        let w =  document.documentElement.clientWidth * 0.99;
        this.Viewport = new Viewport();
        this.Viewport.SetBackgroundColor('black');

        window.addEventListener('load', ()=>{
            this.Viewport.Resize();
        }, false);

        window.addEventListener('resize', ()=>{
            this.Viewport.Resize()
        }, false);

        this.Viewport.Instance.fillStyle = 'white';
        this.Viewport.Instance.fillRect(30,120,100,40);
        this.Viewport.Instance.fillRect(110,20,50,40);
        this.Viewport.Instance.fillRect(60,180,80,80);
    }
}