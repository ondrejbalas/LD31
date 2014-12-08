enum VehicleStates {
    MovingForward = 1,
    TurningLeft = 2,
    TurningRight = 3,
    WaitingAtIntersection = 4,
};

class Vehicle implements IGameObject {
    showHighlight:boolean=false;
    x:number;
    y:number;
    highlight:createjs.Shape;
    img:createjs.Bitmap;
    state:VehicleStates;
    desiredHeading:number;
    speed:number;
    speedcap:number;
    hasEnteredMap:boolean=false;
    idleTime:number = 0;

    allowLeftTurn: (x:number, y:number) => boolean;
    leftTurnInProgress:boolean = false;
    justCreated:boolean = true;

    constructor(public id:number,
                public length:number,
                public width:number,
                public imgid:string,
                public heading:number,
                public desiredSpeed:number,
                public sqX:number,
                public sqY:number,
                public mapData:BgMap,
                private factory:VehicleFactory)
    {
        this.x = 16 + sqX * 32;
        this.y = 16 + sqY * 32;
        this.state = VehicleStates.MovingForward;
        this.speed = desiredSpeed;
        this.desiredHeading = heading;
    }

    init():void {
        //this.x = Math.floor(100 + Math.random() * 500);
        //this.y = Math.floor(100 + Math.random() * 300);
        //this.heading = Math.floor(Math.random() * 360);
        //this.speed = 5 + Math.floor(Math.random() * 5);
        this.speedcap = 10;
        var adjustments = this.calculateLaneAdjustments(this.x, this.y, this.sqX, this.sqY);
        this.x = this.x + adjustments.xAdjust;
        this.y = this.y + adjustments.yAdjust;
    }

    preload():IAssetPath[] {
        return [];
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        this.img = new createjs.Bitmap(lib.getImage(this.imgid));
        this.img.regX = Math.floor(this.width / 2);
        this.img.regY = Math.floor(this.length / 2);
        stage.addChild(this.img);

        if(this.showHighlight) {
            this.highlight = new createjs.Shape();
            this.highlight.graphics
                .beginFill('yellow')
                .drawRect(8, 8, 16, 16);
            stage.addChild(this.highlight);
        }
    }

    turnTowardsHeading(heading:number, desiredHeading:number, maxAbsTurnAngle:number, turnDirection:number):number {
        var tempDesired = desiredHeading;
        if(desiredHeading < heading && turnDirection > 0) {
            tempDesired = desiredHeading + 360;
        }
        if(desiredHeading > heading && turnDirection < 0) {
            tempDesired = desiredHeading - 360;
        }

        var turnAmount;
        if(turnDirection > 0)
        {
            turnAmount = Math.min(tempDesired, heading + maxAbsTurnAngle);
        }
        if(turnDirection < 0)
        {
            turnAmount = Math.max(tempDesired, heading - maxAbsTurnAngle);
        }
        turnAmount = turnAmount % 360;
        return turnAmount;
    }

    decideNextActions(howMany:number, newSqX:number, newSqY:number, currentDesiredHeading:number)
    :{nextAction:VehicleStates;newDesiredHeading:number;nextSqX:number;nextSqY:number}[]
    {
        var nexts = [];
        if(howMany > 1) {
            nexts.push(this.decideNextAction(newSqX, newSqY, currentDesiredHeading));
            var tempNext = nexts[nexts.length - 1];
            var res = this.decideNextActions(howMany - 1, tempNext.nextSqX, tempNext.nextSqY, tempNext.newDesiredHeading);
            _.each(res, (n) => {
                nexts.push(n);
            });
        }
        else
        {
            nexts.push(this.decideNextAction(newSqX, newSqY, currentDesiredHeading));
        }
        return nexts;
    }

