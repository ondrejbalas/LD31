

class GameObjectContainer implements IGameObject {
    gameObjects:IGameObject[] = [];

    pushObject(obj:IGameObject):void {
        this.gameObjects.push(obj);
    }

    init():void {
        for (var i = 0; i < this.gameObjects.length; i++) {
          var obj = this.gameObjects[i];
            obj.init();
        }
    }

    loadContent(stage:createjs.Stage) : void {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.loadContent(stage);
        }
    }

    update():void {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.update();
        }
    }

    unloadContent(stage:createjs.Stage) : void {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.unloadContent(stage);
        }
    }
}
