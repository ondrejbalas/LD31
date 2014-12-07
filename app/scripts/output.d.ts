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
interface ISquare {
    x: number;
    y: number;
}
declare class BgMap implements IGameObject {
    bg: createjs.Bitmap;
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
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
declare class ScoreBoard implements IGameObject {
    bg: createjs.Bitmap;
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class Vehicle implements IGameObject {
    length: number;
    width: number;
    color: string;
    heading: number;
    speed: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
    rect: createjs.Shape;
    constructor(length: number, width: number, color: string, heading: number, speed: number, startX: number, startY: number);
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class World extends GameObjectContainer {
    stage: createjs.Stage;
    level: number;
    scoreboard: ScoreBoard;
    map: BgMap;
    grid: GridOverlay;
    bgimg: createjs.Bitmap;
    lib: AssetLibrary;
    constructor(stage: createjs.Stage);
    start(): void;
    init(): void;
    preload(): IAssetPath[];
    loadContent(stage: createjs.Stage, lib: AssetLibrary): void;
    update(event: createjs.TickerEvent): void;
}
