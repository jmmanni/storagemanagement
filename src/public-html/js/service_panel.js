/* This defines client side service panel */

define(['jquery', 'mustache', 'app/views', 'app/models', 'app/templates', 'backbone'], function($, Mustache, views, models, templates)
{
	var collection = new Backbone.Collection();
	var get_storage_status = function()
	{
		$.ajax({
			url: 'storageitem',
			type: 'get',
			success: function(data)
			{
				$.each(data, function(i, v)
				{
					var new_model = new models.StorageItem(v);
					/*var new_view = new ModelView({
						model: new_model
					});*/
				
					collection.add(new_model);
				});
				var collection_view = new views.CollectionView({
					collection: collection
				});
				
				$('#output').append(collection_view.render());
			}
		});
	}
	
	var get_services = function()
	{
		$.ajax({
			url: 'get_services',
			type: 'get',
			success: function(data)
			{
				$.each(data, function(i, s)
				{
					//console.log(s);
					$('#output').append($('<pre>').append(JSON.stringify(s)));
				});
			}
		});
	}
	
	var add_item = function()
	{
		$.ajax({
			url: 'get_new/storageitem',
			type: 'get',
			success: function(data)
			{
				//console.log(data);
				var new_model = new models.StorageItem(data);
				var new_view = new views.EditView({model: new_model});
				new_view.render().modal();
			}
		});
	}
	
	var create_service_panel = function()
	{
		var buttons = [
			{
				'name': 'Storage status',
				'description': 'List all items in storage',
				'action': get_storage_status
			},
			{
				'name': 'Add item',
				'description': 'Add new item to storage',
				'action': add_item
			},
			{
				'name': 'Get services',
				'description': 'List all available services',
				'action': get_services
			},
			{
				'name': 'Clear output',
				'description': 'Clears the output',
				'action': function()
				{
					$('#output').empty();
				}
			}
		];
		var service_panel = $(Mustache.to_html(templates.service_panel));
				
		$.each(buttons, function(i, button_attributes)
		{
			var new_button = $(Mustache.to_html(templates.service_button, button_attributes)).click(button_attributes.action);
			new_button.tooltip({container: 'body'});
			service_panel.append(new_button);
		});
				
		return service_panel;
	}
	
	return {
		create_service_panel: create_service_panel
	}
});
