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
        let done = false;

        //while(!done) {
        this.match3.GenerateBoard();
        this.DrawBoard();
            //this.ResolveClusters();
            //this.FindMoves();

            /*if(this.moves.length > 0) {
                done = true;
            }*/
        //}
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
                    this.match3.SwapItems();
                    this.SwapSprites();
                    this.match3.ClearSelectedItems();
                    this.RemoveObject('selected1');
                    this.RemoveObject('selected2');
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
    private currentMove = {column:0,row:0,direction:0};
    private gameStates = {init:0,ready:1,resolve:2};
    private gameState = this.gameStates.init;
    private gameover = false;

    constructor() {
        this.items = [];
        this.selectedItems = [];
    }

    public GenerateBoard() {
        for (let i = 0; i < this.columns; i++) {
            this.items[i] = [];
            for (let j = 0; j < this.rows; j++) {
                let type = Math.floor(Math.random() * 6);
                this.items[i][j] = new Item(i, j, type, false, null);
            }
        }
    }

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
        let clusters = this.FindClusters();
        if(clusters.length > 0) {
            return true;
        }
        return false;
    }

    SwapItems() {
        let item1 = this.selectedItems[0];
        let item2 = this.selectedItems[1];
        let item1Type = this.items[item1.column][item1.row].type;
        let item2Type = this.items[item2.column][item2.row].type;
        this.items[item1.column][item1.row].type = item2Type;
        this.items[item2.column][item2.row].type = item1Type;
    }

    private FindClusters() {
        let clusters = [];
        for(let i = 0; i < this.columns; i++) {
            for(let j = 0; j < this.rows; j++) {
                let type = this.items[i][j].type;
                let horizontalCluster = this.FindHorizontalCluster(i,j,type);
                if(horizontalCluster.length >= 3) {
                    clusters.push(horizontalCluster);
                }
                let verticalCluster = this.FindVerticalCluster(i,j,type);
                if(verticalCluster.length >= 3) {
                    clusters.push(verticalCluster);
                }
            }
        }
        return clusters;
    }

    private FindHorizontalCluster(i: number, j: number, type: any) {
        let cluster = [];
        let left = i;
        let right = i;
        while(left > 0 && this.items[left - 1][j].type === type) {
            left--;
        }
        while(right < this.columns - 1 && this.items[right + 1][j].type === type) {
            right++;
        }
        for(let k = left; k <= right; k++) {
            cluster.push({column:k,row:j});
        }
        return cluster;
    }

    private FindVerticalCluster(i: number, j: number, type: any) {
        let cluster = [];
        let top = j;
        let bottom = j;
        while(top > 0 && this.items[i][top - 1].type === type) {
            top--;
        }
        while(bottom < this.rows - 1 && this.items[i][bottom + 1].type === type) {
            bottom++;
        }
        for(let k = top; k <= bottom; k++) {
            cluster.push({column:i,row:k});
        }
        return cluster;
    }

    ClearSelectedItems() {
        this.selectedItems = [];
    }
}
class Item {
    column : number;
    row : number;
    type : number;
    empty : boolean;
    sprite : Sprite;

    constructor(column : number, row : number, type : number, empty : boolean, sprite : Sprite) {
        this.column = column;
        this.row = row;
        this.type = type;
        this.empty = true;
        this.sprite = sprite;
    }
}