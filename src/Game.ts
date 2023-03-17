import Marrus from "./Core/Engine";
import SceneManagement from "./Core/SceneManagement";
import Scene = SceneManagement.Scene;
import Graphics from "./Core/GraphicsManagement";
import Sprite = Graphics.Sprite;

export default class MainGame extends Scene {
    private match3 : Match3;
    private level : any;
    private gemsUrls : any = [];
    private selectedTile: any;

    constructor(engine : Marrus.Engine, parameters? : any) {
        super(engine,parameters);
        this.match3 = new Match3();
        this.level = {
            x : 249,
            y : 700,
            tileWidth : 200,
            tileHeight : 200,
        };
        //input on click
        this.engine.canvas.addEventListener('touchstart', (e) => {
            this.SelectTile(e);
        });
    }

    Preload() {
        this.gemsUrls = [
            'assets/gems/gem0.png',
            'assets/gems/gem1.png',
            'assets/gems/gem2.png',
            'assets/gems/gem3.png',
            'assets/gems/gem4.png',
            'assets/gems/gem5.png',
            'assets/gems/gem6.png',
        ];
        this.engine.spriteManager.AddSprites(this.gemsUrls[0]);
        this.engine.spriteManager.AddSprites(this.gemsUrls[1]);
        this.engine.spriteManager.AddSprites(this.gemsUrls[2]);
        this.engine.spriteManager.AddSprites(this.gemsUrls[3]);
        this.engine.spriteManager.AddSprites(this.gemsUrls[4]);
        this.engine.spriteManager.AddSprites(this.gemsUrls[5]);
        this.engine.spriteManager.AddSprites(this.gemsUrls[6]);
        this.engine.spriteManager.AddSprites('./assets/UI/background.png');//7
        this.engine.spriteManager.AddSprites('./assets/UI/BoardPanel.png');//8
        this.engine.spriteManager.AddSprites('./assets/UI/BoardBg.png');//9
        this.engine.spriteManager.AddSprites('./assets/UI/SelectedItem.png');//10
        super.Preload();
    }

    Init() {
        this.SetupUI();
        setTimeout(() => {
            this.CreateLevel();
        }, 500);
        super.Init();
    }

    Update() {
        super.Update();
    }

    CreateLevel() {
        this.match3.GenerateBoard();
        this.DrawBoard();
    }

    public ClearLevel() {
        for(let i = 0; i < this.level.columns; i++){
            for(let j = 0; j < this.level.rows; j++){
                setTimeout(() => {
                    this.RemoveObject(this.level.tiles[i][j]);
                    this.level.tiles[i][j] = null;
                }, 500+(i*100)+(j*100));
            }
        }
    }

    private SetupUI() {
        let background = new Sprite(0,0,3730,2052,'white',1.0,this.engine.spriteManager.images[7]);
        let boardPanel = new Sprite(225,425,300,1650,'white',1.0,this.engine.spriteManager.images[8]);
        let boardBg = new Sprite(225,675,1650,1650,'white',1.0,this.engine.spriteManager.images[9]);
        this.AddObject('background',background);
        this.AddObject('boardpanel',boardPanel);
        this.AddObject('boardbg',boardBg);
    }

    private DrawBoard() {
        for(let i = 0; i < this.match3.columns; i++){
            for(let j = 0; j < this.match3.rows; j++){
                let s = new Sprite(
                    this.level.x + (i * this.level.tileWidth),
                    this.level.y + (j * this.level.tileHeight),
                    this.level.tileWidth,
                    this.level.tileHeight,
                    'white',
                    1.0,
                    this.engine.spriteManager.images[this.match3.items[i][j].type]);
                setTimeout(() => {
                    let nme = `tile${i},${j}`;
                    this.AddObject(name, s);
                    this.match3.items[i][j].sprite = s;
                }, 500 + (i * 100) + (j * 10));
            }
        }
    }

    private SelectTile(e: TouchEvent) {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        let column = Math.floor((x - this.level.x) / this.level.tileWidth);
        let row = Math.floor((y - this.level.y) / this.level.tileHeight);

        if(this.match3.GetValidItem(column,row)) {
            let selectSprites = [];
            let sp1, sp2 = null;
            let selected = this.match3.SelectItem(column,row);
            if(selected === 1) {
                sp1 = new Sprite(
                    this.level.x + (column * this.level.tileWidth),
                    this.level.y + (row * this.level.tileHeight),
                    this.level.tileWidth,
                    this.level.tileHeight,
                    'white',
                    1.0,
                    this.engine.spriteManager.images[10]
                );
                this.AddObject('selected1', sp1);
            }
            else if(selected === 2) {
                sp2 = new Sprite(
                    this.level.x + (column * this.level.tileWidth),
                    this.level.y + (row * this.level.tileHeight),
                    this.level.tileWidth,
                    this.level.tileHeight,
                    'white',
                    1.0,
                    this.engine.spriteManager.images[10]
                );
                this.AddObject('selected2', sp2);
                let canSwap = this.match3.CanSwapItems();
                if(canSwap) {
                    this.match3.swap(this.match3.selectedItems[0].column, this.match3.selectedItems[0].row, this.match3.selectedItems[1].column, this.match3.selectedItems[1].row);
                    this.SwapSprites();
                    this.match3.ClearSelectedItems();
                    this.RemoveObject('selected1');
                    this.RemoveObject('selected2');
                    this.match3.ResolveClusters();
                    this.match3.FindMoves();
                    this.DrawBoard();
                } else {
                    this.RemoveObject('selected1');
                    this.RemoveObject('selected2');
                }
            }
            else if(selected === 0) {
                this.RemoveObject('selected1');
                this.RemoveObject('selected2');
            }
        }
    }

