interface ISquare {
    x:number;
    y:number;
}

class BgMap implements IGameObject {
    bg:createjs.Bitmap;
    squares:number[][] = [[]];
    private validSquares:ISquare[];

    constructor(public drawValidSquares:boolean) {
        this.validSquares = [
            { x: 2, y: 5, t: 1},
            { x: 3, y: 5, t: 1},
            { x: 4, y: 5, t: 1},
            { x: 5, y: 5, t: 1},
            { x: 6, y: 5, t: 1},
            { x: 7, y: 5, t: 1},
            { x: 8, y: 5, t: 1},
            { x: 9, y: 5, t: 1},
            { x: 10, y: 5, t: 1},
            { x: 11, y: 5, t: 1},
            { x: 12, y: 5, t: 1},
            { x: 13, y: 5, t: 1},
            { x: 14, y: 5, t: 1},
            { x: 15, y: 5, t: 1},
            { x: 16, y: 5, t: 1},
            { x: 2, y: 6, t: 1},
            { x: 2, y: 7, t: 1},
            { x: 2, y: 8, t: 1},
            { x: 2, y: 9, t: 1},
            { x: 2, y: 10, t: 1},
            { x: 2, y: 11, t: 1},
            { x: 2, y: 12, t: 1},
            { x: 2, y: 13, t: 1},
            { x: 2, y: 14, t: 1},
            { x: 2, y: 15, t: 1},
            { x: 2, y: 16, t: 1},
            { x: 2, y: 17, t: 1},
            { x: 3, y: 17, t: 1},
            { x: 4, y: 17, t: 1},
            { x: 5, y: 17, t: 1},
            { x: 6, y: 17, t: 1},
            { x: 7, y: 17, t: 1},
            { x: 8, y: 17, t: 1},
            { x: 9, y: 17, t: 1},
            { x: 10, y: 17, t: 1},
            { x: 10, y: 16, t: 1},
            { x: 10, y: 15, t: 1},
            { x: 10, y: 14, t: 1},
            { x: 10, y: 13, t: 1},
            { x: 10, y: 12, t: 1},
            { x: 10, y: 11, t: 1},
            { x: 10, y: 10, t: 1},
            { x: 10, y: 9, t: 1},
            { x: 10, y: 8, t: 1},
            { x: 10, y: 7, t: 1},
            { x: 10, y: 6, t: 1},
            { x: 10, y: 4, t: 1},
            { x: 10, y: 3, t: 1},
            { x: 10, y: 2, t: 1},
            { x: 10, y: 1, t: 1},
            { x: 11, y: 1, t: 1},
            { x: 12, y: 1, t: 1},
            { x: 13, y: 1, t: 1},
            { x: 14, y: 1, t: 1},
            { x: 15, y: 1, t: 1},
            { x: 16, y: 1, t: 1},
            { x: 17, y: 1, t: 1},
            { x: 18, y: 1, t: 1},
            { x: 19, y: 1, t: 1},
            { x: 20, y: 1, t: 1},
            { x: 21, y: 1, t: 1},
            { x: 22, y: 1, t: 1},
            { x: 23, y: 1, t: 1},
            { x: 24, y: 1, t: 1},
            { x: 25, y: 1, t: 1},
            { x: 26, y: 1, t: 1},
            { x: 27, y: 1, t: 1},
            { x: 28, y: 1, t: 1},
            { x: 29, y: 1, t: 1},
            { x: 29, y: 2, t: 1},
            { x: 29, y: 3, t: 1},
            { x: 29, y: 4, t: 1},
            { x: 29, y: 5, t: 1},
            { x: 29, y: 6, t: 1},
            { x: 29, y: 7, t: 1},
            { x: 28, y: 7, t: 1},
            { x: 27, y: 7, t: 1},
            { x: 26, y: 7, t: 1},
            { x: 25, y: 7, t: 1},
            { x: 24, y: 7, t: 1},
            { x: 23, y: 7, t: 1},
            { x: 22, y: 7, t: 1},
            { x: 22, y: 8, t: 1},
            { x: 22, y: 9, t: 1},
            { x: 22, y: 10, t: 1},
            { x: 22, y: 11, t: 1},
            { x: 22, y: 12, t: 1},
            { x: 22, y: 13, t: 1},
            { x: 22, y: 14, t: 1},
            { x: 22, y: 15, t: 1},
            { x: 22, y: 16, t: 1},
            { x: 22, y: 17, t: 1},
            { x: 23, y: 17, t: 1},
            { x: 24, y: 17, t: 1},
            { x: 25, y: 17, t: 1},
            { x: 26, y: 17, t: 1},
            { x: 27, y: 17, t: 1},
            { x: 28, y: 17, t: 1},
            { x: 29, y: 17, t: 1},
            { x: 29, y: 16, t: 1},
            { x: 29, y: 15, t: 1},
            { x: 29, y: 14, t: 1},
            { x: 29, y: 13, t: 1},
            { x: 29, y: 12, t: 1},
            { x: 29, y: 11, t: 1},
            { x: 28, y: 11, t: 1},
            { x: 27, y: 11, t: 1},
            { x: 26, y: 11, t: 1},
            { x: 25, y: 11, t: 1},
            { x: 24, y: 11, t: 1},
            { x: 23, y: 11, t: 1},
            { x: 21, y: 11, t: 1},
            { x: 20, y: 11, t: 1},
            { x: 19, y: 11, t: 1},
            { x: 18, y: 11, t: 1},
            { x: 17, y: 11, t: 1},
            { x: 16, y: 11, t: 1},
            { x: 16, y: 10, t: 1},
            { x: 16, y: 9, t: 1},
            { x: 16, y: 8, t: 1},
            { x: 16, y: 7, t: 1},
            { x: 16, y: 6, t: 1},
            { x: 10, y: 0, t: 2},
            { x: 30, y: 1, t: 2},
            { x: 31, y: 1, t: 2},
            { x: 29, y: 18, t: 2},
            { x: 29, y: 19, t: 2},
            { x: 10, y: 18, t: 2},
            { x: 10, y: 19, t: 2},
        ];

        for (var x = 0; x < 32; x++) {
            this.squares[x] = [];
            for (var y = 0; y < 24; y++) {
                this.squares[x][y] = 0;
            }
        }

        _.each(this.validSquares, (sq) => {
            this.squares[sq.x][sq.y] = sq.t;
        });
    }

    init():void {

    }

    preload():IAssetPath[] {
        return [{id: 'mapbg', src: 'map-bg.png'}];
    }

    loadContent(stage:createjs.Stage, lib:AssetLibrary):void {
        this.bg = new createjs.Bitmap(lib.getImage('mapbg'));
        this.bg.x = 120;

        stage.addChild(this.bg);

        if(this.drawValidSquares) {
            var shape = new createjs.Shape();
            shape.x = 120;
            _.each(this.validSquares, (sq) => {
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

}
