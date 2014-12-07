class BgMap implements IGameObject {
    bg:createjs.Bitmap;

    init():void {
    }

    preload():IAssetPath[] {
        return [{id: 'mapbg', src: 'map-bg.png'}];
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        this.bg = new createjs.Bitmap(lib.getImage('mapbg'));
        this.bg.x = 120;

        stage.addChild(this.bg);
    }

    update(event:createjs.TickerEvent):void {
    }

    unloadContent(stage:createjs.Stage):void {
    }

}
