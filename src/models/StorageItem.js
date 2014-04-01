var mongoose = require('mongoose');
var services = require('../services/generic_crud');

var name = 'storageitem'
var default_attributes = {
	name: 'part name',
	description: 'description',
	quantity: 0,
	category: '',
}

var Schema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: true},
	quantity: {type: Number, required: true},
	category: {type: String, required: true}
});

var Model = mongoose.model('StorageItem', Schema);

var routes = [{
	'name': 'list storage',
	'description': 'lists all storage items',
	'method': 'get',
	'route': name,
	'handler': services.handler(Model)
},
{
	'name': 'get item',
	'description': 'gets specific product from the database',
	'method': 'get',
	'route': name + "/:id",
	'handler': services.handler2(Model)
},
{
	'name': 'add item',
	'description': 'add item to the database',
	'method': 'post',
	'route': name,
	'handler': services.handler3(Model)
},
{
	'name': 'delete item',
	'description': 'delete specific product from the database',
	'method': 'delete',
	'route': name + '/:id',
	'handler': services.handler4(Model)
},
{
	'name': 'update item',
	'description': 'update specific product from the database',
	'method': 'put',
	'route': name + '/:id',
	'handler': services.handler5(Model)
},
{
	'name': 'get template',
	'description': 'get new document from the model (for creating purpose)',
	'method': 'get',
	'route': 'get_new/' + name,
	'handler': services.handler6(Model)
}];

module.exports.model = Model;
module.exports.routes = routes;

