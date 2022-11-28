import Marrus from "./Engine";

window.onload = function () {
    let engine = new Marrus.Engine();

    engine.spriteManager.AddSprites('img.png');
    engine.Init();
}