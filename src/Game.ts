import Marrus from "./Core/Engine";
import SceneManagement from "./Core/SceneManagement";
import Scene = SceneManagement.Scene;
import Graphics from "./Core/GraphicsManagement";
import Sprite = Graphics.Sprite;

export default class Match3 extends Scene {
    private level : any = {};
    private tileSprites = [
        'img.png',
    ];
    private moves = [];
    private clusters = [];

    private score = 0;

    private currentMove = {column:0,row:0,direction:0};
    private gameStates = {init:0,ready:1,resolve:2};
    private gameState = this.gameStates.init;
    private gameover = false;

    constructor(engine : Marrus.Engine, parameters? : any) {
        super(engine,parameters);
    }

    Preload() {
        this.engine.spriteManager.AddSprites('img.png');
        super.Preload();
    }

    Init() {
        this.level = {
            x : 250,
            y : 1200,
            columns : 8,
            rows : 8,
            tileWidth : 200,
            tileHeight : 200,
            tiles : [],
            selectedTile : {selected:false,column:0,row:0},
        };
        this.CreateLevel();
        super.Init();
    }

    Update() {
        super.Update();
    }

    CreateLevel() {
        let done = false;

        while(!done) {
            for (let i = 0; i < this.level.columns; i++) {
                this.level.tiles[i] = [];
                for (let j = 0; j < this.level.rows; j++) {
                    let tile = new Sprite(
                        this.level.x + i * this.level.tileWidth,
                        this.level.y + j * this.level.tileHeight - 500,
                        this.level.tileWidth,
                        this.level.tileHeight,
                        'red',
                        this.engine.spriteManager.images[0]
                    );
                    this.AddObject(tile);
                    let tileObject = new Tile(tile, i, j, 0, 0);
                    this.level.tiles[i][j] = tileObject;
                }
            }

            this.ResolveClusters();
            this.FindMoves();

            if(this.moves.length > 0) {
                done = true;
            }
        }
    }

    ClearLevel(){
        for(let i = 0; i < this.level.columns; i++){
            for(let j = 0; j < this.level.rows; j++){
                this.RemoveObject(this.level.tiles[i][j].sprite);
            }
        }
        this.level.tiles = [];
    }

    ResolveClusters() {
        this.FindClusters();

        while(this.clusters.length > 0) {
            this.RemoveClusters();
            this.ShiftTiles();
            this.FindClusters();
        }
    }

    FindClusters() {
        this.clusters = [];
        for(let j = 0; j < this.level.rows; j++) {
            let matchLength = 1;
            for(let i=0; i < this.level.columns; i++) {
                let checkedCluster = true;
                if(i === this.level.columns - 1) {
                    checkedCluster = true;
                } else {
                    if(this.level.tiles[i][j].type === this.level.tiles[i+1][j].type &&
                        this.level.tiles[i][j].type !== -1) {
                        matchLength++;
                    } else {
                        checkedCluster = true;
                    }
                }

                if(checkedCluster) {
                    if(matchLength >= 3) {
                        this.clusters.push({column:i+1-matchLength,row:j,length:matchLength,horizontal:true});
                    }
                    matchLength = 1;
                }
            }
        }

        for(let i = 0; i < this.level.columns; i++) {
            let matchLength = 1;
            for(let j=0; j < this.level.rows; j++) {
                let checkedCluster = true;
                if(j === this.level.rows - 1) {
                    checkedCluster = true;
                } else {
                    if(this.level.tiles[i][j].type === this.level.tiles[i][j+1].type &&
                        this.level.tiles[i][j].type !== -1) {
                        matchLength++;
                    } else {
                        checkedCluster = true;
                    }
                }

                if(checkedCluster) {
                    if(matchLength >= 3) {
                        this.clusters.push({column:i,row:j+1-matchLength,length:matchLength,horizontal:false});
                    }
                    matchLength = 1;
                }
            }
        }
    }

    SwapTiles(x1 : number, y1 : number, x2 : number, y2 : number) {
        let typeswap = this.level.tiles[x1][y1].type;
        this.level.tiles[x1][y1].type = this.level.tiles[x2][y2].type;
        this.level.tiles[x2][y2].type = typeswap;
    }

    FindMoves() {
        this.moves = [];

        for(let j = 0; j < this.level.rows; j++) {
            for(let i = 0; i < this.level.columns-1; i++) {
                this.SwapTiles(i, j, i + 1, j);
                this.FindClusters();
                this.SwapTiles(i, j, i + 1, j);

                if(this.clusters.length > 0) {
                    this.moves.push({column1:i,row1:j,column2:i+1,row2:j});
                }
            }
        }

        for(let i = 0; i < this.level.columns; i++) {
            for(let j = 0; j < this.level.rows-1; j++) {
                this.SwapTiles(i, j, i, j + 1);
                this.FindClusters();
                this.SwapTiles(i, j, i, j + 1);

                if(this.clusters.length > 0) {
                    this.moves.push({column1:i,row1:j,column2:i,row2:j+1});
                }
            }
        }

        this.clusters = [];
    }

    LoopClusters(callback : Function, context : any) {
        for(let i = 0; i < this.clusters.length; i++) {
            let cluster = this.clusters[i];
            let cOffset = 0;
            let rOffset = 0;
            for(let j = 0; j < cluster.length; j++) {
                callback.call(i,cluster.column+cOffset,cluster.row+rOffset,cluster);

                if(cluster.horizontal) {
                    cOffset++;
                } else {
                    rOffset++;
                }
            }
        }
    }

    RemoveClusters() {
        this.LoopClusters(function(index,column,row,cluster){this.level.tiles[column][row].type = -1;},this);

        for(let i = 0; i<this.level.columns; i++) {
            let shift = 0;
            for(let j = this.level.rows-1; j>=0; j--){
                if(this.level.tiles[i][j].type === -1){
                    shift++;
                    this.level.tiles[i][j].shift = 0;
                } else {
                    this.level.tiles[i][j].shift = shift;
                }
            }
        }
    }

    ShiftTiles() {
        for(let i = 0; i<this.level.columns; i++) {
            for(let j = this.level.rows-1; j>=0; j--){
                if(this.level.tiles[i][j].type === -1) {
                    this.level.tiles[i][j].type = this.GetRandomTile();
                } else {
                    let shift = this.level.tiles[i][j].shift;
                    if(shift > 0) {
                        this.SwapTiles(i, j, i, j + shift);
                    }
                }
                this.level.tiles[i][j].shift = 0;
            }
        }
    }

    GetRandomTile() {
        return Math.floor(Math.random() * this.level.tileTypes);
    }
}
class Tile {
    sprite : Sprite;
    column : number;
    row : number;
    type : number;
    shift : number;

    constructor(sprite : Sprite, column : number, row : number, type : number, shift : number) {
        this.sprite = sprite;
        this.column = column;
        this.row = row;
        this.type = type;
        this.shift = shift;
    }
}