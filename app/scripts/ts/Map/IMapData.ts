interface IMapData {
    preload():IAssetPath[];
    bgImageName():string;
    squareSize():number;
    validSquares:ISquare[];
    squares:number[][];
}
