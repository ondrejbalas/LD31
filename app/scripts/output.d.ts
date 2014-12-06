/// <reference path="../../typings/easeljs/easeljs.d.ts" />
/// <reference path="../../typings/preloadjs/preloadjs.d.ts" />
/// <reference path="app.d.ts" />
declare class GameObjectContainer implements IGameObject {
    gameObjects: IGameObject[];
    pushObject(obj: IGameObject): void;
    init(): void;
    loadContent(stage: createjs.Stage): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class Helpers {
    globaltick: any;
}
interface IGameObject {
    init(): void;
    loadContent(stage: createjs.Stage): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class Intersection implements IGameObject {
    init(): void;
    loadContent(stage: createjs.Stage): void;
    update(): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class TrafficLight implements IGameObject {
    init(): void;
    loadContent(stage: createjs.Stage): void;
    update(): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class Vehicle implements IGameObject {
    length: number;
    width: number;
    color: string;
    heading: number;
    speed: number;
    x: number;
    y: number;
    rect: createjs.Shape;
    constructor(length: number, width: number, color: string, heading: number, speed: number);
    init(): void;
    loadContent(stage: createjs.Stage): void;
    update(event: createjs.TickerEvent): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class World extends GameObjectContainer {
    stage: createjs.Stage;
    level: number;
    bgimg: createjs.Bitmap;
    loadQueue: createjs.LoadQueue;
    constructor(stage: createjs.Stage);
    start(): void;
    init(): void;
    loadContent(stage: createjs.Stage): void;
    update(event: createjs.TickerEvent): void;
    preload(callback: () => void): void;
}