    decideNextAction(newSqX:number, newSqY:number, currentDesiredHeading:number)
    :{nextAction:VehicleStates;newDesiredHeading:number;nextSqX:number;nextSqY:number}
    {
        // vehicle is entering a new square. figure out what it should be doing next.
        var nextAction:VehicleStates;
        var newDesiredHeading;

        var sqValidS = currentDesiredHeading === 0 ? 0 : this.mapData.squares[newSqX][newSqY + 1];
        var sqValidW = currentDesiredHeading === 90 ? 0 : this.mapData.squares[newSqX - 1][newSqY];
        var sqValidN = currentDesiredHeading === 180 ? 0 : this.mapData.squares[newSqX][newSqY - 1];
        var sqValidE = currentDesiredHeading === 270 ? 0 : this.mapData.squares[newSqX + 1][newSqY];

        if(this.hasEnteredMap) {
            if(sqValidN !== 1) sqValidN = 0;
            if(sqValidE !== 1) sqValidE = 0;
            if(sqValidS !== 1) sqValidS = 0;
            if(sqValidW !== 1) sqValidW = 0;
        }

        if((currentDesiredHeading === 0 && sqValidN) ||
            (currentDesiredHeading === 90 && sqValidE) ||
            (currentDesiredHeading === 180 && sqValidS) ||
            (currentDesiredHeading === 270 && sqValidW))
        {
            // Going straight
            //console.log('going straight!')
            nextAction = VehicleStates.MovingForward;
            newDesiredHeading = currentDesiredHeading;
        }
        else {
            // We have to turn, are we turning left or right?
            if(currentDesiredHeading === 0 && sqValidE) newDesiredHeading = 90;
            if(currentDesiredHeading === 0 && sqValidW) newDesiredHeading = 270;
            if(currentDesiredHeading === 90 && sqValidN) newDesiredHeading = 0;
            if(currentDesiredHeading === 90 && sqValidS) newDesiredHeading = 180;
            if(currentDesiredHeading === 180 && sqValidE) newDesiredHeading = 90;
            if(currentDesiredHeading === 180 && sqValidW) newDesiredHeading = 270;
            if(currentDesiredHeading === 270 && sqValidN) newDesiredHeading = 0;
            if(currentDesiredHeading === 270 && sqValidS) newDesiredHeading = 180;

            if(currentDesiredHeading + 90 === newDesiredHeading || currentDesiredHeading === 270 && newDesiredHeading === 0) {
                nextAction = VehicleStates.TurningRight;
            }
            else
            {
                nextAction = VehicleStates.TurningLeft;
            }
        }

        var nextSqX = newSqX;
        var nextSqY = newSqY;
        if(newDesiredHeading === 0) nextSqY = newSqY - 1;
        if(newDesiredHeading === 90) nextSqX = newSqX + 1;
        if(newDesiredHeading === 180) nextSqY = newSqY + 1;
        if(newDesiredHeading === 270) nextSqX = newSqX - 1;

        return {nextAction:nextAction, newDesiredHeading:newDesiredHeading, nextSqX:nextSqX, nextSqY:nextSqY};
    }

    calculateLaneAdjustments(newX:number, newY:number, newSqX:number, newSqY:number):
    {xAdjust:number; yAdjust:number}
    {
        var xAdjust = 0, yAdjust = 0;

        var headingEorW = (heading:number) => { return heading === 90 || heading === 270 };
        var headingNorS = (heading:number) => { return heading === 0 || heading === 180 };

        if(headingEorW(this.heading)) {
            var optimalY = 0;
            if(this.heading === 90) optimalY = (19 + this.width) + (newSqY * 32);
            if(this.heading === 270) optimalY = (13 - this.width) + (newSqY * 32);

            yAdjust = optimalY - newY;
        }

        if(headingNorS(this.heading)) {
            var optimalX;
            if(this.heading === 0) optimalX = (19 + this.width) + (newSqX * 32);
            if(this.heading === 180) optimalX = (13 - this.width) + (newSqX * 32);

            xAdjust = optimalX - newX;
        }

        return {xAdjust:xAdjust,yAdjust:yAdjust};
    }

