import Marrus from "./Engine";

enum errorTypes {
    ENERR = "Engine Error",
    SYSERR = "System Error",
    GRAPHERR = "Graphics Error",
    MATHERR = "Math Error",
    NETERR = "Network Error",
    GERR = "Game Error",
    FILEERR = "File Error",
    MEMERR = "Memory Error",
    SOUNDERR = "Sound Error",
}

class Config {
    private title = "Marrus";
    private fps = 60;
    private width = 800;
    private height = 600;
    private backgroundColor = '#16725e';
    private context = "2d";
    public readonly canvasId = "viewport";
    public readonly errorTypes = errorTypes;
}

window.onload = function () {
    let config = new Config();
    let engine = new Marrus.Engine(config);
}