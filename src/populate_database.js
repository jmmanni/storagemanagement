/*
 * Populate the database with dummy items, run only once
 */

var colors = require('colors');
var mongoose = require('mongoose');
var StorageItem = require('./models/StorageItem').model;

mongoose.connect('mongodb://localhost/storage');

var dummy_items = [
{
	'name': 'ruuvi',
	'category': 'part',
	'description': 'M6 25',
	'quantity': 125
},
{
	'name': 'naula',
	'category': 'part',
	'description': 'iso naula',
	'quantity': 25
},
{
	'name': 'mutteri',
	'category': 'part',
	'description': 'laalaa',
	'quantity': 125
},
{
	'name': 'ovi',
	'category': 'part',
	'description': 'puinen, 2m x 4m',
	'quantity': 5
}];

var added = 0;
for(i in dummy_items)
{
	var item = new StorageItem(dummy_items[i]);
	
	(function(item_name)
	{
		item.save(function(err)
		{
			if(err)	console.log(err);
			else console.log("%s added...".green, item_name);
			added++;
		
			if(added >= dummy_items.length)
			{
				mongoose.connection.close();
			}
		});
	})(dummy_items[i].name);
}

