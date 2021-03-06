///<reference path="../../typings/preloadjs/preloadjs.d.ts" />
///<reference path="../../typings/requirejs/require.d.ts" />
///<reference path="../../typings/easeljs/easeljs.d.ts" />
define(['PreloadJS', 'easeljs', 'underscore', './output'], function () {
    window.squareSize = function () {
        return 32;
    };
    window.helpers = new Helpers() || {};
    var stage = new createjs.Stage('trafficcanvas');
    var world = new World(stage);
    window.helpers.globaltick = function (event) {
        world.update(event);
    };
    world.start();
    return world;
});
//# sourceMappingURL=app.js.map