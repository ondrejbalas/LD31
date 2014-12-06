///<reference path="../../typings/easeljs/easeljs.d.ts" />
///<reference path="../../typings/requirejs/require.d.ts" />
///<reference path="output.d.ts" />

interface Window { helpers:any; }

define(['easeljs', './output'], function() {
    window.helpers = new Helpers() || {} ;
    var stage = new createjs.Stage('canvas');
    var world = new World(stage);
    //world.start();
    //return world;
});