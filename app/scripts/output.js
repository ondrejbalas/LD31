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
            { x: 2, y: 5, t: 1 },
            { x: 3, y: 5, t: 1 },
            { x: 4, y: 5, t: 1 },
            { x: 5, y: 5, t: 1 },
            { x: 6, y: 5, t: 1 },
            { x: 7, y: 5, t: 1 },
            { x: 8, y: 5, t: 1 },
            { x: 9, y: 5, t: 1 },
            { x: 10, y: 5, t: 1 },
            { x: 11, y: 5, t: 1 },
            { x: 12, y: 5, t: 1 },
            { x: 13, y: 5, t: 1 },
            { x: 14, y: 5, t: 1 },
            { x: 15, y: 5, t: 1 },
            { x: 16, y: 5, t: 1 },
            { x: 2, y: 6, t: 1 },
            { x: 2, y: 7, t: 1 },
            { x: 2, y: 8, t: 1 },
            { x: 2, y: 9, t: 1 },
            { x: 2, y: 10, t: 1 },
            { x: 2, y: 11, t: 1 },
            { x: 2, y: 12, t: 1 },
            { x: 2, y: 13, t: 1 },
            { x: 2, y: 14, t: 1 },
            { x: 2, y: 15, t: 1 },
            { x: 2, y: 16, t: 1 },
            { x: 2, y: 17, t: 1 },
            { x: 3, y: 17, t: 1 },
            { x: 4, y: 17, t: 1 },
            { x: 5, y: 17, t: 1 },
            { x: 6, y: 17, t: 1 },
            { x: 7, y: 17, t: 1 },
            { x: 8, y: 17, t: 1 },
            { x: 9, y: 17, t: 1 },
            { x: 10, y: 17, t: 1 },
            { x: 10, y: 16, t: 1 },
            { x: 10, y: 15, t: 1 },
            { x: 10, y: 14, t: 1 },
            { x: 10, y: 13, t: 1 },
            { x: 10, y: 12, t: 1 },
            { x: 10, y: 11, t: 1 },
            { x: 10, y: 10, t: 1 },
            { x: 10, y: 9, t: 1 },
            { x: 10, y: 8, t: 1 },
            { x: 10, y: 7, t: 1 },
            { x: 10, y: 6, t: 1 },
            { x: 10, y: 4, t: 1 },
            { x: 10, y: 3, t: 1 },
            { x: 10, y: 2, t: 1 },
            { x: 10, y: 1, t: 1 },
            { x: 11, y: 1, t: 1 },
            { x: 12, y: 1, t: 1 },
            { x: 13, y: 1, t: 1 },
            { x: 14, y: 1, t: 1 },
            { x: 15, y: 1, t: 1 },
            { x: 16, y: 1, t: 1 },
            { x: 17, y: 1, t: 1 },
            { x: 18, y: 1, t: 1 },
            { x: 19, y: 1, t: 1 },
            { x: 20, y: 1, t: 1 },
            { x: 21, y: 1, t: 1 },
            { x: 22, y: 1, t: 1 },
            { x: 23, y: 1, t: 1 },
            { x: 24, y: 1, t: 1 },
            { x: 25, y: 1, t: 1 },
            { x: 26, y: 1, t: 1 },
            { x: 27, y: 1, t: 1 },
            { x: 28, y: 1, t: 1 },
            { x: 29, y: 1, t: 1 },
            { x: 29, y: 2, t: 1 },
            { x: 29, y: 3, t: 1 },
            { x: 29, y: 4, t: 1 },
            { x: 29, y: 5, t: 1 },
            { x: 29, y: 6, t: 1 },
            { x: 29, y: 7, t: 1 },
            { x: 28, y: 7, t: 1 },
            { x: 27, y: 7, t: 1 },
            { x: 26, y: 7, t: 1 },
            { x: 25, y: 7, t: 1 },
            { x: 24, y: 7, t: 1 },
            { x: 23, y: 7, t: 1 },
            { x: 22, y: 7, t: 1 },
            { x: 22, y: 8, t: 1 },
            { x: 22, y: 9, t: 1 },
            { x: 22, y: 10, t: 1 },
            { x: 22, y: 11, t: 1 },
            { x: 22, y: 12, t: 1 },
            { x: 22, y: 13, t: 1 },
            { x: 22, y: 14, t: 1 },
            { x: 22, y: 15, t: 1 },
            { x: 22, y: 16, t: 1 },
            { x: 22, y: 17, t: 1 },
            { x: 23, y: 17, t: 1 },
            { x: 24, y: 17, t: 1 },
            { x: 25, y: 17, t: 1 },
            { x: 26, y: 17, t: 1 },
            { x: 27, y: 17, t: 1 },
            { x: 28, y: 17, t: 1 },
            { x: 29, y: 17, t: 1 },
            { x: 29, y: 16, t: 1 },
            { x: 29, y: 15, t: 1 },
            { x: 29, y: 14, t: 1 },
            { x: 29, y: 13, t: 1 },
            { x: 29, y: 12, t: 1 },
            { x: 29, y: 11, t: 1 },
            { x: 28, y: 11, t: 1 },
            { x: 27, y: 11, t: 1 },
            { x: 26, y: 11, t: 1 },
            { x: 25, y: 11, t: 1 },
            { x: 24, y: 11, t: 1 },
            { x: 23, y: 11, t: 1 },
            { x: 21, y: 11, t: 1 },
            { x: 20, y: 11, t: 1 },
            { x: 19, y: 11, t: 1 },
            { x: 18, y: 11, t: 1 },
            { x: 17, y: 11, t: 1 },
            { x: 16, y: 11, t: 1 },
            { x: 16, y: 10, t: 1 },
            { x: 16, y: 9, t: 1 },
            { x: 16, y: 8, t: 1 },
            { x: 16, y: 7, t: 1 },
            { x: 16, y: 6, t: 1 },
            { x: 10, y: 0, t: 2 },
            { x: 30, y: 1, t: 2 },
            { x: 31, y: 1, t: 2 },
            { x: 29, y: 18, t: 2 },
            { x: 29, y: 19, t: 2 },
            { x: 10, y: 18, t: 2 },
            { x: 10, y: 19, t: 2 },
        ];
        for (var x = 0; x < 32; x++) {
            this.squares[x] = [];
            for (var y = 0; y < 24; y++) {
                this.squares[x][y] = 0;
            }
        }
        _.each(this.validSquares, function (sq) {
            _this.squares[sq.x][sq.y] = sq.t;
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
            _.each(this.validSquares, function (sq) {
                if (sq.t === 1)
                    shape.graphics.beginFill('#FF0000');
                if (sq.t === 2)
                    shape.graphics.beginFill('#FFFF00');
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
    Helpers.prototype.boundsCheck = function (check, min, max) {
        return check >= min && check <= max;
    };
    Helpers.prototype.distance = function (x1, y1, x2, y2) {
        //return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
        return Math.abs(x2 - x1) + Math.abs(y2 - y1);
    };
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
    function Vehicle(id, length, width, imgid, heading, desiredSpeed, sqX, sqY, mapData, factory) {
        this.id = id;
        this.length = length;
        this.width = width;
        this.imgid = imgid;
        this.heading = heading;
        this.desiredSpeed = desiredSpeed;
        this.sqX = sqX;
        this.sqY = sqY;
        this.mapData = mapData;
        this.factory = factory;
        this.showHighlight = false;
        this.hasEnteredMap = false;
        this.idleTime = 0;
        this.leftTurnInProgress = false;
        this.justCreated = true;
        this.x = 16 + sqX * 32;
        this.y = 16 + sqY * 32;
        this.state = 1 /* MovingForward */;
        this.speed = desiredSpeed;
        this.desiredHeading = heading;
    }
    Vehicle.prototype.init = function () {
        //this.x = Math.floor(100 + Math.random() * 500);
        //this.y = Math.floor(100 + Math.random() * 300);
        //this.heading = Math.floor(Math.random() * 360);
        //this.speed = 5 + Math.floor(Math.random() * 5);
        this.speedcap = 10;
        var adjustments = this.calculateLaneAdjustments(this.x, this.y, this.sqX, this.sqY);
        this.x = this.x + adjustments.xAdjust;
        this.y = this.y + adjustments.yAdjust;
    };
    Vehicle.prototype.preload = function () {
        return [];
    };
    Vehicle.prototype.loadContent = function (stage, lib) {
        this.img = new createjs.Bitmap(lib.getImage(this.imgid));
        this.img.regX = Math.floor(this.width / 2);
        this.img.regY = Math.floor(this.length / 2);
        stage.addChild(this.img);
        if (this.showHighlight) {
            this.highlight = new createjs.Shape();
            this.highlight.graphics.beginFill('yellow').drawRect(8, 8, 16, 16);
            stage.addChild(this.highlight);
        }
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
        turnAmount = turnAmount % 360;
        return turnAmount;
    };
    Vehicle.prototype.decideNextActions = function (howMany, newSqX, newSqY, currentDesiredHeading) {
        var nexts = [];
        if (howMany > 1) {
            nexts.push(this.decideNextAction(newSqX, newSqY, currentDesiredHeading));
            var tempNext = nexts[nexts.length - 1];
            var res = this.decideNextActions(howMany - 1, tempNext.nextSqX, tempNext.nextSqY, tempNext.newDesiredHeading);
            _.each(res, function (n) {
                nexts.push(n);
            });
        }
        else {
            nexts.push(this.decideNextAction(newSqX, newSqY, currentDesiredHeading));
        }
        return nexts;
    };
    Vehicle.prototype.decideNextAction = function (newSqX, newSqY, currentDesiredHeading) {
        // vehicle is entering a new square. figure out what it should be doing next.
        var nextAction;
        var newDesiredHeading;
        var sqValidS = currentDesiredHeading === 0 ? 0 : this.mapData.squares[newSqX][newSqY + 1];
        var sqValidW = currentDesiredHeading === 90 ? 0 : this.mapData.squares[newSqX - 1][newSqY];
        var sqValidN = currentDesiredHeading === 180 ? 0 : this.mapData.squares[newSqX][newSqY - 1];
        var sqValidE = currentDesiredHeading === 270 ? 0 : this.mapData.squares[newSqX + 1][newSqY];
        if (this.hasEnteredMap) {
            if (sqValidN !== 1)
                sqValidN = 0;
            if (sqValidE !== 1)
                sqValidE = 0;
            if (sqValidS !== 1)
                sqValidS = 0;
            if (sqValidW !== 1)
                sqValidW = 0;
        }
        if ((currentDesiredHeading === 0 && sqValidN) || (currentDesiredHeading === 90 && sqValidE) || (currentDesiredHeading === 180 && sqValidS) || (currentDesiredHeading === 270 && sqValidW)) {
            // Going straight
            //console.log('going straight!')
            nextAction = 1 /* MovingForward */;
            newDesiredHeading = currentDesiredHeading;
        }
        else {
            // We have to turn, are we turning left or right?
            if (currentDesiredHeading === 0 && sqValidE)
                newDesiredHeading = 90;
            if (currentDesiredHeading === 0 && sqValidW)
                newDesiredHeading = 270;
            if (currentDesiredHeading === 90 && sqValidN)
                newDesiredHeading = 0;
            if (currentDesiredHeading === 90 && sqValidS)
                newDesiredHeading = 180;
            if (currentDesiredHeading === 180 && sqValidE)
                newDesiredHeading = 90;
            if (currentDesiredHeading === 180 && sqValidW)
                newDesiredHeading = 270;
            if (currentDesiredHeading === 270 && sqValidN)
                newDesiredHeading = 0;
            if (currentDesiredHeading === 270 && sqValidS)
                newDesiredHeading = 180;
            if (currentDesiredHeading + 90 === newDesiredHeading || currentDesiredHeading === 270 && newDesiredHeading === 0) {
                nextAction = 3 /* TurningRight */;
            }
            else {
                nextAction = 2 /* TurningLeft */;
            }
        }
        var nextSqX = newSqX;
        var nextSqY = newSqY;
        if (newDesiredHeading === 0)
            nextSqY = newSqY - 1;
        if (newDesiredHeading === 90)
            nextSqX = newSqX + 1;
        if (newDesiredHeading === 180)
            nextSqY = newSqY + 1;
        if (newDesiredHeading === 270)
            nextSqX = newSqX - 1;
        return { nextAction: nextAction, newDesiredHeading: newDesiredHeading, nextSqX: nextSqX, nextSqY: nextSqY };
    };
    Vehicle.prototype.calculateLaneAdjustments = function (newX, newY, newSqX, newSqY) {
        var xAdjust = 0, yAdjust = 0;
        var headingEorW = function (heading) {
            return heading === 90 || heading === 270;
        };
        var headingNorS = function (heading) {
            return heading === 0 || heading === 180;
        };
        if (headingEorW(this.heading)) {
            var optimalY = 0;
            if (this.heading === 90)
                optimalY = (19 + this.width) + (newSqY * 32);
            if (this.heading === 270)
                optimalY = (13 - this.width) + (newSqY * 32);
            yAdjust = optimalY - newY;
        }
        if (headingNorS(this.heading)) {
            var optimalX;
            if (this.heading === 0)
                optimalX = (19 + this.width) + (newSqX * 32);
            if (this.heading === 180)
                optimalX = (13 - this.width) + (newSqX * 32);
            xAdjust = optimalX - newX;
        }
        return { xAdjust: xAdjust, yAdjust: yAdjust };
    };
    Vehicle.prototype.getVehiclesAhead = function (squaresAhead, sqX, sqY) {
        var nextActions = this.decideNextActions(3, sqX, sqY, this.desiredHeading);
        //var nextSquare = this.decideNextAction(sqX, sqY, this.desiredHeading);
        //var nextSquare2 = this.decideNextAction(nextSquare.nextSqX, nextSquare.nextSqY, nextSquare.newDesiredHeading);
        //var nextSquare3 = this.decideNextAction(nextSquare2.nextSqX, nextSquare2.nextSqY, nextSquare2.newDesiredHeading);
        var upcomingHeadings = [this.desiredHeading];
        var squaresToCheck = [{ sqX: sqX, sqY: sqY }];
        _.each(nextActions, function (action) {
            upcomingHeadings.push(action.newDesiredHeading);
            squaresToCheck.push({ sqX: action.nextSqX, sqY: action.nextSqY });
        });
        upcomingHeadings = _.uniq(upcomingHeadings);
        var vehiclesToCheck = this.factory.whichVehiclesAreInTheSquares(squaresToCheck);
        var myid = this.id;
        var vehiclesWithSameHeading = _.filter(vehiclesToCheck, function (vehicle) {
            var result = false;
            if (myid !== vehicle.id) {
                _.each(upcomingHeadings, function (heading) {
                    if (heading === vehicle.desiredHeading) {
                        result = true;
                    }
                });
            }
            return result;
        });
        return vehiclesWithSameHeading;
    };
    Vehicle.prototype.update = function (event) {
        var _this = this;
        // remember where i was last tick
        var oldX = this.x;
        var oldY = this.y;
        if (this.idleTime > 1000 && this.speed === 0 && this.hasEnteredMap) {
            //console.log('vehicle ' + this.id + ' idle for over a second and not moving. setting speed to 10');
            this.idleTime = 0;
            this.speed = 10;
        }
        // figure out velocity based on heading. cap it at (this.speedcap) pixels of movement since last frame
        var xVelocity = Math.max(-this.speedcap, Math.min(this.speedcap, Math.sin(this.heading * (Math.PI / 180)) * (this.speed * event.delta / 1000)));
        var yVelocity = -Math.max(-this.speedcap, Math.min(this.speedcap, Math.cos(this.heading * (Math.PI / 180)) * (this.speed * event.delta / 1000)));
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
        var enteredNewSquare = oldSqX !== newSqX || oldSqY !== newSqY || this.justCreated;
        switch (this.state) {
            case 1 /* MovingForward */:
                {
                    // in case something got screwed up (dropped frames, etc) set heading to desiredHeading;
                    this.heading = this.desiredHeading;
                    // if not in my lane, move towards the optimal position for my heading
                    var adjustments = this.calculateLaneAdjustments(newX, newY, newSqX, newSqY);
                    newY = newY + adjustments.yAdjust;
                    newX = newX + adjustments.xAdjust;
                    break;
                }
            case 3 /* TurningRight */:
                {
                    this.heading = this.turnTowardsHeading(this.heading, this.desiredHeading, 8 * this.speed * (event.delta / 1000), 1);
                    break;
                }
            case 2 /* TurningLeft */:
                {
                    if (this.leftTurnInProgress || this.allowLeftTurn(newX, newY)) {
                        this.leftTurnInProgress = true;
                        this.heading = this.turnTowardsHeading(this.heading, this.desiredHeading, 8 * this.speed * (event.delta / 1000), -1);
                    }
                    break;
                }
        }
        if (!this.hasEnteredMap && this.speed === 0) {
            // I'm sitting here waiting to enter. Is there a vehicle coming? if so, remain stopped.
            var isVehicleComing = false;
            var oncomingTrafficSquare;
            if (oldSqX === 10 && oldSqY === 0)
                oncomingTrafficSquare = { sqX: 11, sqY: 1 };
            if (oldSqX === 10 && oldSqY === -1)
                oncomingTrafficSquare = { sqX: 11, sqY: 1 };
            if (oldSqX === 30 && oldSqY === 1)
                oncomingTrafficSquare = { sqX: 29, sqY: 2 };
            if (oldSqX === 29 && oldSqY === 18)
                oncomingTrafficSquare = { sqX: 28, sqY: 17 };
            if (oldSqX === 10 && oldSqY === 18)
                oncomingTrafficSquare = { sqX: 9, sqY: 17 };
            var vehiclesInSquare = this.factory.whichVehiclesAreInTheSquare(oncomingTrafficSquare);
            isVehicleComing = vehiclesInSquare.length > 0;
            if (!isVehicleComing) {
                // If there is not a vehicle coming, how far away is the nearest vehicle ahead of me? If it's > 30 go
                var vehiclesAhead = this.getVehiclesAhead(2, newSqX, newSqY);
                var nearestVehicle = _.min(vehiclesAhead, function (vehicle) {
                    return window.helpers.distance(_this.x, _this.y, vehicle.x, vehicle.y);
                });
                var distance = window.helpers.distance(this.x, this.y, nearestVehicle.x, nearestVehicle.y);
                if (distance > 42) {
                    this.speed = this.desiredSpeed;
                }
            }
        }
        if (enteredNewSquare) {
            if (window.helpers.boundsCheck(newSqX, 0, 31) && window.helpers.boundsCheck(newSqY, 0, 17)) {
                if (this.mapData.squares[newSqX][newSqY] === 1)
                    this.hasEnteredMap = true;
            }
        }
        var vehiclesAhead = this.getVehiclesAhead(3, newSqX, newSqY);
        if (vehiclesAhead.length === 0) {
            this.speed = this.desiredSpeed;
        }
        else {
            if (this.hasEnteredMap) {
                var nearestVehicle = _.min(vehiclesAhead, function (vehicle) {
                    return window.helpers.distance(_this.x, _this.y, vehicle.x, vehicle.y);
                });
                if (nearestVehicle === undefined)
                    debugger;
                var distance = window.helpers.distance(this.x, this.y, nearestVehicle.x, nearestVehicle.y);
                //console.log('nearest vehicle to ' + this.id + ' is ' + nearestVehicle.id + ' with a distance of ' + distance);
                if (distance < 72) {
                    this.speed = Math.max(0, Math.min(this.desiredSpeed, nearestVehicle.speed - 10));
                }
                else {
                    this.speed = this.desiredSpeed;
                }
            }
            else {
                if (enteredNewSquare) {
                    this.speed = 0;
                }
            }
        }
        if (enteredNewSquare) {
            if (window.helpers.boundsCheck(newSqX, 0, 31) && window.helpers.boundsCheck(newSqY, 0, 17)) {
                if (this.mapData.squares[newSqX][newSqY] === 1)
                    this.hasEnteredMap = true;
                //console.log('Vehicle ' + this.id + ' was in [' + oldSqX + ',' + oldSqY + ']. With a heading of ' + this.heading
                //+ ', and will now be in [' + newSqX + ',' + newSqY + ']. Checking for vehicles in: '
                //+ '[' + newSqX + ',' + newSqY + '], '
                //+ '[' + nextSquare.nextSqX + ',' + nextSquare.nextSqY + '], '
                //+ '[' + nextSquare2.nextSqX + ',' + nextSquare2.nextSqY + '], '
                //+ '[' + nextSquare3.nextSqX + ',' + nextSquare3.nextSqY + ']. ' +
                //'found ' + vehiclesToCheck.length + 'vehicles, but only ' + vehiclesWithSameHeading.length + ' with same heading');
                //console.log('vehicle ' + this.id + ' entering [' + newSqX + ',' + newSqY + ']. In sq: ' + vehiclesInSquare.length + ' and with heading: ' + vehiclesWithSameHeading.length);
                //if(vehiclesInSquare.length > 1 && vehiclesWithSameHeading.length === 0) debugger;
                this.sqX = newSqX;
                this.sqY = newSqY;
                if (oldSqX !== newSqX || oldSqY !== newSqY) {
                    var result = this.decideNextAction(newSqX, newSqY, this.desiredHeading);
                    this.state = result.nextAction;
                    if (this.state === 3 /* TurningRight */) {
                        this.desiredHeading = result.newDesiredHeading;
                    }
                    if (this.state === 2 /* TurningLeft */) {
                        this.leftTurnInProgress = false;
                        var wasHeading = this.desiredHeading;
                        this.desiredHeading = result.newDesiredHeading;
                        this.allowLeftTurn = function (x, y) {
                            if (wasHeading === 270)
                                return x < newX - 23;
                            if (wasHeading === 90)
                                return x > newX + 23;
                            if (wasHeading === 180)
                                return y > newY + 23;
                            if (wasHeading === 0)
                                return y < newY - 23;
                        };
                    }
                }
            }
        }
        if (this.speed === 0 || (newX === oldX && newY === oldY)) {
            this.idleTime += event.delta;
        }
        this.x = newX;
        this.y = newY;
        if (this.showHighlight) {
            this.highlight.x = 120 + newSqX * 32;
            this.highlight.y = newSqY * 32;
        }
        // adjust draw position now
        this.img.x = Math.floor(this.x) + 120;
        this.img.y = Math.floor(this.y);
        this.img.rotation = (this.heading + 270) % 360;
        this.justCreated = false;
    };
    Vehicle.prototype.unloadContent = function (stage) {
    };
    return Vehicle;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VehicleFactory = (function (_super) {
    __extends(VehicleFactory, _super);
    function VehicleFactory(mapData, timeBetweenSpawnsMs) {
        _super.call(this);
        this.mapData = mapData;
        this.timeBetweenSpawnsMs = timeBetweenSpawnsMs;
        this.lastCreation = -1000000;
        this.lastVehicleCreationId = 1;
        this.spawnedVehicles = [];
        this.squares = [[[]]];
    }
    VehicleFactory.prototype.init = function () {
        for (var x = 0; x < 32; x++) {
            this.squares[x] = [];
            for (var y = 0; y < 24; y++) {
                this.squares[x][y] = [];
            }
        }
        //var truck = new Vehicle(this.lastVehicleCreationId++, 28, 12, 'truck', 0, 50, 10, 12, this.mapData, this)
        //this.pushObject(truck);
        //this.spawnedVehicles.push(truck);
        //var car = new Vehicle(this.lastVehicleCreationId++, 28, 12, 'sportscar', 0, 100, 10, 14, this.mapData, this);
        //this.pushObject(car);
        //this.spawnedVehicles.push(car);
        var car = new Vehicle(this.lastVehicleCreationId++, 28, 12, 'sportscar', 270, 100, 19, 11, this.mapData, this);
        this.pushObject(car);
        this.spawnedVehicles.push(car);
        var truck = new Vehicle(this.lastVehicleCreationId++, 28, 12, 'truck', 270, 50, 18, 11, this.mapData, this);
        this.pushObject(truck);
        this.spawnedVehicles.push(truck);
        _super.prototype.init.call(this);
    };
    VehicleFactory.prototype.preload = function () {
        var paths = _super.prototype.preload.call(this);
        paths.push({ id: 'minivan', src: 'minivan.png' }); // 24 x 10
        paths.push({ id: 'sportscar', src: 'sportscar.png' }); // 21 x 12
        paths.push({ id: 'truck', src: 'truck.png' }); // 28 x 12
        return paths;
    };
    VehicleFactory.prototype.loadContent = function (stage, lib) {
        this.stage = stage;
        this.lib = lib;
        _super.prototype.loadContent.call(this, stage, lib);
    };
    VehicleFactory.prototype.update = function (event) {
        var _this = this;
        if (event.runTime > this.lastCreation + this.timeBetweenSpawnsMs) {
            this.lastCreation = event.runTime;
            this.addVehicle();
        }
        for (var x = 0; x < 32; x++) {
            for (var y = 0; y < 24; y++) {
                this.squares[x][y] = [];
            }
        }
        _.each(this.spawnedVehicles, function (vehicle) {
            if (window.helpers.boundsCheck(vehicle.sqX, 0, 31) && window.helpers.boundsCheck(vehicle.sqY, 0, 17)) {
                _this.squares[vehicle.sqX][vehicle.sqY].push(vehicle.id);
            }
        });
        _super.prototype.update.call(this, event);
    };
    VehicleFactory.prototype.whichVehiclesAreInTheSquare = function (sq) {
        var _this = this;
        if (sq === undefined)
            debugger;
        if (window.helpers.boundsCheck(sq.sqX, 0, 31) && window.helpers.boundsCheck(sq.sqY, 0, 17)) {
            return _.map(this.squares[sq.sqX][sq.sqY], function (vehicleId) {
                return _this.getVehicleById(vehicleId);
            });
        }
    };
    VehicleFactory.prototype.whichVehiclesAreInTheSquares = function (squares) {
        var _this = this;
        var foundVehicles = [];
        _.each(squares, function (sq) {
            _.each(_this.whichVehiclesAreInTheSquare(sq), function (vehicle) {
                foundVehicles.push(vehicle);
            });
        });
        return _.uniq(foundVehicles);
    };
    VehicleFactory.prototype.howManyVehiclesHaveNotYetEnteredTheMap = function () {
        var sum = _.reduce(this.spawnedVehicles, function (memo, vehicle) {
            return memo + vehicle.hasEnteredMap ? 0 : 1;
        }, 0);
        return sum;
    };
    VehicleFactory.prototype.getVehicleById = function (id) {
        return _.find(this.spawnedVehicles, function (vehicle) {
            return vehicle.id === id;
        });
    };
    VehicleFactory.prototype.addVehicle = function () {
        var locations = [];
        if (this.whichVehiclesAreInTheSquare({ sqX: 10, sqY: 0 }).length === 0)
            locations.push({ x: 10, y: -1, h: 180 });
        //if(this.whichVehiclesAreInTheSquare({sqX: 31, sqY: 1})) locations.push({x:32,y:1,h:270});
        //if(this.whichVehiclesAreInTheSquare({sqX: 10, sqY: 19})) locations.push({x:10,y:20,h:0});
        //if(this.whichVehiclesAreInTheSquare({sqX: 29, sqY: 19})) locations.push({x:29,y:20,h:0});
        if (locations.length > 0) {
            var rnd = Math.floor(Math.random() * locations.length);
            var location = locations[rnd];
            var newVehicle = this.createVehicle(location.x, location.y, location.h);
            newVehicle.init();
            newVehicle.loadContent(this.stage, this.lib);
            this.pushObject(newVehicle);
            this.spawnedVehicles.push(newVehicle);
        }
        else {
            console.log("can't place a vehicle. skipping.");
        }
    };
    VehicleFactory.prototype.createVehicle = function (x, y, h) {
        var rnd = Math.floor(Math.random() * 3);
        var type, speed;
        switch (rnd) {
            case 0:
                type = 'sportscar';
                speed = 100;
                break;
            case 1:
                type = 'minivan';
                speed = 75;
                break;
            case 2:
                type = 'truck';
                speed = 50;
                break;
        }
        return new Vehicle(this.lastVehicleCreationId++, 28, 12, type, h, speed, x, y, this.mapData, this);
    };
    return VehicleFactory;
})(GameObjectContainer);
///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../app.d.ts" />
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
        createjs.Ticker.setFPS(30);
        this.map = new BgMap(false);
        this.scoreboard = new ScoreBoard();
        this.factory = new VehicleFactory(this.map, 500);
        this.grid = new GridOverlay('#999', 32, 1024, 640, 120, 0);
        this.pushObject(this.map);
        this.pushObject(this.factory);
        //this.pushObject(new Vehicle(28, 12, 'blue', 0, 100, 10, 4, this.map))
        //this.pushObject(new Vehicle(28, 12, 'red', 180, 100, 10, 2, this.map))
        //this.pushObject(new Vehicle(28, 12, 'purple', 180, 4, 2, 5, this.map))
        //this.pushObject(new Vehicle(28, 12, 'yellow', 270, 4, 29, 1, this.map))
        this.pushObject(this.scoreboard);
        //this.pushObject(this.grid);
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