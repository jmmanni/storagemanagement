exports.handler = function(Model)
{
	return function(req, res, next)
	{
		var searched = {};
		debugger;

		if(req.query != null){
			if(req.query.name != null)
			{
				searched.name = {$regex : req.query.name,$options:'i'};
			}
			if(req.query.category != null)
			{
				searched.category = {$regex : req.query.category,$options:'i'};
			} 
			if(req.query.description != null)
			{
				searched.description = {$regex : req.query.description,$options:'i'};
			}
			if(req.query.qtMax != null)
			{
				if(searched.quantity == null){searched.quantity = {}};
				searched.quantity.$lt = req.query.qtMax;
			}
			if(req.query.qtMin != null)
			{
				if(searched.quantity == null){searched.quantity = {}};
				searched.quantity.$gt = req.query.qtMin;
			}

		}
		Model.find(searched, function(err, db_data)
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
}

exports.handler2 = function(Model)
{
	return function(req, res, next)
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
}

exports.handler3 = function(Model)
{
	return function(req, res, next)
	{
		var new_model = new Model(req.body);
		new_model.save(function(err)
		{
			if(err)
			{
				res.send(400, err.name + ": " + err.message);
			}
			else
			{
				res.setHeader('Content-Type', 'application/json');
				res.send(200, new_model);
			}
		});
	}
}

exports.handler4 = function(Model)
{
	return function(req, res, next)
	{
		var product_id = req.params.id;
		Model.remove({'_id': product_id}, function(err, removed)
		{
			if(!removed)
			{
				res.send(400, 'document does not exist');
			}
			else if(err)
			{
				res.send(400, err.name + ": " + err.message);
			}
			else
			{
				res.setHeader('Content-Type', 'application/json');
				res.send(200, {_id: product_id});
			}
		});
	}
}

exports.handler5 = function(Model)
{
	return function(req, res, next)
	{
		var product_id = req.params.id;
		delete req.body._id;
		delete req.body.__v;
		Model.update({'_id': product_id}, req.body, {multi: false},
		function(err, updated)
		{
			if(err)
			{
				res.send(400, err.name + ": " + err.message);
			}
			else if(updated == undefined)
			{
				res.send(400, 'document does not exist');
			}
		
			else
			{
				req.body._id = product_id;
				res.setHeader('Content-Type', 'application/json');
				res.send(200, req.body);
			}
		});
	}
}

exports.handler6 = function(Model)
{
	return function(req, res, next)
	{
		var attributes = {};
	
		for(attr in Model.schema.paths)
		{
			if(attr != '_id' && attr != '__v')
				attributes[attr] = attr;
		}
	
		res.send(attributes);
	}
}