    private SwapSprites() {
        let sp1 = this.match3.items[this.match3.selectedItems[0].column][this.match3.selectedItems[0].row].sprite
        let sp2 = this.match3.items[this.match3.selectedItems[1].column][this.match3.selectedItems[1].row].sprite;
        let x1 = sp1.x;
        let y1 = sp1.y;
        let x2 = sp2.x;
        let y2 = sp2.y;
        //animate sprite positions each frame
        sp1.x = x2;
        sp1.y = y2;
        sp2.x = x1;
        sp2.y = y1;
    }
}

class Match3 {
    public items: any[];
    public readonly columns = 8;
    public readonly rows = 8;
    private moves = [];
    private clusters = [];
    private score = 0;
    public selectedItems = [];
    private currentMove = {column1:0,row1:0,column2:0,row2:0};
    private gameStates = {init:0,ready:1,resolve:2};
    private gameState = this.gameStates.init;
    private gameover = false;

    constructor() {
        this.items = [];
        this.clusters = [];
        this.selectedItems = [];
    }

    public GenerateBoard() {
        let done = false;
        while(!done) {
            for (let i = 0; i < this.columns; i++) {
                this.items[i] = [];
                for (let j = 0; j < this.rows; j++) {
                    let type = this.GetRandomItem();
                    this.items[i][j] = new Item(i, j, type, false, null);
                }
            }
            this.ResolveClusters();
            this.FindMoves();

            if(this.moves.length > 0) {
                done = true;
            }
        }
    }

    private GetRandomItem() {
        return Math.floor(Math.random() * 6);
    }

    //#region Item Selection and Swapping
    public GetValidItem(column : number, row : number) {
        if(column < 0 || column >= this.columns || row < 0 || row >= this.rows) {
            return false;
        }
        return true;
    }

    public SelectItem(column : number, row : number) {
        if(this.selectedItems.length === 0) {
            this.selectedItems.push({column:column,row:row});
            return 1;
        }
        else if(this.selectedItems.length === 1) {
            if(this.AreAdjacent(this.selectedItems[0],{column:column,row:row})) {
                this.selectedItems.push({column:column,row:row});
                return 2;
            } else {
                this.selectedItems = [];
                return 0;
            }
        }
    }

    private AreAdjacent(item1: any, item2: { column: number; row: number }) {
        if(item1.column === item2.column) {
            if(item1.row === item2.row - 1 || item1.row === item2.row + 1) {
                return true;
            }
        }
        if(item1.row === item2.row) {
            if(item1.column === item2.column - 1 || item1.column === item2.column + 1) {
                return true;
            }
        }
        return false;
    }

    CanSwapItems() {
        let item1 = this.selectedItems[0];
        let item2 = this.selectedItems[1];
        let item1Type = this.items[item1.column][item1.row].type;
        let item2Type = this.items[item2.column][item2.row].type;
        this.items[item1.column][item1.row].type = item2Type;
        this.items[item2.column][item2.row].type = item1Type;
        this.FindClusters();
        if(this.clusters.length > 0) {
            return true;
        }
        return false;
    }

    ClearSelectedItems() {
        this.selectedItems = [];
    }

    private CanMoveItem(i: number, j: number, number: number) {
        if(number === 0) {
            if(i > 0 && this.items[i - 1][j].type === this.items[i][j].type) {
                return true;
            }
            if(i < this.columns - 1 && this.items[i + 1][j].type === this.items[i][j].type) {
                return true;
            }
        }
        if(number === 1) {
            if(j > 0 && this.items[i][j - 1].type === this.items[i][j].type) {
                return true;
            }
            if(j < this.rows - 1 && this.items[i][j + 1].type === this.items[i][j].type) {
                return true;
            }
        }
        return false;
    }
    //#endregion

    //#region Cluster Shifting
    public ResolveClusters() {
        this.FindClusters();
        while(this.clusters.length > 0) {
            this.ClearClusters();
            this.ShiftTiles();
            this.FindClusters();
        }
    }

