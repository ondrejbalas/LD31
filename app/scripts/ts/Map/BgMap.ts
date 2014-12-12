class BgMap implements IGameObject {
    bg:createjs.Bitmap;

    constructor(private drawValidSquares:boolean, public mapData:IMapData) {
    }

    init():void {

    }

    preload():IAssetPath[] {
        return this.mapData.preload();
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        this.bg = new createjs.Bitmap(lib.getImage(this.mapData.bgImageName()));
        this.bg.x = 120;

        stage.addChild(this.bg);

        if(this.drawValidSquares) {
            var shape = new createjs.Shape();
            shape.x = 120;
            _.each(this.mapData.validSquares, (sq) => {
                if(sq.t === 1) shape.graphics.beginFill('#FF0000');
                if(sq.t === 2) shape.graphics.beginFill('#FFFF00');
                shape.graphics.drawRect(4 + sq.x * 32, 4 + sq.y * 32, 24, 24);
                console.log('drawing rect at [' + sq.x + ',' + sq.y + '] with dimensions 24x24');
            });
            stage.addChild(shape);
        }
    }

    update(event:createjs.TickerEvent):void {
    }

    unloadContent(stage:createjs.Stage):void {
    }

    currentSquareSize():number {
        return this.mapData.squareSize()
    }
}
