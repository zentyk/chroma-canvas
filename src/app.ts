window.onload = function (){
    //Get Canvas Context
    let canvas = document.getElementById('viewport');
    let context = canvas.getContext('2d');

    //timing and frames per second
    let lastFrame = 0;
    let fpsTime = 0;
    let frameCount = 0;
    let fps = 0;

    function init() {
        canvas.addEventListener('mousemove',onmousemove);
        canvas.addEventListener('mousedown',onmousedown);
        canvas.addEventListener('mouseup',onmouseup);
        canvas.addEventListener('mouseout',onmouseout);

        main(0);
    }

    // Main Loop
    function main(tFrame){
        //Request AnimationFrames
        window.requestAnimationFrame(main);

        //Update and RenderGame
        update(tFrame);
        render();
    }

    function update(tFrame){
        let dt = (tFrame-lastFrame)/1000;
        lastFrame = tFrame;

        updateFps(dt);
    }

    function updateFps(dt) {
        //Calculate FPS
        if(fpsTime > 0.25){
            fps = Math.round(frameCount/fpsTime);

            fpsTime=0;
            frameCount=0;
        }

        //Reset Time and Framecount
        fpsTime+=dt;
        frameCount++;
    }

    function render(){
        drawFrame();
    }

    function drawFrame() {
        //Background and Border
        context.fillStyle="#d0d0d0";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.fillStyle="#e8eaec";
        context.fillRect(1,1,canvas.width,canvas.height);

        //Draw Header
        context.fillStyle="#303030";
        context.fillRect(0,0, canvas.width, 65);

        //Draw Title
        context.fillStyl="#ffffff";
        context.font="24px Verdana";
        context.fillText("Marrus-HTML5 Engine",10,30);

        //Display FPS
        context.fillStyle="#ffffff";
        context.font="12px Verdana";
        context.fillText("FPS: "+fps,13,50);
    }

    //Mouse Event Handlers
    function onMouseMove(e){}
    function onMouseDown(e){}
    function onMouseUp(e){}
    function onMouseOut(e){}

    function getMousePos(canvas,e){
        let rect = canvas.getBoundingClientRect();
        return {
            x : Math.round((e.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
            y : Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
        };
    }

    init();
}