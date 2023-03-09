import Marrus from "./Core/Engine";
import Match3 from "./Game";
import TestRoom from "./TestRoom";

window.onload = function () {
    let config = new Marrus.Config();
    let engine = new Marrus.Engine(config);
    let params = [];
    params.push({isNew: true})
    engine.Init();
    let scene1 = new TestRoom(engine,params); //new Match3(engine,params);
    engine.sceneManager.AddScene(scene1);
    engine.sceneManager.SetScene(scene1);
}