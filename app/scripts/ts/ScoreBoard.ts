class ScoreBoard implements IGameObject {
    bg:createjs.Bitmap;

    init():void {
    }

    preload():IAssetPath[] {
        return [{id: 'scorebg', src: 'scoreboard-bg.png'}];
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        this.bg = new createjs.Bitmap(lib.getImage('scorebg'));

        stage.addChild(this.bg);
    }

    update(event:createjs.TickerEvent):void {
    }

    unloadContent(stage:createjs.Stage):void {
    }

}
