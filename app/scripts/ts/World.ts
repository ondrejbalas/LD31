///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../app.d.ts" />

class World extends GameObjectContainer {
    level:number;
    scoreboard:ScoreBoard;
    map:BgMap;
    grid:GridOverlay;
    factory:VehicleFactory;
    bgimg:createjs.Bitmap;

    lib:AssetLibrary = new AssetLibrary('images/');

    constructor(public stage:createjs.Stage) {
        super();
        this.level = 1;
        console.log('starting world at level ' + this.level)
    }

    start():void {
        //this.preload(() => { this.init(); });
        //this.preload(this.init);
        this.init();
        this.lib.addAll(this.preload());
        this.lib.preload(() => {
            this.loadContent(this.stage, this.lib);
            createjs.Ticker.addEventListener('tick', window.helpers.globaltick);
        });
    }

    init():void {
        console.log('world:init enter');
        createjs.Ticker.setFPS(60);

        this.map = new BgMap(false, new Map1());
        window.squareSize = () => {
            return this.map.currentSquareSize();
        }

        this.scoreboard = new ScoreBoard();
        this.factory = new VehicleFactory(this.map.mapData, 500);
        this.grid = new GridOverlay('#999', this.map.currentSquareSize(), 1024, 640, 120, 0);

        this.pushObject(this.map);
        this.pushObject(this.factory);
        //this.pushObject(new Vehicle(28, 12, 'blue', 0, 100, 10, 4, this.map))
        //this.pushObject(new Vehicle(28, 12, 'red', 180, 100, 10, 2, this.map))
        //this.pushObject(new Vehicle(28, 12, 'purple', 180, 4, 2, 5, this.map))
        //this.pushObject(new Vehicle(28, 12, 'yellow', 270, 4, 29, 1, this.map))

        this.pushObject(this.scoreboard);
        //this.pushObject(this.grid);

        super.init();
        console.log('world:init exit');
    }

    preload():IAssetPath[] {
        var paths = super.preload();
        return paths;
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        super.loadContent(stage, lib);
    }

    update(event:createjs.TickerEvent):void {
        super.update(event);
        this.stage.update();
    }
}