    private FindClusters() {
        this.clusters = [];

        // Check for horizontal clusters
        for(let j = 0; j < this.rows; j++) {
            let matchLength = 1;
            for(let i = 0; i < this.columns; i++) {
                let checkCluster = false;
                if(i === this.columns-1) {
                    checkCluster = true;
                } else {
                    if(
                        this.items[i][j].type === this.items[i+1][j].type &&
                        this.items[i][j].type !== -1) {
                        matchLength+=1;
                    } else {
                        checkCluster = true;
                    }
                }
                if(checkCluster) {
                    if(matchLength === 3) {
                        this.clusters.push({
                            column:i+1-matchLength,
                            row:j,
                            length:matchLength,
                            direction:'h'});
                    }
                    if(matchLength === 4){
                        this.clusters.push({
                            column:i+1-matchLength,
                            row:j,
                            length:matchLength,
                            direction:'h'});
                    }
                    if(matchLength === 5){
                        this.clusters.push({
                            column:i+1-matchLength,
                            row:j,
                            length:matchLength,
                            direction:'h'});
                    }
                    matchLength = 1;
                }
            }
        }
        //check for vertical clusters
        for(let i = 0; i < this.columns; i++) {
            let matchLength = 1;
            for(let j = 0; j < this.rows; j++) {
                let checkCluster = false;
                if(j === this.rows-1) {
                    checkCluster = true;
                } else {
                    if(this.items[i][j].type === this.items[i][j + 1].type &&
                        this.items[i][j].type !== -1) {
                        matchLength+=1;
                    } else {
                        checkCluster = true;
                    }
                }
                if(checkCluster) {
                    if(matchLength === 3) {
                        this.clusters.push({column:i,row:j+1-matchLength,length:matchLength,direction:'v'});
                    }
                    if(matchLength === 4) {
                        this.clusters.push({column:i,row:j+1-matchLength,length:matchLength,direction:'v'});
                    }
                    if(matchLength === 5) {
                        this.clusters.push({column:i,row:j+1-matchLength,length:matchLength,direction:'v'});
                    }
                    matchLength = 1;
                }
            }
        }
    }

    private ClearClusters() {
        let that =this;
        this.loopClusters(function(index,column,row,cluster){
            that.items[column][row].type = -1;
        });
        for(let i = 0; i < this.columns; i++) {
            let shift = 0;
            for(let j = this.rows-1; j>=0; j--) {
                if(this.items[i][j].type === -1) {
                   shift++;
                   this.items[i][j].shift = 0;
                } else {
                    this.items[i][j].shift = shift;
                }
            }
        }
    }

    private loopClusters(callback: (index: number, column: number, row: number, cluster: any) => void) {
        for(let i = 0; i < this.clusters.length; i++) {
            let cluster = this.clusters[i];
            let cOffset = 0;
            let rOffset = 0;
            for(let j = 0; j < cluster.length; j++) {
                callback(i,cluster.column + cOffset,cluster.row + rOffset,cluster);
                if(cluster.direction === 'h') {
                    cOffset++;
                } else {
                    rOffset++;
                }
            }
        }
    }

    private ShiftTiles() {
        for(let i = 0; i < this.columns; i++) {
            for(let j = this.rows - 1; j >= 0; j--) {
                if(this.items[i][j].type === -1) {
                    this.items[i][j].type = this.GetRandomItem();
                } else {
                    let shift = this.items[i][j].shift;
                    if(shift > 0) {
                        this.swap(i,j,i,j+shift);
                    }
                }
                this.items[i][j].shift = 0;
            }
        }
    }

    public swap(x1: number, y1: number, x2: number, y2: any) {
        let typeSwap = this.items[x1][y1].type;
        if(x2 < this.columns-1 || y2 > this.rows-1){
            this.items[x1][y1].type = this.items[x2][y2].type;
            this.items[x2][y2].type = typeSwap;
        }
    }

    public FindMoves() {
        this.moves = [];
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns-1; j++) {
                console.log(this.items[i][j]);
                this.swap(i,j,i+1,j);
                this.FindClusters();
                this.swap(i,j,i+1,j);
                if(this.clusters.length > 0) {
                    this.moves.push({column1:i,row1:j,column2:i+1,row2:j});
                }
            }

        }

        for(let i =0; i<this.columns;i++){
            for(let j=0;j<this.rows-1;j++){
                this.swap(i,j,i,j+1);
                this.FindClusters();
                this.swap(i,j,i,j+1);
                if(this.clusters.length > 0) {
                    this.moves.push({column1:i,row1:j,column2:i,row2:j+1});
                }
            }
        }

       this.clusters = [];
    }
    //#endregion
}
class Item {
    column : number;
    row : number;
    type : number;
    shift : number;
    sprite : Sprite;

    constructor(column : number, row : number, type : number, empty : boolean, sprite : Sprite) {
        this.column = column;
        this.row = row;
        this.type = type;
        this.sprite = sprite;
        this.shift = 0;
    }
}