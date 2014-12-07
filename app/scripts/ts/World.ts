///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../app.d.ts" />

class World extends GameObjectContainer {
    level:number;
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

        this.pushObject(new Vehicle(40, 22, 'blue', 0, 10))
        this.pushObject(new Vehicle(40, 22, 'red', 90, 15))
        this.pushObject(new Vehicle(40, 22, 'purple', 180, 20))
        this.pushObject(new Vehicle(40, 22, 'yellow', 270, 25))

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

        this.bgimg = new createjs.Bitmap(this.lib.getImage('bgimg'));
        this.bgimg.x = 140;

        stage.addChild(this.bgimg);

        super.loadContent(stage, lib);
        console.log('world:loadContent exit')
    }

    update(event:createjs.TickerEvent):void {
        super.update(event);
        this.stage.update();
    }
}
