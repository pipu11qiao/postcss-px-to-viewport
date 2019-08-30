'use strict';

var fs = require('fs');
var path = require('path');
var postcss = require('postcss');
var pxToViewport = require('..');
var css = fs.readFileSync(path.resolve(__dirname, './main.css'), 'utf8');

var processedCss = postcss(pxToViewport({

    unitToConvert: 'px',
    viewportWidth: 320,
    viewportHeight: 568, // not now used; TODO: need for different units and math for different properties
    unitPrecision: 5,
    viewportUnit: 'vw',
    fontViewportUnit: 'vw',  // vmin is more suitable.
    selectorBlackList: [],
    propList: ['*'],
    minPixelValue: 1,
    mediaQuery: false,
    replace: true,
    landscapeAll: false,
    landscapeManual: true,
    landscapeUnit: 'vw',
    landscapeWidth: 568

})).process(css).css;

fs.writeFile(path.resolve(__dirname, './main-viewport.css'), processedCss, function(err) {
    if (err) {
        throw err;
    }
    console.log('File with viewport units written.');
});
