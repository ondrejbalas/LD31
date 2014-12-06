/// <reference path="../../typings/easeljs/easeljs.d.ts" />
/// <reference path="../../typings/preloadjs/preloadjs.d.ts" />
declare class GameObjectContainer implements IGameObject {
    gameObjects: IGameObject[];
    pushObjects(obj: IGameObject): void;
    init(): void;
    loadContent(stage: createjs.Stage): void;
    update(): void;
    unloadContent(stage: createjs.Stage): void;
}
declare class Helpers {
}
interface IGameObject {
    init(): void;
    loadContent(stage: createjs.Stage): void;
    update(): void;
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
    init(): void;
    loadContent(stage: createjs.Stage): void;
    update(): void;
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
    preload(callback: () => void): void;
}
