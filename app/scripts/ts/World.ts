class World extends GameObjectContainer {
    level:number;

    constructor(public stage:createjs.Stage) {
        super();
        this.level = 1;
    }

    start():void {
        this.init();
        this.loadContent(this.stage);
        this.update();
        this.stage.update();
    }

    init():void {


        super.init();
    }
}
