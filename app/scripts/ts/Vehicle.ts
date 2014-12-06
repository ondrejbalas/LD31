class Vehicle implements IGameObject {
    speed:number;
    heading:number;
    x:number;
    y:number;
    rect:createjs.Shape;

    constructor(public length:number, public width:number, public color:string) {
    }

    init():void {
        this.x = Math.floor(100 + Math.random() * 500);
        this.y = Math.floor(100 + Math.random() * 300);
        this.heading = Math.floor(Math.random() * 360);
    }

    loadContent(stage:createjs.Stage):void {
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

    update():void {
        this.rect.x = this.x;
        this.rect.y = this.y;
        this.rect.rotation = this.heading;
    }

    unloadContent(stage:createjs.Stage):void {
    }

}
