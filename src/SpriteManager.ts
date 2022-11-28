export default class SpriteManager {
    public loadCount : number;
    public loadTotal : number;
    public preloaded : boolean;
    public images : any = [];
    public assetList : any = [];

    AddSprites(imageFile) {
        this.assetList.push(imageFile);
    }

    LoadSprites() {
        this.loadCount = 0;
        this.loadTotal = this.assetList.length;
        this.preloaded = false;

        let loadedImages = [];

        for(let i=0; i < this.assetList.length; i++){
            let image = new Image();

            let that = this;
            image.onload = function () {that.OnLoadedSprites()};

            image.src = this.assetList[i];

            loadedImages[i] = image;
        }

        this.images = loadedImages;
    }

    OnLoadedSprites(){
        this.loadCount++;
        if(this.loadCount === this.loadTotal){
            this.preloaded = true;
        }
    }
}