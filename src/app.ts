import Marrus from "./Core/Engine";
import MainGame from "./Game";

window.onload = function () {
    let config = new Marrus.Config();
    let engine = new Marrus.Engine(config);
    let params = [];
    params.push({isNew: true})
    engine.Init();
    let scene1 = new MainGame(engine,params);
    engine.sceneManager.AddScene(scene1);
    engine.sceneManager.SetScene(scene1);
}