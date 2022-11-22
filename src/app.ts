window.onload = function (){
    //Get Canvas Context
    let canvas = document.getElementById('viewport');
    let context = canvas.getContext('2d');

    //timing and frames per second
    let lastFrame = 0;
    let fpsTime = 0;
    let frameCount = 0;
    let fps = 0;

    //#region GAME VARS
    // Level properties
    var level = {
        x: 1,
        y: 65,
        width: canvas.width - 2,
        height: canvas.height - 66
    };

    // Square
    var square = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        xdir: 0,
        ydir: 0,
        speed: 0
    }

    // Score
    var score = 0;
    //#endregion

    function init() {
        canvas.addEventListener('mousemove',onMouseMove);
        canvas.addEventListener('mousedown',onMouseDown);
        canvas.addEventListener('mouseup',onMouseUp);
        canvas.addEventListener('mouseout',onMouseOut);

        //initialize gameObject
        square.width=100;
        square.height=100;
        square.x = level.x + (level.width-square.width)/2;
        square.y = level.y + (level.height-square.height)/2;
        square.xdir = 1;
        square.ydir = 1;
        square.speed= 200;

        score=0;

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

        // Move the square, time-based
        square.x += dt * square.speed * square.xdir;
        square.y += dt * square.speed * square.ydir;

        // Handle left and right collisions with the level
        if (square.x <= level.x) {
            // Left edge
            square.xdir = 1;
            square.x = level.x;
        } else if (square.x + square.width >= level.x + level.width) {
            // Right edge
            square.xdir = -1;
            square.x = level.x + level.width - square.width;
        }

        // Handle top and bottom collisions with the level
        if (square.y <= level.y) {
            // Top edge
            square.ydir = 1;
            square.y = level.y;
        } else if (square.y + square.height >= level.y + level.height) {
            // Bottom edge
            square.ydir = -1;
            square.y = level.y + level.height - square.height;
        }
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

        //Draw the square
        context.fillStyle = "#ff8080";
        context.fillRect(square.x, square.y, square.width, square.height);

        // Draw score inside the square
        context.fillStyle = "#ffffff";
        context.font = "38px Verdana";
        var textdim = context.measureText(score);
        context.fillText(score, square.x+(square.width-textdim.width)/2, square.y+65);
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
    function onMouseMove(e) {
    }
    function onMouseDown(e){
        //Get the mouse position
        var pos = getMousePos(canvas, e);

        // Check if we clicked the square
        if (pos.x >= square.x && pos.x < square.x + square.width &&
            pos.y >= square.y && pos.y < square.y + square.height) {

            // Increase the score
            score += 1;

            // Increase the speed of the square by 10 percent
            square.speed *= 1.1;

            // Give the square a random position
            square.x = Math.floor(Math.random()*(level.x+level.width-square.width));
            square.y = Math.floor(Math.random()*(level.y+level.height-square.height));

            // Give the square a random direction
            square.xdir = Math.floor(Math.random() * 2) * 2 - 1;
            square.ydir = Math.floor(Math.random() * 2) * 2 - 1;
        }
    }
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
};