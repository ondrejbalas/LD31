///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../../../typings/underscore/underscore.d.ts" />
var AssetLibrary = (function () {
    function AssetLibrary(basePath) {
        this.basePath = basePath;
        this.requestedAssets = [];
    }
    AssetLibrary.prototype.getImage = function (id) {
        return this.loadQueue.getResult(id);
    };
    AssetLibrary.prototype.add = function (asset) {
        console.log('asset requested: ' + asset.id);
        this.requestedAssets.push(asset);
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
        this.loadQueue.loadManifest(this.requestedAssets, true, 'images/');
        console.log('assetLibrary:preload exit');
    };
    return AssetLibrary;
})();
var BgMap = (function () {
    function BgMap(drawValidSquares) {
        var _this = this;
        this.drawValidSquares = drawValidSquares;
        this.squares = [[]];
        this.validSquares = [
            { x: 2, y: 5 },
            { x: 3, y: 5 },
            { x: 4, y: 5 },
            { x: 5, y: 5 },
            { x: 6, y: 5 },
            { x: 7, y: 5 },
            { x: 8, y: 5 },
            { x: 9, y: 5 },
            { x: 10, y: 5 },
            { x: 11, y: 5 },
            { x: 12, y: 5 },
            { x: 13, y: 5 },
            { x: 14, y: 5 },
            { x: 15, y: 5 },
            { x: 16, y: 5 },
            { x: 2, y: 6 },
            { x: 2, y: 7 },
            { x: 2, y: 8 },
            { x: 2, y: 9 },
            { x: 2, y: 10 },
            { x: 2, y: 11 },
            { x: 2, y: 12 },
            { x: 2, y: 13 },
            { x: 2, y: 14 },
            { x: 2, y: 15 },
            { x: 2, y: 16 },
            { x: 2, y: 17 },
            { x: 3, y: 17 },
            { x: 4, y: 17 },
            { x: 5, y: 17 },
            { x: 6, y: 17 },
            { x: 7, y: 17 },
            { x: 8, y: 17 },
            { x: 9, y: 17 },
            { x: 10, y: 17 },
            { x: 10, y: 16 },
            { x: 10, y: 15 },
            { x: 10, y: 14 },
            { x: 10, y: 13 },
            { x: 10, y: 12 },
            { x: 10, y: 11 },
            { x: 10, y: 10 },
            { x: 10, y: 9 },
            { x: 10, y: 8 },
            { x: 10, y: 7 },
            { x: 10, y: 6 },
            { x: 10, y: 4 },
            { x: 10, y: 3 },
            { x: 10, y: 2 },
            { x: 10, y: 1 },
            { x: 11, y: 1 },
            { x: 12, y: 1 },
            { x: 13, y: 1 },
            { x: 14, y: 1 },
            { x: 15, y: 1 },
            { x: 16, y: 1 },
            { x: 17, y: 1 },
            { x: 18, y: 1 },
            { x: 19, y: 1 },
            { x: 20, y: 1 },
            { x: 21, y: 1 },
            { x: 22, y: 1 },
            { x: 23, y: 1 },
            { x: 24, y: 1 },
            { x: 25, y: 1 },
            { x: 26, y: 1 },
            { x: 27, y: 1 },
            { x: 28, y: 1 },
            { x: 29, y: 1 },
            { x: 29, y: 2 },
            { x: 29, y: 3 },
            { x: 29, y: 4 },
            { x: 29, y: 5 },
            { x: 29, y: 6 },
            { x: 29, y: 7 },
            { x: 28, y: 7 },
            { x: 27, y: 7 },
            { x: 26, y: 7 },
            { x: 25, y: 7 },
            { x: 24, y: 7 },
            { x: 23, y: 7 },
            { x: 22, y: 7 },
            { x: 22, y: 8 },
            { x: 22, y: 9 },
            { x: 22, y: 10 },
            { x: 22, y: 11 },
            { x: 22, y: 12 },
            { x: 22, y: 13 },
            { x: 22, y: 14 },
            { x: 22, y: 15 },
            { x: 22, y: 16 },
            { x: 22, y: 17 },
            { x: 23, y: 17 },
            { x: 24, y: 17 },
            { x: 25, y: 17 },
            { x: 26, y: 17 },
            { x: 27, y: 17 },
            { x: 28, y: 17 },
            { x: 29, y: 17 },
            { x: 29, y: 16 },
            { x: 29, y: 15 },
            { x: 29, y: 14 },
            { x: 29, y: 13 },
            { x: 29, y: 12 },
            { x: 29, y: 11 },
            { x: 28, y: 11 },
            { x: 27, y: 11 },
            { x: 26, y: 11 },
            { x: 25, y: 11 },
            { x: 24, y: 11 },
            { x: 23, y: 11 },
            { x: 21, y: 11 },
            { x: 20, y: 11 },
            { x: 19, y: 11 },
            { x: 18, y: 11 },
            { x: 17, y: 11 },
            { x: 16, y: 11 },
            { x: 16, y: 10 },
            { x: 16, y: 9 },
            { x: 16, y: 8 },
            { x: 16, y: 7 },
            { x: 16, y: 6 }
        ];
        for (var x = 0; x < 32; x++) {
            this.squares[x] = [];
            for (var y = 0; y < 24; y++) {
                this.squares[x][y] = 0;
            }
        }
        _.each(this.validSquares, function (sq) {
            _this.squares[sq.x][sq.y] = 1;
        });
    }
    BgMap.prototype.init = function () {
    };
    BgMap.prototype.preload = function () {
        return [{ id: 'mapbg', src: 'map-bg.png' }];
    };
    BgMap.prototype.loadContent = function (stage, lib) {
        this.bg = new createjs.Bitmap(lib.getImage('mapbg'));
        this.bg.x = 120;
        stage.addChild(this.bg);
        if (this.drawValidSquares) {
            var shape = new createjs.Shape();
            shape.x = 120;
            shape.graphics.beginFill('#FF0000');
            _.each(this.validSquares, function (sq) {
                shape.graphics.drawRect(4 + sq.x * 32, 4 + sq.y * 32, 24, 24);
                console.log('drawing rect at [' + sq.x + ',' + sq.y + '] with dimensions 24x24');
            });
            stage.addChild(shape);
        }
    };
    BgMap.prototype.update = function (event) {
    };
    BgMap.prototype.unloadContent = function (stage) {
    };
    return BgMap;
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
var GridOverlay = (function () {
    function GridOverlay(color, squareSize, width, height, offsetX, offsetY) {
        this.color = color;
        this.squareSize = squareSize;
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
    GridOverlay.prototype.init = function () {
    };
    GridOverlay.prototype.preload = function () {
        return [];
    };
    GridOverlay.prototype.loadContent = function (stage, lib) {
        this.grid = new createjs.Shape();
        this.grid.x = this.offsetX;
        this.grid.y = this.offsetY;
        var g = this.grid.graphics;
        g.setStrokeStyle(1).beginStroke(this.color);
        for (var x = this.squareSize; x < this.width; x += this.squareSize) {
            g.mt(x, 0);
            g.lt(x, this.height);
        }
        for (var y = this.squareSize; y < this.height; y += this.squareSize) {
            g.mt(0, y);
            g.lt(this.width, y);
        }
        this.grid.graphics.endStroke();
        stage.addChild(this.grid);
    };
    GridOverlay.prototype.update = function (event) {
    };
    GridOverlay.prototype.unloadContent = function (stage) {
    };
    return GridOverlay;
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
        this.bg = new createjs.Bitmap(lib.getImage('scorebg'));
        stage.addChild(this.bg);
    };
    ScoreBoard.prototype.update = function (event) {
    };
    ScoreBoard.prototype.unloadContent = function (stage) {
    };
    return ScoreBoard;
})();
var VehicleStates;
(function (VehicleStates) {
    VehicleStates[VehicleStates["MovingForward"] = 1] = "MovingForward";
    VehicleStates[VehicleStates["TurningLeft"] = 2] = "TurningLeft";
    VehicleStates[VehicleStates["TurningRight"] = 3] = "TurningRight";
    VehicleStates[VehicleStates["WaitingAtIntersection"] = 4] = "WaitingAtIntersection";
})(VehicleStates || (VehicleStates = {}));
;
var Vehicle = (function () {
    function Vehicle(length, width, color, heading, speed, startX, startY, mapData) {
        this.length = length;
        this.width = width;
        this.color = color;
        this.heading = heading;
        this.speed = speed;
        this.startX = startX;
        this.startY = startY;
        this.mapData = mapData;
        this.x = 16 + startX * 32;
        this.y = 16 + startY * 32;
        this.state = 1 /* MovingForward */;
        this.desiredHeading = heading;
    }
    Vehicle.prototype.init = function () {
        //this.x = Math.floor(100 + Math.random() * 500);
        //this.y = Math.floor(100 + Math.random() * 300);
        //this.heading = Math.floor(Math.random() * 360);
        //this.speed = 5 + Math.floor(Math.random() * 5);
    };
    Vehicle.prototype.preload = function () {
        return [];
    };
    Vehicle.prototype.loadContent = function (stage, lib) {
        this.rect = new createjs.Shape();
        this.rect.regX = Math.floor(this.width / 2);
        this.rect.regY = Math.floor(this.length / 2);
        this.rect.graphics.beginFill(this.color).drawRect(0, 0, this.width, this.length);
        this.highlight = new createjs.Shape();
        this.highlight.graphics.beginFill('yellow').drawRect(8, 8, 16, 16);
        stage.addChild(this.rect);
        stage.addChild(this.highlight);
    };
    Vehicle.prototype.turnTowardsHeading = function (heading, desiredHeading, maxAbsTurnAngle, turnDirection) {
        var tempDesired = desiredHeading;
        if (desiredHeading < heading && turnDirection > 0) {
            tempDesired = desiredHeading + 360;
        }
        if (desiredHeading > heading && turnDirection < 0) {
            tempDesired = desiredHeading - 360;
        }
        var turnAmount;
        if (turnDirection > 0) {
            turnAmount = Math.min(tempDesired, heading + maxAbsTurnAngle);
        }
        if (turnDirection < 0) {
            turnAmount = Math.max(tempDesired, heading - maxAbsTurnAngle);
        }
        if (isNaN(turnAmount))
            debugger;
        turnAmount = turnAmount % 360;
        if (isNaN(turnAmount))
            debugger;
        return turnAmount;
    };
    Vehicle.prototype.decideNextAction = function (oldSqX, oldSqY, newSqX, newSqY) {
        // vehicle is entering a new square. figure out what it should be doing next.
        console.log('was in (' + oldSqX + ',' + oldSqY + ') and now in (' + newSqX + ',' + newSqY + ')');
        var sqValidS = this.desiredHeading === 0 ? 0 : this.mapData.squares[newSqX][newSqY + 1];
        var sqValidW = this.desiredHeading === 90 ? 0 : this.mapData.squares[newSqX - 1][newSqY];
        var sqValidN = this.desiredHeading === 180 ? 0 : this.mapData.squares[newSqX][newSqY - 1];
        var sqValidE = this.desiredHeading === 270 ? 0 : this.mapData.squares[newSqX + 1][newSqY];
        if ((this.desiredHeading === 0 && sqValidN) || (this.desiredHeading === 90 && sqValidE) || (this.desiredHeading === 180 && sqValidS) || (this.desiredHeading === 270 && sqValidW)) {
            // Going straight
            console.log('going straight!');
            this.state = 1 /* MovingForward */;
        }
        else {
            // We have to turn, are we turning left or right?
            var wasHeading = this.desiredHeading;
            if (this.desiredHeading === 0 && sqValidE)
                this.desiredHeading = 90;
            if (this.desiredHeading === 0 && sqValidW)
                this.desiredHeading = 270;
            if (this.desiredHeading === 90 && sqValidN)
                this.desiredHeading = 0;
            if (this.desiredHeading === 90 && sqValidS)
                this.desiredHeading = 180;
            if (this.desiredHeading === 180 && sqValidE)
                this.desiredHeading = 90;
            if (this.desiredHeading === 180 && sqValidW)
                this.desiredHeading = 270;
            if (this.desiredHeading === 270 && sqValidN)
                this.desiredHeading = 0;
            if (this.desiredHeading === 270 && sqValidS)
                this.desiredHeading = 180;
            if (wasHeading + 90 === this.desiredHeading || wasHeading === 270 && this.desiredHeading === 0) {
                this.state = 3 /* TurningRight */;
                console.log('turning right!');
            }
            else {
                console.log('turning left');
                this.state = 2 /* TurningLeft */;
            }
        }
    };
    Vehicle.prototype.update = function (event) {
        // remember where i was last tick
        var oldX = this.x;
        var oldY = this.y;
        // figure out velocity based on heading. cap it at 4 pixels of movement since last frame
        var xVelocity = Math.min(4, Math.sin(this.heading * (Math.PI / 180)) * (this.speed * event.delta / 1000));
        var yVelocity = -Math.min(4, Math.cos(this.heading * (Math.PI / 180)) * (this.speed * event.delta / 1000));
        var generalVelocity = (this.speed * event.delta / 1000);
        // Adjust new position based on velocity
        var newX = oldX + xVelocity;
        var newY = oldY + yVelocity;
        // Figure out old square and new square
        var oldSqX = Math.floor(oldX / 32);
        var oldSqY = Math.floor(oldY / 32);
        var newSqX = Math.floor(newX / 32);
        var newSqY = Math.floor(newY / 32);
        // set some vars that I'll need later
        var enteredNewSquare = oldSqX !== newSqX || oldSqY !== newSqY;
        var headingEorW = function (heading) {
            return heading === 90 || heading === 270;
        };
        var headingNorS = function (heading) {
            return heading === 0 || heading === 180;
        };
        switch (this.state) {
            case 1 /* MovingForward */:
                {
                    // in case something got screwed up (dropped frames, etc) set heading to desiredHeading;
                    if (this.heading !== this.desiredHeading)
                        console.log('heading issue. was ' + this.heading + ' should be ' + this.desiredHeading);
                    this.heading = this.desiredHeading;
                    // if not in my lane, move towards the optimal position for my heading
                    if (headingEorW(this.heading)) {
                        var optimalY = 0;
                        if (this.heading === 90)
                            optimalY = 24 + (newSqY * 32);
                        if (this.heading === 270)
                            optimalY = 8 + (newSqY * 32);
                        if (newY !== optimalY)
                            console.log('Making Y adjustment');
                        if (newY < optimalY)
                            newY = newY + Math.min(generalVelocity, optimalY - newY);
                        if (newY > optimalY)
                            newY = newY - Math.min(generalVelocity, newY - optimalY);
                    }
                    if (headingNorS(this.heading)) {
                        var optimalX;
                        if (this.heading === 0)
                            optimalX = 24 + (newSqX * 32);
                        if (this.heading === 180)
                            optimalX = 8 + (newSqX * 32);
                        if (newX !== optimalX)
                            console.log('Making X adjustment');
                        if (newX < optimalX)
                            newX = newX + Math.min(generalVelocity, optimalX - newX);
                        if (newX > optimalX)
                            newX = newX - Math.min(generalVelocity, newX - optimalX);
                    }
                    break;
                }
            case 3 /* TurningRight */:
                {
                    this.heading = this.turnTowardsHeading(this.heading, this.desiredHeading, 6 * this.speed * (event.delta / 1000), 1);
                    break;
                }
            case 2 /* TurningLeft */:
                {
                    this.heading = this.turnTowardsHeading(this.heading, this.desiredHeading, 6 * this.speed * (event.delta / 1000), -1);
                    break;
                }
        }
        //
        //
        //
        //
        //
        //if(this.desiredHeading === 0) newY = oldY - velocity;
        //if(this.desiredHeading === 90) newX = oldX + velocity;
        //if(this.desiredHeading === 180) newY = oldY + velocity;
        //if(this.desiredHeading === 270) newX = oldX - velocity;
        //
        //
        //
        //var farEnoughIntoSquareToTurn = false;
        //if(this.heading === 0) {
        //    if(this.desiredHeading === 90) {
        //
        //    }
        //    farEnoughIntoSquareToTurn = newY % 32 < 8;
        //}
        //
        //if((this.state === VehicleStates.MovingForward || this.state === VehicleStates.WaitingAtIntersection)
        //        || farEnoughIntoSquareToTurn)
        //{
        //    if (this.desiredHeading === 90 || this.desiredHeading === 270)
        //    {
        //        // moving east or west. adjust towards optimal y Height
        //        var optimalY = newSqY * 32;
        //        if (newY > optimalY) {
        //            newY -= velocity;
        //            if (newY < velocity) {
        //                newY = optimalY
        //            }
        //        }
        //        if (newY < optimalY) {
        //            newY += velocity;
        //            if (newY > optimalY) {
        //                newY = optimalY;
        //            }
        //        }
        //    }
        //}
        if (enteredNewSquare) {
            this.decideNextAction(oldSqX, oldSqY, newSqX, newSqY);
        }
        this.x = newX;
        this.y = newY;
        // adjust draw position now
        this.rect.x = Math.floor(this.x) + 120;
        this.rect.y = Math.floor(this.y);
        this.rect.rotation = this.heading;
        //
        //this.highlight.x = (newSqX * 32) + 120;
        //this.highlight.y = newSqY * 32;
        //
        //var xAdjust = Math.abs(this.heading - 180);
        //this.rect.x += 8 + ((xAdjust / 180) * 16);
        //
        //var yAdjust = Math.abs(this.heading - 270);
        //if(yAdjust < -180) yAdjust += 360;
        //this.rect.y += 8 + ((yAdjust / 180) * 16);
        //if(this.heading === 0) this.rect.x += 24;
        //if(this.heading === 180) this.rect.x += 8;
        //if(this.heading === 90) this.rect.y += 24;
        //if(this.heading === 270) this.rect.y += 8;
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
        this.map = new BgMap(true);
        this.scoreboard = new ScoreBoard();
        this.grid = new GridOverlay('#999', 32, 1024, 640, 120, 0);
        this.pushObject(this.map);
        this.pushObject(new Vehicle(28, 12, 'blue', 0, 121, 10, 4, this.map));
        //this.pushObject(new Vehicle(28, 12, 'red', 90, 4, 10, 1, this.map))
        //this.pushObject(new Vehicle(28, 12, 'purple', 180, 4, 2, 5, this.map))
        //this.pushObject(new Vehicle(28, 12, 'yellow', 270, 4, 29, 1, this.map))
        this.pushObject(this.scoreboard);
        this.pushObject(this.grid);
        _super.prototype.init.call(this);
        console.log('world:init exit');
    };
    World.prototype.preload = function () {
        var paths = _super.prototype.preload.call(this);
        return paths;
    };
    World.prototype.loadContent = function (stage, lib) {
        _super.prototype.loadContent.call(this, stage, lib);
    };
    World.prototype.update = function (event) {
        _super.prototype.update.call(this, event);
        this.stage.update();
    };
    return World;
})(GameObjectContainer);
//# sourceMappingURL=output.js.map