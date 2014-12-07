///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../app.d.ts" />

class World extends GameObjectContainer {
    level:number;
    scoreboard:ScoreBoard;
    grid:GridOverlay;
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

        this.scoreboard = new ScoreBoard();
        this.grid = new GridOverlay('#999', 32, 1024, 640, 120, 0);

        this.pushObject(new Vehicle(28, 12, 'blue', 0, 20, 10, 17))
        this.pushObject(new Vehicle(28, 12, 'red', 90, 25, 10, 1))
        this.pushObject(new Vehicle(28, 12, 'purple', 180, 30, 2, 5))
        this.pushObject(new Vehicle(28, 12, 'yellow', 270, 35, 29, 1))

        this.pushObject(this.scoreboard);
        this.pushObject(this.grid);

        super.init();
        console.log('world:init exit');
    }

    preload():IAssetPath[] {
        var paths = super.preload();
        paths.push({id: 'bgimg', src: 'map-bg.png'});
        return paths;
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        console.log('world:loadContent enter')

        this.bgimg = new createjs.Bitmap(lib.getImage('bgimg'));
        this.bgimg.x = 120;

        stage.addChild(this.bgimg);

        super.loadContent(stage, lib);
        console.log('world:loadContent exit')
    }

    update(event:createjs.TickerEvent):void {
        super.update(event);
        this.stage.update();
    }
}
