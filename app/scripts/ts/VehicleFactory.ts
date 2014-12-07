class VehicleFactory extends GameObjectContainer {
    lastCreation:number = -1000000;
    private stage:createjs.Stage;
    private lib:AssetLibrary;

    constructor(public mapData:BgMap,public timeBetweenSpawnsMs:number) {
        super();
    }

    init() {
        //this.pushObject(new Vehicle(28, 12, 'sportscar', 0, 100, 10, 4, this.mapData))
        //this.pushObject(new Vehicle(28, 12, 'minivan', 180, 75, 10, 2, this.mapData))
        this.pushObject(new Vehicle(28, 12, 'truck', 180, 50, 10, 2, this.mapData))
        //this.pushObject(new Vehicle(28, 12, 'sportscar', 180, 50, 2, 15, this.mapData))
        //this.pushObject(new Vehicle(28, 12, 'sportscar', 180, 100, 2, 10, this.mapData))

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
        super.update(event);
    }

    addVehicle():void {
        var locations = [{x:29,y:1,h:270},
            {x:10,y:2,h:180},
            {x:10,y:17,h:0},
            {x:29,y:17,h:0}]

        var rnd = Math.floor(Math.random() * 4);
        var location = locations[rnd];

        var newVehicle = this.createVehicle(location.x, location.y, location.h);
        newVehicle.init();
        newVehicle.loadContent(this.stage, this.lib);
        this.pushObject(newVehicle)
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

        return new Vehicle(28, 12, type, h, speed, x, y, this.mapData);
    }
}

