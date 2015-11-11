'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './src/';

        this.tsOutputPath = './build';
        this.allJavaScript = [this.tsOutputPath + '/**/*.js'];
        this.allTypeScript = this.source + '/**/*.ts';

        this.typings = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;