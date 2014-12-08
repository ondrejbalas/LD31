class VehicleFactory extends GameObjectContainer {
    lastCreation:number = -1000000;
    lastVehicleCreationId:number = 1;
    private stage:createjs.Stage;
    private lib:AssetLibrary;
    spawnedVehicles:Vehicle[] = [];
    squares:number[][][] = [[[]]];

    constructor(public mapData:BgMap,public timeBetweenSpawnsMs:number) {
        super();
    }

    init() {
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
        var truck = new Vehicle(this.lastVehicleCreationId++, 28, 12, 'truck', 270, 50, 18, 11, this.mapData, this)
        this.pushObject(truck);
        this.spawnedVehicles.push(truck);

        super.init();
    }

    preload():IAssetPath[] {
        var paths = super.preload();
        paths.push({id: 'minivan', src: 'minivan.png'}); // 24 x 10
        paths.push({id: 'sportscar', src: 'sportscar.png'}); // 21 x 12
        paths.push({id: 'truck', src: 'truck.png'}); // 28 x 12
        return paths;
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        this.stage = stage;
        this.lib = lib;
        super.loadContent(stage, lib);
    }

    update(event:createjs.TickerEvent):void {
        if(event.runTime > this.lastCreation + this.timeBetweenSpawnsMs) {
            this.lastCreation = event.runTime;
            this.addVehicle();
        }

        // update the positionsArray
        for (var x = 0; x < 32; x++) {
            for (var y = 0; y < 24; y++) {
                this.squares[x][y] = [];
            }
        }

        _.each(this.spawnedVehicles, (vehicle) => {
            if(window.helpers.boundsCheck(vehicle.sqX, 0, 31) && window.helpers.boundsCheck(vehicle.sqY, 0, 17)) {
                this.squares[vehicle.sqX][vehicle.sqY].push(vehicle.id)
            }
        })

        super.update(event);
    }

    whichVehiclesAreInTheSquare(sq: {sqX:number;sqY:number}):Vehicle[] {
        if(sq === undefined) debugger;
        if(window.helpers.boundsCheck(sq.sqX, 0, 31) && window.helpers.boundsCheck(sq.sqY, 0, 17)) {
             return _.map(this.squares[sq.sqX][sq.sqY], (vehicleId) =>
             { return this.getVehicleById(vehicleId)});
        }
    }

    whichVehiclesAreInTheSquares(squares: {sqX:number;sqY:number}[]):Vehicle[] {
        var foundVehicles:Vehicle[] = [];

        _.each(squares, (sq) => {
                _.each(this.whichVehiclesAreInTheSquare(sq), (vehicle) => {
                    foundVehicles.push(vehicle);
                });
        });

        return _.uniq(foundVehicles);
    }

    howManyVehiclesHaveNotYetEnteredTheMap():number {
        var sum = _.reduce(this.spawnedVehicles, (memo, vehicle:Vehicle) => {
            return memo + vehicle.hasEnteredMap ? 0 : 1;
        }, 0)
        return sum;
    }

    getVehicleById(id:number):Vehicle {
        return _.find(this.spawnedVehicles, (vehicle) => {
            return vehicle.id === id;
        })
    }

    addVehicle():void {
        var locations = [];

        if(this.whichVehiclesAreInTheSquare({sqX: 10, sqY: 0}).length === 0) locations.push({x:10,y:-1,h:180});
        //if(this.whichVehiclesAreInTheSquare({sqX: 31, sqY: 1})) locations.push({x:32,y:1,h:270});
        //if(this.whichVehiclesAreInTheSquare({sqX: 10, sqY: 19})) locations.push({x:10,y:20,h:0});
        //if(this.whichVehiclesAreInTheSquare({sqX: 29, sqY: 19})) locations.push({x:29,y:20,h:0});

        if(locations.length > 0)
        {
            var rnd = Math.floor(Math.random() * locations.length);
            var location = locations[rnd];

            var newVehicle = this.createVehicle(location.x, location.y, location.h);
            newVehicle.init();
            newVehicle.loadContent(this.stage, this.lib);
            this.pushObject(newVehicle)
            this.spawnedVehicles.push(newVehicle);
        }
        else {
            console.log("can't place a vehicle. skipping.");
        }
    }

    createVehicle(x:number,y:number,h:number):Vehicle {
        var rnd = Math.floor(Math.random() * 3);
        var type, speed;
        switch(rnd) {
            case 0:
                type = 'sportscar';
                speed = 100;
                break;
            case 1:
                type='minivan';
                speed = 75;
                break;
            case 2:
                type='truck';
                speed = 50;
                break;
        }

        return new Vehicle(this.lastVehicleCreationId++, 28, 12, type, h, speed, x, y, this.mapData, this);
    }
}

