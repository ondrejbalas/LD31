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
            { x: 2, y: 5},
            { x: 3, y: 5},
            { x: 4, y: 5},
            { x: 5, y: 5},
            { x: 6, y: 5},
            { x: 7, y: 5},
            { x: 8, y: 5},
            { x: 9, y: 5},
            { x: 10, y: 5},
            { x: 11, y: 5},
            { x: 12, y: 5},
            { x: 13, y: 5},
            { x: 14, y: 5},
            { x: 15, y: 5},
            { x: 16, y: 5},
            { x: 2, y: 6},
            { x: 2, y: 7},
            { x: 2, y: 8},
            { x: 2, y: 9},
            { x: 2, y: 10},
            { x: 2, y: 11},
            { x: 2, y: 12},
            { x: 2, y: 13},
            { x: 2, y: 14},
            { x: 2, y: 15},
            { x: 2, y: 16},
            { x: 2, y: 17},
            { x: 3, y: 17},
            { x: 4, y: 17},
            { x: 5, y: 17},
            { x: 6, y: 17},
            { x: 7, y: 17},
            { x: 8, y: 17},
            { x: 9, y: 17},
            { x: 10, y: 17},
            { x: 10, y: 16},
            { x: 10, y: 15},
            { x: 10, y: 14},
            { x: 10, y: 13},
            { x: 10, y: 12},
            { x: 10, y: 11},
            { x: 10, y: 10},
            { x: 10, y: 9},
            { x: 10, y: 8},
            { x: 10, y: 7},
            { x: 10, y: 6},
            { x: 10, y: 4},
            { x: 10, y: 3},
            { x: 10, y: 2},
            { x: 10, y: 1},
            { x: 11, y: 1},
            { x: 12, y: 1},
            { x: 13, y: 1},
            { x: 14, y: 1},
            { x: 15, y: 1},
            { x: 16, y: 1},
            { x: 17, y: 1},
            { x: 18, y: 1},
            { x: 19, y: 1},
            { x: 20, y: 1},
            { x: 21, y: 1},
            { x: 22, y: 1},
            { x: 23, y: 1},
            { x: 24, y: 1},
            { x: 25, y: 1},
            { x: 26, y: 1},
            { x: 27, y: 1},
            { x: 28, y: 1},
            { x: 29, y: 1},
            { x: 29, y: 2},
            { x: 29, y: 3},
            { x: 29, y: 4},
            { x: 29, y: 5},
            { x: 29, y: 6},
            { x: 29, y: 7},
            { x: 28, y: 7},
            { x: 27, y: 7},
            { x: 26, y: 7},
            { x: 25, y: 7},
            { x: 24, y: 7},
            { x: 23, y: 7},
            { x: 22, y: 7},
            { x: 22, y: 8},
            { x: 22, y: 9},
            { x: 22, y: 10},
            { x: 22, y: 11},
            { x: 22, y: 12},
            { x: 22, y: 13},
            { x: 22, y: 14},
            { x: 22, y: 15},
            { x: 22, y: 16},
            { x: 22, y: 17},
            { x: 23, y: 17},
            { x: 24, y: 17},
            { x: 25, y: 17},
            { x: 26, y: 17},
            { x: 27, y: 17},
            { x: 28, y: 17},
            { x: 29, y: 17},
            { x: 29, y: 16},
            { x: 29, y: 15},
            { x: 29, y: 14},
            { x: 29, y: 13},
            { x: 29, y: 12},
            { x: 29, y: 11},
            { x: 28, y: 11},
            { x: 27, y: 11},
            { x: 26, y: 11},
            { x: 25, y: 11},
            { x: 24, y: 11},
            { x: 23, y: 11},
            { x: 21, y: 11},
            { x: 20, y: 11},
            { x: 19, y: 11},
            { x: 18, y: 11},
            { x: 17, y: 11},
            { x: 16, y: 11},
            { x: 16, y: 10},
            { x: 16, y: 9},
            { x: 16, y: 8},
            { x: 16, y: 7},
            { x: 16, y: 6}
        ];

        for (var x = 0; x < 32; x++) {
            this.squares[x] = [];
            for (var y = 0; y < 24; y++) {
                this.squares[x][y] = 0;
            }
        }

        _.each(this.validSquares, (sq) => {
            this.squares[sq.x][sq.y] = 1;
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
            shape.graphics.beginFill('#FF0000');
            _.each(this.validSquares, (sq) => {
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
