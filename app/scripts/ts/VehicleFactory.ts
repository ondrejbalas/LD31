class VehicleFactory extends GameObjectContainer {
    constructor(public mapData:BgMap) {
        super();
    }

    init() {
        this.pushObject(new Vehicle(28, 12, 'sportscar', 0, 100, 10, 4, this.mapData))
        this.pushObject(new Vehicle(28, 12, 'minivan', 180, 75, 10, 2, this.mapData))
        this.pushObject(new Vehicle(28, 12, 'truck', 180, 50, 2, 14, this.mapData))
        this.pushObject(new Vehicle(28, 12, 'sportscar', 180, 50, 2, 15, this.mapData))
        this.pushObject(new Vehicle(28, 12, 'sportscar', 180, 100, 2, 10, this.mapData))

        super.init();
    }

    preload():IAssetPath[] {
        var paths = super.preload();
        paths.push({id: 'minivan', src: 'minivan.png'}); // 24 x 10
        paths.push({id: 'sportscar', src: 'sportscar.png'}); // 21 x 12
        paths.push({id: 'truck', src: 'truck.png'}); // 28 x 12
        return paths;
    }
}

