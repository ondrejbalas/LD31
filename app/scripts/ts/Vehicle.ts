class Vehicle implements IGameObject {
    x:number;
    y:number;
    rect:createjs.Shape;

    constructor(public length:number, public width:number, public color:string, public heading: number, public speed: number) {
    }

    init():void {
        this.x = Math.floor(100 + Math.random() * 500);
        this.y = Math.floor(100 + Math.random() * 300);
        //this.heading = Math.floor(Math.random() * 360);
        //this.speed = 5 + Math.floor(Math.random() * 5);
    }

    preload():IAssetPath[] {
        return [];
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        this.rect = new createjs.Shape();
        //this.rect.regX = Math.floor(this.width / 2);
        //this.rect.regY = Math.floor(this.length / 2);
        this.rect.graphics
            .beginFill(this.color)
            .drawRect(0, 0, this.width, this.length)
            .setStrokeStyle(3)
            .beginStroke('#000');

        stage.addChild(this.rect);
    }

    update(event:createjs.TickerEvent):void {
        var xVelocity = Math.sin(this.heading * (Math.PI / 180)) * (this.speed * event.delta / 1000);
        this.x += xVelocity;
        var yVelocity = Math.cos(this.heading * (Math.PI / 180)) * (this.speed * event.delta / 1000);
        this.y -= yVelocity;

        this.rect.x = Math.floor(this.x);
        this.rect.y = Math.floor(this.y);
        this.rect.rotation = this.heading;
    }

    unloadContent(stage:createjs.Stage):void {
    }

}
