require.config({
	baseUrl: 'js/lib',
	paths: {
		jquery: 'jquery-2.1.0',
		templates: '../../templates'
	},
	shim: {
		deps: ['underscore', 'jqurey'],
		exports: 'Backbone'
	}
});

require(['jquery', 'mustache', 'text!templates/test_view', 'backbone'],
function($, Mustache, template_text)
{
	var ModelView = Backbone.View.extend({
		className: 'storage-item',
		initialize: function()
		{
			console.log(this.model.attributes);
		},
		
		render: function()
		{
			var attributes = [];
			(function(self)
			{
				$.each(self.model.attributes, function(i, v)
				{
					attributes.push({
						index: i,
						value: v
					});
				});
			})(this);
			console.log({'attributes': attributes});
			var c = $(Mustache.to_html(template_text,
			{'attributes': attributes}));
			this.$el.append(c);
			console.log(this.$el);
			return this.$el;
		}
	});
	
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
					var new_model = new Backbone.Model(v);
					var new_view = new ModelView({
						model: new_model
					});
				
					collection.add(new_model);
					$('#output').append(new_view.render());
				});
			}
		});
	}
	
	$(document).ready(function()
	{
		$('#get_status_btn').click(get_storage_status);
	});
});

