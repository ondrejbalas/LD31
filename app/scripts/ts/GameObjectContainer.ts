///<reference path="../../../typings/easeljs/easeljs.d.ts" />

class GameObjectContainer implements IGameObject {
gameObjects:IGameObject[] = [];

    pushObject(obj:IGameObject):void {
        if(this.gameObjects === undefined) debugger;
        this.gameObjects.push(obj);
    }

    init():void {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.init();
        }
    }

    preload():IAssetPath[] {
        var ret = [];
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            var arr = obj.preload();
            for (var j = 0; j < arr.length; j++) {
                ret.push(arr[j]);
            }
        }
        return ret;
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.loadContent(stage, lib);
        }
    }

    update(event:createjs.TickerEvent):void {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
                obj.update(event);
        }
    }

    unloadContent(stage:createjs.Stage):void {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.unloadContent(stage);
        }
    }
}
