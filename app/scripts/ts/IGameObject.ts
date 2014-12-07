///<reference path="../../../typings/easeljs/easeljs.d.ts" />

interface IGameObject {
    init():void;
    preload():IAssetPath[];
    loadContent(stage:createjs.Stage, lib:AssetLibrary):void
    update(event:createjs.TickerEvent):void
    unloadContent(stage:createjs.Stage):void
}
