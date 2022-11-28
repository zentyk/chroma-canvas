import Marrus from "./Engine";

window.onload = function () {
    let engine = new Marrus.Engine(document.getElementById('viewport'));
    engine.spriteManager.AddSprites('img.png');
    engine.Init();
}