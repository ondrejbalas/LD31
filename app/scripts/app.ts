///<reference path="../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../../typings/requirejs/require.d.ts" />
///<reference path="../../typings/easeljs/easeljs.d.ts" />
///<reference path="output.d.ts" />

interface Window {
    helpers:any;
    squareSize:() => number;
}

define(['PreloadJS', 'easeljs', 'underscore', './output'], function() {
    window.squareSize = () => { return 32; };
    window.helpers = new Helpers() || {} ;

    var stage = new createjs.Stage('trafficcanvas');
    var world = new World(stage);

    window.helpers.globaltick = function(event:createjs.TickerEvent) {
        world.update(event);
    };

    world.start();
    return world;
});
