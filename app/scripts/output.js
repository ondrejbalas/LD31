var GameObjectContainer = (function () {
    function GameObjectContainer() {
        this.gameObjects = [];
    }
    GameObjectContainer.prototype.pushObjects = function (obj) {
        this.gameObjects.push(obj);
    };
    GameObjectContainer.prototype.init = function () {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.init();
        }
    };
    GameObjectContainer.prototype.loadContent = function (stage) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.loadContent(stage);
        }
    };
    GameObjectContainer.prototype.update = function () {
        for (var i = 0; i < this.gameObjects.length; i++) {
            var obj = this.gameObjects[i];
            obj.update();
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
///<reference path="../../../typings/easeljs/easeljs.d.ts" />
var Intersection = (function () {
    function Intersection() {
    }
    Intersection.prototype.init = function () {
    };
    Intersection.prototype.loadContent = function (stage) {
    };
    Intersection.prototype.update = function () {
    };
    Intersection.prototype.unloadContent = function (stage) {
    };
    return Intersection;
})();
var TrafficLight = (function () {
    function TrafficLight() {
    }
    TrafficLight.prototype.init = function () {
    };
    TrafficLight.prototype.loadContent = function (stage) {
    };
    TrafficLight.prototype.update = function () {
    };
    TrafficLight.prototype.unloadContent = function (stage) {
    };
    return TrafficLight;
})();
var Vehicle = (function () {
    function Vehicle() {
    }
    Vehicle.prototype.init = function () {
    };
    Vehicle.prototype.loadContent = function (stage) {
    };
    Vehicle.prototype.update = function () {
    };
    Vehicle.prototype.unloadContent = function (stage) {
    };
    return Vehicle;
})();
///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />
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
        this.level = 1;
        console.log('starting world at level ' + this.level);
    }
    World.prototype.start = function () {
        var _this = this;
        //this.preload(() => { this.init(); });
        //this.preload(this.init);
        this.init();
        this.preload(function () {
            _this.loadContent(_this.stage);
            _this.update();
            _this.stage.update();
        });
    };
    World.prototype.init = function () {
        console.log('world:init enter');
        _super.prototype.init.call(this);
        console.log('world:init exit');
    };
    World.prototype.loadContent = function (stage) {
        console.log('world:loadContent enter');
        var asset = this.loadQueue.getResult('bgimg');
        this.bgimg = new createjs.Bitmap(asset);
        stage.addChild(this.bgimg);
        _super.prototype.loadContent.call(this, stage);
        console.log('world:loadContent exit');
    };
    World.prototype.preload = function (callback) {
        console.log('world:preload enter');
        this.loadQueue = new createjs.LoadQueue();
        this.loadQueue.on('complete', callback, this);
        this.loadQueue.loadFile({ id: 'bgimg', src: 'images/bg-start.png' });
        console.log('world:preload exit');
    };
    return World;
})(GameObjectContainer);
//# sourceMappingURL=output.js.map