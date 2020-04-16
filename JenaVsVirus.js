/* jshint esversion: 6 */
"use strict";

var fs = require("fs");
const app = require("./src/app.js");
const Server = require("./src/Server.js");

/**
 * Class Srewdriver.
 * The class *Jenavsvirus* is the central entry point for the tool.
 * It reads the configuration file and starts a new server listening
 * for REST queries.
 * @author Johannes Häuser
 */
class JenaVsVirus {
	constructor() {}
	listen() {
		fs.readFile("./conf/conf.json", (err, data) => {
			var conf = JSON.parse(data);
			var server = new Server(conf);
			app.setServer(server);
			app.listen(conf.port, function() {});
		});
	}
}

var jenaVsVirus = new JenaVsVirus();
jenaVsVirus.listen();