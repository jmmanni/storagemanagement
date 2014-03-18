var mongoose = require('mongoose');
var express = require('express');
var config = require('./server_configure').config;
var StorageItem = require('./models/StorageItem');
var bodyParser = require('body-parser');
var logger = require('morgan');

console.log("Connecting to the database...");
var db = mongoose.connection
mongoose.connect(config.DB_PATH);

var checkAuth = function(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}

db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function()
{
	console.log("Connected to the database!");

	console.log("Creating server instance...");
	var server = express();
	console.log("Created!\n");
	
	server.use(logger());
	server.use(bodyParser());
	
	var colors = require('colors');

	console.log("Adding routes...");
	for(r in StorageItem.routes)
	{
		var route = StorageItem.routes[r];
		switch(route.method.toLowerCase())
		{
			case 'get':
				console.log("  Adding GET /" + route.route);
				server.get("/" + route.route, route.handler);
				break;
			case 'post':
				console.log("  Adding POST /" + route.route);
				server.post("/" + route.route, route.handler);
				break;
			case 'delete':
				console.log("  Adding DELETE /" + route.route);
				server.delete("/" + route.route, route.handler);
				break;
			case 'put':
				console.log("  Adding PUT /" + route.route);
				server.put("/" + route.route, route.handler);
				break;
		}
	}
	server.get('/get_services', function(req, res, next)
	{
		var services = StorageItem.routes;
		for(i in services)
		{
			delete services[i].handler;
		}
		res.send(services);
	});
	server.use(express.static(__dirname + '/public-html'));
	console.log("Routes added, starting server...\n");

	server.listen(config.PORT);
	console.log("Server started, listening port %d".green, config.PORT);
});

