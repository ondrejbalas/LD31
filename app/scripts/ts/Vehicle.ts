enum VehicleStates {
    MovingForward = 1,
    TurningLeft = 2,
    TurningRight = 3,
    WaitingAtIntersection = 4,
};

class Vehicle implements IGameObject {
    x:number;
    y:number;
    highlight:createjs.Shape;
    img:createjs.Bitmap;
    state:VehicleStates;
    desiredHeading:number;
    speedcap:number;

    allowLeftTurn: (x:number, y:number) => boolean;
    leftTurnInProgress:boolean = false;

    constructor(public length:number,
                public width:number,
                public imgid:string,
                public heading:number,
                public speed:number,
                public startX:number,
                public startY:number,
                public mapData:BgMap)
    {
        this.x = 16 + startX * 32;
        this.y = 16 + startY * 32;
        this.state = VehicleStates.MovingForward;
        this.desiredHeading = heading;
    }

    init():void {
        //this.x = Math.floor(100 + Math.random() * 500);
        //this.y = Math.floor(100 + Math.random() * 300);
        //this.heading = Math.floor(Math.random() * 360);
        //this.speed = 5 + Math.floor(Math.random() * 5);
        this.speedcap = 10;
    }

    preload():IAssetPath[] {
        return [];
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        this.img = new createjs.Bitmap(lib.getImage(this.imgid));
        this.img.regX = Math.floor(this.width / 2);
        this.img.regY = Math.floor(this.length / 2);
        stage.addChild(this.img);

        //this.highlight = new createjs.Shape();
        //this.highlight.graphics
        //    .beginFill('yellow')
        //    .drawRect(8, 8, 16, 16);
        //stage.addChild(this.highlight);
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
        if(isNaN(turnAmount)) debugger;
        turnAmount = turnAmount % 360;
        if(isNaN(turnAmount)) debugger;
        return turnAmount;
    }

    decideNextAction(oldSqX:number, oldSqY:number, newSqX:number, newSqY:number, newX:number, newY:number):void {
        // vehicle is entering a new square. figure out what it should be doing next.
        //console.log('was in (' + oldSqX + ',' + oldSqY + ') and now in (' + newSqX + ',' + newSqY + ')');

        var sqValidS = this.desiredHeading === 0 ? 0 : this.mapData.squares[newSqX][newSqY + 1];
        var sqValidW = this.desiredHeading === 90 ? 0 : this.mapData.squares[newSqX - 1][newSqY];
        var sqValidN = this.desiredHeading === 180 ? 0 : this.mapData.squares[newSqX][newSqY - 1];
        var sqValidE = this.desiredHeading === 270 ? 0 : this.mapData.squares[newSqX + 1][newSqY];

        if((this.desiredHeading === 0 && sqValidN) ||
            (this.desiredHeading === 90 && sqValidE) ||
            (this.desiredHeading === 180 && sqValidS) ||
            (this.desiredHeading === 270 && sqValidW))
        {
            // Going straight
            //console.log('going straight!')
            this.state = VehicleStates.MovingForward;
        }
        else {
            // We have to turn, are we turning left or right?
            var wasHeading = this.desiredHeading;
            if(this.desiredHeading === 0 && sqValidE) this.desiredHeading = 90;
            if(this.desiredHeading === 0 && sqValidW) this.desiredHeading = 270;
            if(this.desiredHeading === 90 && sqValidN) this.desiredHeading = 0;
            if(this.desiredHeading === 90 && sqValidS) this.desiredHeading = 180;
            if(this.desiredHeading === 180 && sqValidE) this.desiredHeading = 90;
            if(this.desiredHeading === 180 && sqValidW) this.desiredHeading = 270;
            if(this.desiredHeading === 270 && sqValidN) this.desiredHeading = 0;
            if(this.desiredHeading === 270 && sqValidS) this.desiredHeading = 180;

            if(wasHeading + 90 === this.desiredHeading || wasHeading === 270 && this.desiredHeading === 0) {
                this.state = VehicleStates.TurningRight;
                //console.log('turning right!')
            }
            else
            {
                //console.log('turning left');
                this.leftTurnInProgress = false;
                this.allowLeftTurn = (x, y) => {
                    if(wasHeading === 270) return x < newX - 23;
                    if(wasHeading === 90) return x > newX + 23;
                    if(wasHeading === 180) return y > newY + 23;
                    if(wasHeading === 0) return y < newY - 23;
                }

                this.state = VehicleStates.TurningLeft;
            }
        }
    }

    update(event:createjs.TickerEvent):void {
        // remember where i was last tick
        var oldX = this.x;
        var oldY = this.y;

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
        var enteredNewSquare = oldSqX !== newSqX || oldSqY !== newSqY;
        var headingEorW = (heading:number) => { return heading === 90 || heading === 270 };
        var headingNorS = (heading:number) => { return heading === 0 || heading === 180 };

        // Make adjustments based on my current state
        switch (this.state) {
            case VehicleStates.MovingForward: {
                // in case something got screwed up (dropped frames, etc) set heading to desiredHeading;
                //if(this.heading !== this.desiredHeading) console.log('heading issue. was ' + this.heading + ' should be ' + this.desiredHeading);
                this.heading = this.desiredHeading;

                // if not in my lane, move towards the optimal position for my heading
                if(headingEorW(this.heading)) {
                    var optimalY = 0;
                    if(this.heading === 90) optimalY = (19 + this.width) + (newSqY * 32);
                    if(this.heading === 270) optimalY = (13 - this.width) + (newSqY * 32); // 12 = 2, 10 = 4
                    if(newY < optimalY) newY = newY + Math.min(generalVelocity, optimalY - newY);
                    if(newY > optimalY) newY = newY - Math.min(generalVelocity, newY - optimalY);
                }

                if(headingNorS(this.heading)) {
                    var optimalX;
                    if(this.heading === 0) optimalX = (19 + this.width) + (newSqX * 32);
                    if(this.heading === 180) optimalX = (13 - this.width) + (newSqX * 32);
                    if(newX < optimalX) newX = newX + Math.min(generalVelocity, optimalX - newX);
                    if(newX > optimalX) newX = newX - Math.min(generalVelocity, newX - optimalX);
                }
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

        if(enteredNewSquare) {
            this.decideNextAction(oldSqX, oldSqY, newSqX, newSqY, newX, newY);
        }

        this.x = newX;
        this.y = newY;

        // adjust draw position now
        this.img.x = Math.floor(this.x) + 120;
        this.img.y = Math.floor(this.y);
        this.img.rotation = (this.heading + 270) % 360;
    }

    unloadContent(stage:createjs.Stage):void {
    }

}
