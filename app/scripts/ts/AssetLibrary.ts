///<reference path="../../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../../../typings/underscore/underscore.d.ts" />

class AssetLibrary {
    loadQueue:createjs.LoadQueue;
    requestedAssets:IAssetPath[] = [];

    constructor(public basePath: string) {

    }

    getImage(id:string):HTMLImageElement {
        return <HTMLImageElement> this.loadQueue.getResult(id);
    }

    add(asset:IAssetPath):void {
        console.log('asset requested: ' + asset.id);
        this.requestedAssets.push(asset);
    }

    addAll(assets:IAssetPath[]):void {
        _.each(assets, (asset:IAssetPath) => {
            this.add(asset);
        });
    }

    preload(callback: () => void):void {
        console.log('assetLibrary:preload enter');
        this.loadQueue = new createjs.LoadQueue();
        this.loadQueue.on('complete', callback, this);
        this.loadQueue.loadManifest(this.requestedAssets, true, 'images/');
        console.log('assetLibrary:preload exit');
    }
}
