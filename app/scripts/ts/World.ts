///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />

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
            this.update();
            this.stage.update();
        });
    }

    init():void {
        console.log('world:init enter');

        super.init();
        console.log('world:init exit');
    }

    loadContent(stage:createjs.Stage) {
        console.log('world:loadContent enter')

        var asset = this.loadQueue.getResult('bgimg');
        this.bgimg = new createjs.Bitmap(asset);

        stage.addChild(this.bgimg);

        super.loadContent(stage);
        console.log('world:loadContent exit')
    }

    preload(callback: () => void):void {
        console.log('world:preload enter');
        this.loadQueue = new createjs.LoadQueue();
        this.loadQueue.on('complete', callback, this);
        this.loadQueue.loadFile({id:'bgimg', src:'images/bg-start.png' });
        console.log('world:preload exit');
    }
}
