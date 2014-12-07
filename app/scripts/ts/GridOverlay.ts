class GridOverlay implements IGameObject {
    grid:createjs.Shape;

    constructor(public color:string,
                public squareSize:number,
                public width:number,
                public height:number,
                public offsetX:number,
                public offsetY:number)
    {
    }

    init():void {
    }

    preload():IAssetPath[] {
        return [];
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        this.grid = new createjs.Shape();
        this.grid.x = this.offsetX;
        this.grid.y = this.offsetY;

        var g = this.grid.graphics;
        g.setStrokeStyle(1)
            .beginStroke(this.color);

        for (var x = this.squareSize; x < this.width; x+= this.squareSize) {
            g.mt(x, 0);
            g.lt(x, this.height);
        }

        for (var y = this.squareSize; y < this.height; y+= this.squareSize) {
            g.mt(0, y);
            g.lt(this.width, y);
        }

        this.grid.graphics.endStroke();

        stage.addChild(this.grid);
    }

    update(event:createjs.TickerEvent):void {

    }

    unloadContent(stage:createjs.Stage):void {
    }
}
