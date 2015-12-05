"use strict";

var GulpConfig = (function() {
	function gulpConfig() {
		this.typescriptOutputPath = "wwwroot/js/app";
		this.typescriptSourcePath = "./src/app/**/*.ts"; // path to typescript files 
		this.typescriptDefinitionOutputPath = "wwwroot/js/definitions"; // reference to library .d.ts files
		this.typescriptDefinitionSourcePath = "./tools/typings/**/*.ts"; // reference to library .d.ts files
	}

	return gulpConfig;
})();
module.exports = GulpConfig;