    getVehiclesAhead(squaresAhead:number, sqX, sqY):Vehicle[] {
        var nextActions = this.decideNextActions(3, sqX, sqY, this.desiredHeading);

        //var nextSquare = this.decideNextAction(sqX, sqY, this.desiredHeading);
        //var nextSquare2 = this.decideNextAction(nextSquare.nextSqX, nextSquare.nextSqY, nextSquare.newDesiredHeading);
        //var nextSquare3 = this.decideNextAction(nextSquare2.nextSqX, nextSquare2.nextSqY, nextSquare2.newDesiredHeading);

        var upcomingHeadings:number[] = [this.desiredHeading];
        var squaresToCheck = [{sqX: sqX, sqY: sqY}];

        _.each(nextActions, (action) => {
            upcomingHeadings.push(action.newDesiredHeading);
            squaresToCheck.push({sqX: action.nextSqX, sqY: action.nextSqY});
        });

        upcomingHeadings = _.uniq(upcomingHeadings);
        var vehiclesToCheck:Vehicle[] = this.factory.whichVehiclesAreInTheSquares(squaresToCheck);

        var myid = this.id;
        var vehiclesWithSameHeading:Vehicle[] = _.filter(vehiclesToCheck, (vehicle) => {
            var result = false;
            if(myid !== vehicle.id) {
                _.each(upcomingHeadings, (heading) => {
                    if(heading === vehicle.desiredHeading) {
                        result = true;
                    }
                });
            }
            return result;
        });
        return vehiclesWithSameHeading;
    }

