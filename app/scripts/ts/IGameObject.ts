///<reference path="../../../typings/easeljs/easeljs.d.ts" />

interface IGameObject {
    init(): void;
    loadContent(stage:createjs.Stage): void
    update(event:createjs.TickerEvent): void
    unloadContent(stage:createjs.Stage) : void
}
