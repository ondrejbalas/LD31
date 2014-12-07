///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../../../typings/underscore/underscore.d.ts" />
var AssetLibrary = (function () {
    function AssetLibrary(basePath) {
        this.basePath = basePath;
    }
    AssetLibrary.prototype.getImage = function (id) {
        return this.loadQueue.getResult(id);
    };
    AssetLibrary.prototype.add = function (asset) {
        console.log('asset requested: ' + asset.id);
    };
    AssetLibrary.prototype.addAll = function (assets) {
        var _this = this;
        _.each(assets, function (asset) {
            _this.add(asset);
        });
    };
    AssetLibrary.prototype.preload = function (callback) {
        console.log('assetLibrary:preload enter');
        this.loadQueue = new createjs.LoadQueue();
        this.loadQueue.on('complete', callback, this);
        //this.loadQueue.loadFile({id:'bgimg', src:'images/map-bg.png' });
        this.loadQueue.loadManifest([
            { id: 'bgimg', src: 'images/map-bg.png' },
            { id: 'scorebg', src: 'images/scoreboard-bg.png' }
        ]);
        console.log('assetLibrary:preload exit');
    };
    return AssetLibrary;
})();
///<reference path="../../../typings/easeljs/easeljs.d.ts" />
var GameObjectContainer = (function () {
    function GameObjectContainer() {
        this.gameObjects = [];
    }
    GameObjectContainer.prototype.pushObject = function (obj) {
        this.gameObjects.push(obj);
    };
    GameObjectContainer.prototype.init = function () {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.init();
        }
    };
    GameObjectContainer.prototype.preload = function () {
        var ret = [];
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            var arr = obj.preload();
            for (var j = 0; j < arr.length; j++) {
                ret.push(arr[j]);
            }
        }
        return ret;
    };
    GameObjectContainer.prototype.loadContent = function (stage, lib) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.loadContent(stage, lib);
        }
    };
    GameObjectContainer.prototype.update = function (event) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.update(event);
        }
    };
    GameObjectContainer.prototype.unloadContent = function (stage) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.unloadContent(stage);
        }
    };
    return GameObjectContainer;
})();
var Helpers = (function () {
    function Helpers() {
    }
    return Helpers;
})();
var IAssetPath = (function () {
    function IAssetPath() {
    }
    return IAssetPath;
})();
///<reference path="../../../typings/easeljs/easeljs.d.ts" />
var ScoreBoard = (function () {
    function ScoreBoard() {
    }
    ScoreBoard.prototype.init = function () {
    };
    ScoreBoard.prototype.preload = function () {
        return [{ id: 'scorebg', src: 'scoreboard-bg.png' }];
    };
    ScoreBoard.prototype.loadContent = function (stage, lib) {
    };
    ScoreBoard.prototype.update = function (event) {
    };
    ScoreBoard.prototype.unloadContent = function (stage) {
    };
    return ScoreBoard;
})();
var Vehicle = (function () {
    function Vehicle(length, width, color, heading, speed) {
        this.length = length;
        this.width = width;
        this.color = color;
        this.heading = heading;
        this.speed = speed;
    }
    Vehicle.prototype.init = function () {
        this.x = Math.floor(100 + Math.random() * 500);
        this.y = Math.floor(100 + Math.random() * 300);
        //this.heading = Math.floor(Math.random() * 360);
        //this.speed = 5 + Math.floor(Math.random() * 5);
    };
    Vehicle.prototype.preload = function () {
        return [];
    };
    Vehicle.prototype.loadContent = function (stage, lib) {
        this.rect = new createjs.Shape();
        //this.rect.regX = Math.floor(this.width / 2);
        //this.rect.regY = Math.floor(this.length / 2);
        this.rect.graphics.beginFill(this.color).drawRect(0, 0, this.width, this.length).setStrokeStyle(3).beginStroke('#000');
        stage.addChild(this.rect);
    };
    Vehicle.prototype.update = function (event) {
        var xVelocity = Math.sin(this.heading * (Math.PI / 180)) * (this.speed * event.delta / 1000);
        this.x += xVelocity;
        var yVelocity = Math.cos(this.heading * (Math.PI / 180)) * (this.speed * event.delta / 1000);
        this.y -= yVelocity;
        this.rect.x = Math.floor(this.x);
        this.rect.y = Math.floor(this.y);
        this.rect.rotation = this.heading;
    };
    Vehicle.prototype.unloadContent = function (stage) {
    };
    return Vehicle;
})();
///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../app.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var World = (function (_super) {
    __extends(World, _super);
    function World(stage) {
        _super.call(this);
        this.stage = stage;
        this.lib = new AssetLibrary('images/');
        this.level = 1;
        console.log('starting world at level ' + this.level);
    }
    World.prototype.start = function () {
        var _this = this;
        //this.preload(() => { this.init(); });
        //this.preload(this.init);
        this.init();
        this.lib.addAll(this.preload());
        this.lib.preload(function () {
            _this.loadContent(_this.stage, _this.lib);
            createjs.Ticker.addEventListener('tick', window.helpers.globaltick);
        });
    };
    World.prototype.init = function () {
        console.log('world:init enter');
        createjs.Ticker.setFPS(60);
        this.pushObject(new Vehicle(40, 22, 'blue', 0, 10));
        this.pushObject(new Vehicle(40, 22, 'red', 90, 15));
        this.pushObject(new Vehicle(40, 22, 'purple', 180, 20));
        this.pushObject(new Vehicle(40, 22, 'yellow', 270, 25));
        _super.prototype.init.call(this);
        console.log('world:init exit');
    };
    World.prototype.preload = function () {
        var paths = _super.prototype.preload.call(this);
        paths.push({ id: 'bgimg', src: 'map-bg.png' });
        return paths;
    };
    World.prototype.loadContent = function (stage, lib) {
        console.log('world:loadContent enter');
        this.bgimg = new createjs.Bitmap(this.lib.getImage('bgimg'));
        this.bgimg.x = 140;
        stage.addChild(this.bgimg);
        _super.prototype.loadContent.call(this, stage, lib);
        console.log('world:loadContent exit');
    };
    World.prototype.update = function (event) {
        _super.prototype.update.call(this, event);
        this.stage.update();
    };
    return World;
})(GameObjectContainer);
//# sourceMappingURL=output.js.map