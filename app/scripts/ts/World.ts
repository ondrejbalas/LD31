///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../app.d.ts" />

class World extends GameObjectContainer {
    level:number;
    bgimg:createjs.Bitmap;

    loadQueue:createjs.LoadQueue;

    constructor(public stage:createjs.Stage) {
        super();
        this.level = 1;
        console.log('starting world at level ' + this.level)
    }

    start():void {
        //this.preload(() => { this.init(); });
        //this.preload(this.init);
        this.init();
        this.preload(() => {
            this.loadContent(this.stage);
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

    loadContent(stage:createjs.Stage):void {
        console.log('world:loadContent enter')

        var asset = <HTMLImageElement> this.loadQueue.getResult('bgimg');
        this.bgimg = new createjs.Bitmap(asset);

        stage.addChild(this.bgimg);

        super.loadContent(stage);
        console.log('world:loadContent exit')
    }

    update(event:createjs.TickerEvent):void {
        super.update(event);
        this.stage.update();
    }

    preload(callback: () => void):void {
        console.log('world:preload enter');
        this.loadQueue = new createjs.LoadQueue();
        this.loadQueue.on('complete', callback, this);
        this.loadQueue.loadFile({id:'bgimg', src:'images/bg-start.png' });
        console.log('world:preload exit');
    }
}
