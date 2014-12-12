/// <reference path="../../typings/easeljs/easeljs.d.ts" />
/// <reference path="../../typings/preloadjs/preloadjs.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="app.d.ts" />
declare class AssetLibrary {
    basePath: string;
    loadQueue: createjs.LoadQueue;
    requestedAssets: IAssetPath[];
    constructor(basePath: string);
    getImage(id: string): HTMLImageElement;
    add(asset: IAssetPath): void;
    addAll(assets: IAssetPath[]): void;
    preload(callback: () => void): void;
}
declare class Pos {
    x: number;
    y: number;
    sqX: number;
    sqY: number;
    static fromPixels(x: number, y: number): Pos;
}
declare class GameObjectContainer implements IGameObject {
    gameObjects: IGameObject[];
    pushObject(obj: IGameObject): void;
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class GridOverlay implements IGameObject {
    color: string;
    squareSize: number;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    grid: createjs.Shape;
    constructor(color: string, squareSize: number, width: number, height: number, offsetX: number, offsetY: number);
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class Helpers {
    globaltick: any;
    boundsCheck(check: number, min: number, max: number): boolean;
    distance(x1: number, y1: number, x2: number, y2: number): number;
}
declare class IAssetPath {
    id: string;
    src: string;
}
interface IGameObject {
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class BgMap implements IGameObject {
    private drawValidSquares;
    mapData: IMapData;
    bg: createjs.Bitmap;
    constructor(drawValidSquares: boolean, mapData: IMapData);
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
    currentSquareSize(): number;
}
declare class Map1 implements IMapData {
    validSquares: ISquare[];
    squares: number[][];
    constructor();
    preload(): IAssetPath[];
    bgImageName(): string;
    squareSize(): number;
    private getValidSquares();
}
interface IMapData {
    preload(): IAssetPath[];
    bgImageName(): string;
    squareSize(): number;
    validSquares: ISquare[];
    squares: number[][];
}
interface ISquare {
    x: number;
    y: number;
    t: number;
}
declare class ScoreBoard implements IGameObject {
    bg: createjs.Bitmap;
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
}
declare enum VehicleStates {
    MovingForward = 1,
    TurningLeft = 2,
    TurningRight = 3,
    WaitingAtIntersection = 4,
}
declare class Vehicle implements IGameObject {
    id: number;
    length: number;
    width: number;
    imgid: string;
    heading: number;
    desiredSpeed: number;
    sqX: number;
    sqY: number;
    mapData: IMapData;
    private factory;
    showHighlight: boolean;
    x: number;
    y: number;
    highlight: createjs.Shape;
    img: createjs.Bitmap;
    state: VehicleStates;
    desiredHeading: number;
    speed: number;
    speedcap: number;
    hasEnteredMap: boolean;
    idleTime: number;
    allowLeftTurn: (x: number, y: number) => boolean;
    leftTurnInProgress: boolean;
    justCreated: boolean;
    constructor(id: number, length: number, width: number, imgid: string, heading: number, desiredSpeed: number, sqX: number, sqY: number, mapData: IMapData, factory: VehicleFactory);
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    turnTowardsHeading(heading: number, desiredHeading: number, maxAbsTurnAngle: number, turnDirection: number): number;
    decideNextActions(howMany: number, newSqX: number, newSqY: number, currentDesiredHeading: number): {
        nextAction: VehicleStates;
        newDesiredHeading: number;
        nextSqX: number;
        nextSqY: number;
    }[];
    decideNextAction(newSqX: number, newSqY: number, currentDesiredHeading: number): {
        nextAction: VehicleStates;
        newDesiredHeading: number;
        nextSqX: number;
        nextSqY: number;
    };
    calculateLaneAdjustments(newX: number, newY: number, newSqX: number, newSqY: number): {
        xAdjust: number;
        yAdjust: number;
    };
    getVehiclesAhead(squaresAhead: number, sqX: any, sqY: any): Vehicle[];
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class VehicleFactory extends GameObjectContainer {
    mapData: IMapData;
    timeBetweenSpawnsMs: number;
    lastCreation: number;
    lastVehicleCreationId: number;
    private stage;
    private lib;
    spawnedVehicles: Vehicle[];
    squares: number[][][];
    constructor(mapData: IMapData, timeBetweenSpawnsMs: number);
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
    whichVehiclesAreInTheSquare(sq: {
        sqX: number;
        sqY: number;
    }): Vehicle[];
    whichVehiclesAreInTheSquares(squares: {
        sqX: number;
        sqY: number;
    }[]): Vehicle[];
    howManyVehiclesHaveNotYetEnteredTheMap(): number;
    getVehicleById(id: number): Vehicle;
    addVehicle(): void;
    createVehicle(x: number, y: number, h: number): Vehicle;
}
declare class VehicleMover {
}
declare class VehicleTurner {
}
declare class World extends GameObjectContainer {
    stage: createjs.Stage;
    level: number;
    scoreboard: ScoreBoard;
    map: BgMap;
    grid: GridOverlay;
    factory: VehicleFactory;
    bgimg: createjs.Bitmap;
    lib: AssetLibrary;
    constructor(stage: createjs.Stage);
    start(): void;
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
}