    update(event:createjs.TickerEvent):void {
        // remember where i was last tick
        var oldX = this.x;
        var oldY = this.y;

        if(this.idleTime > 1000 && this.speed === 0 && this.hasEnteredMap) {
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

        // Make adjustments based on my current state
        switch (this.state) {
            case VehicleStates.MovingForward: {
                // in case something got screwed up (dropped frames, etc) set heading to desiredHeading;
                this.heading = this.desiredHeading;

                // if not in my lane, move towards the optimal position for my heading
                var adjustments = this.calculateLaneAdjustments(newX, newY, newSqX, newSqY);

                newY = newY + adjustments.yAdjust;
                newX = newX + adjustments.xAdjust;
                //if(adjustments.yAdjust < 0) newY = newY - Math.min(generalVelocity, Math.abs(adjustments.yAdjust));
                //if(adjustments.yAdjust > 0) newY = newY + Math.min(generalVelocity, Math.abs(adjustments.yAdjust));
                //if(adjustments.xAdjust < 0) newX = newX - Math.min(generalVelocity, Math.abs(adjustments.xAdjust));
                //if(adjustments.xAdjust > 0) newX = newX + Math.min(generalVelocity, Math.abs(adjustments.xAdjust));

                //if(newX < optimalX) newX = newX + Math.min(generalVelocity, optimalX - newX);
                //if(newX > optimalX) newX = newX - Math.min(generalVelocity, newX - optimalX);

                break;
            }
            case VehicleStates.TurningRight: {
                this.heading = this.turnTowardsHeading(this.heading, this.desiredHeading, 8 * this.speed * (event.delta / 1000), 1);
                break;
            }
            case VehicleStates.TurningLeft: {
                if(this.leftTurnInProgress || this.allowLeftTurn(newX, newY))
                {
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
            if(oldSqX === 10 && oldSqY === 0) oncomingTrafficSquare = {sqX: 11, sqY: 1};
            if(oldSqX === 10 && oldSqY === -1) oncomingTrafficSquare = {sqX: 11, sqY: 1};
            if(oldSqX === 30 && oldSqY === 1) oncomingTrafficSquare = {sqX: 29, sqY: 2};
            if(oldSqX === 29 && oldSqY === 18) oncomingTrafficSquare = {sqX: 28, sqY: 17};
            if(oldSqX === 10 && oldSqY === 18) oncomingTrafficSquare = {sqX: 9, sqY: 17};

            var vehiclesInSquare:Vehicle[] = this.factory.whichVehiclesAreInTheSquare(oncomingTrafficSquare);
            isVehicleComing = vehiclesInSquare.length > 0;

            if(!isVehicleComing) {
                // If there is not a vehicle coming, how far away is the nearest vehicle ahead of me? If it's > 30 go
                var vehiclesAhead = this.getVehiclesAhead(2, newSqX, newSqY);
                var nearestVehicle = _.min(vehiclesAhead, (vehicle) => {
                    return window.helpers.distance(this.x, this.y, vehicle.x, vehicle.y);
                })

                var distance = window.helpers.distance(this.x, this.y, nearestVehicle.x, nearestVehicle.y);
                if(distance > 42) {
                    this.speed = this.desiredSpeed;
                }
            }
        }

        if(enteredNewSquare) {
            if (window.helpers.boundsCheck(newSqX, 0, 31) && window.helpers.boundsCheck(newSqY, 0, 17)) {
                if (this.mapData.squares[newSqX][newSqY] === 1) this.hasEnteredMap = true;
            }
        }

        var vehiclesAhead = this.getVehiclesAhead(3, newSqX, newSqY);

        if(vehiclesAhead.length === 0) {
            this.speed = this.desiredSpeed;
        }
        else
        {
            if(this.hasEnteredMap) {
                var nearestVehicle = _.min(vehiclesAhead, (vehicle) => {
                    return window.helpers.distance(this.x, this.y, vehicle.x, vehicle.y);
                });

                if(nearestVehicle === undefined) debugger;

                var distance = window.helpers.distance(this.x, this.y, nearestVehicle.x, nearestVehicle.y);
                //console.log('nearest vehicle to ' + this.id + ' is ' + nearestVehicle.id + ' with a distance of ' + distance);
                if(distance < 72) {
                    this.speed = Math.max(0, Math.min(this.desiredSpeed, nearestVehicle.speed - 10));
                    //console.log('nearest vehicle is at a distance of ' + distance + '. Slowing down to ' + this.speed);
                }
                else
                {
                    this.speed = this.desiredSpeed;
                    //this.speed = Math.min(this.desiredSpeed, nearestVehicle.speed);
                }
            }
            else
            {
                if(enteredNewSquare) {
                    this.speed = 0;
                }
                //newX = oldX;
                //newY = oldY;
                //newSqX = oldSqX;
                //newSqY = oldSqY;
                //console.log('stopping in sq [' + newSqX + ',' + newSqY + ']');
            }
        }

        if(enteredNewSquare) {
            if(window.helpers.boundsCheck(newSqX, 0, 31) && window.helpers.boundsCheck(newSqY, 0, 17)) {
                if (this.mapData.squares[newSqX][newSqY] === 1) this.hasEnteredMap = true;

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

                if(oldSqX !== newSqX || oldSqY !== newSqY) {
                    var result = this.decideNextAction(newSqX, newSqY, this.desiredHeading);
                    this.state = result.nextAction;
                    if(this.state === VehicleStates.TurningRight) {
                        this.desiredHeading = result.newDesiredHeading;
                    }
                    if(this.state === VehicleStates.TurningLeft) {
                        this.leftTurnInProgress = false;
                        var wasHeading = this.desiredHeading;
                        this.desiredHeading = result.newDesiredHeading;
                        this.allowLeftTurn = (x, y) => {
                            if(wasHeading === 270) return x < newX - 23;
                            if(wasHeading === 90) return x > newX + 23;
                            if(wasHeading === 180) return y > newY + 23;
                            if(wasHeading === 0) return y < newY - 23;
                        }
                    }
                }
            }
        }

        if(this.speed === 0 || (newX === oldX && newY === oldY)) {
            this.idleTime += event.delta;
        }

        this.x = newX;
        this.y = newY;

        if(this.showHighlight) {
            this.highlight.x = 120 + newSqX * 32;
            this.highlight.y = newSqY * 32;
        }

        // adjust draw position now
        this.img.x = Math.floor(this.x) + 120;
        this.img.y = Math.floor(this.y);
        this.img.rotation = (this.heading + 270) % 360;

        this.justCreated = false;
    }

    unloadContent(stage:createjs.Stage):void {
    }

}
