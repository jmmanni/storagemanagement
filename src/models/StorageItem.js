var mongoose = require('mongoose');

var name = 'storageitem'
var default_attributes = {
	name: 'part name',
	description: 'description',
	quantity: 0
}

var Schema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: true},
	quantity: {type: Number, required: true}
});

var Model = mongoose.model('StorageItem', Schema);

var handler = function(req, res, next)
{
	Model.find({}, function(err, db_data)
	{
		if(err)
		{
			console.log('Database error!'.red);
			console.log(err);
			res.send(500, 'database error'); // Error message 500
		}
		else res.send(db_data);
	});
}

var handler2 = function(req, res, next)
{
	var product_id = req.params.id;
	Model.findOne({'_id': product_id}, function(err, db_data)
	{
		if(err)
		{
			console.log('Database error!'.red);
			console.log(err);
			res.send(500, 'database error'); // Error message 500
		}
		else res.send(db_data);
	});
}

var handler3 = function(req, res, next)
{
	var new_model = new Model(req.body);
	new_model.save(function(err)
	{
		if(err)
		{
			res.send(400, err.name + ": " + err.message);
		}
		else res.send(200, new_model._id + " added succesfully");
	});
}

var handler4 = function(req, res, next)
{
	var product_id = req.params.id;
	Model.remove({'_id': product_id}, function(err, removed)
	{
		if(!removed)
		{
			res.send(200, 'document does not exist');
		}
		if(err)
		{
			res.send(400, err.name + ": " + err.message);
		}
		else res.send(200, product_id + " removed succesfully");
	});
}

var handler5 = function(req, res, next)
{
	var product_id = req.params.id;
	Model.update({'_id': product_id}, req.body, {multi: false},
	function(err, updated)
	{
		console.log(updated);
		if(!updated)
		{
			res.send(200, 'document does not exist');
		}
		if(err)
		{
			res.send(400, err.name + ": " + err.message);
		}
		else res.send(200, product_id + " updated succesfully");
	});
}

var handler6 = function(req, res, next)
{
	var attributes = {};
	
	for(attr in Model.schema.paths)
	{
		if(attr != '_id' && attr != '__v')
			attributes[attr] = attr;
	}
	
	res.send(attributes);
}

var routes = [{
	'name': 'list storage',
	'description': 'lists all storage items',
	'method': 'get',
	'route': name,
	'handler': handler
},
{
	'name': 'get item',
	'description': 'gets specific product from the database',
	'method': 'get',
	'route': name + "/:id",
	'handler': handler2
},
{
	'name': 'add item',
	'description': 'add item to the database',
	'method': 'post',
	'route': name,
	'handler': handler3
},
{
	'name': 'delete item',
	'description': 'delete specific product from the database',
	'method': 'delete',
	'route': name + '/:id',
	'handler': handler4
},
{
	'name': 'update item',
	'description': 'update specific product from the database',
	'method': 'put',
	'route': name + '/:id',
	'handler': handler5
},
{
	'name': 'get template',
	'description': 'get new document from the model (for creating purpose)',
	'method': 'get',
	'route': 'get_new/' + name,
	'handler': handler6
}];

module.exports.model = Model;
module.exports.routes = routes;

