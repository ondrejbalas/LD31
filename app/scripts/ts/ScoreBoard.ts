class ScoreBoard implements IGameObject {
    bg:createjs.Shape;

    init():void {
    }

    preload():IAssetPath[] {
        return [{id: 'scorebg', src: 'scoreboard-bg.png'}];
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
    }

    update(event:createjs.TickerEvent):void {
    }

    unloadContent(stage:createjs.Stage):void {
    }

}
