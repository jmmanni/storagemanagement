require.config({
	baseUrl: 'js/lib',
	paths: {
		jquery: 'jquery-2.1.0',
		templates: '../../templates'
	},
	shim: {
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		underscore: {
			exports: '_'
		},
		bootstrap: {
			deps: ['jquery']
		}
	}
});

require(['jquery', 'bootstrap', 'mustache',
'text!templates/storage_item_list_view',
'text!templates/item_edit_modal',
'text!templates/item_edit_view',
'text!templates/service_panel',
'text!templates/service_button',
'backbone'],
function($, bootstrap, Mustache, list_view, edit_modal, edit_view, panel_view, button_view)
{
	var Model = Backbone.Model.extend({
		idAttribute: "_id",
		url: '/storageitem'
	});
	
	var ListView = Backbone.View.extend({
		className: 'storage-item',
		initialize: function()
		{
			this.$el = $(Mustache.to_html(list_view, this.model.attributes));
		},
		
		
		events: {
			'click': function() {
				var edit_view = new EditView({model: this.model});
				edit_view.render().modal();
			}
		},
		
		render: function()
		{
			return this.$el;
		}
	});
	
	var EditView = Backbone.View.extend({
		initialize: function()
		{
			this.$el = $(Mustache.to_html(edit_modal));
		},
		
		events: {
			'hidden.bs.modal': function()
			{
				this.$el.remove();
			},
			'click .btn-primary': function()
			{
				this.model.save();
				this.$el.modal('hide');
			}
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
			var modal_content = $(Mustache.to_html(edit_view, {
				'attributes': attributes
			}));
			
			var model = this.model;
			this.$el.find('.modal-body').append(modal_content);
			this.$el.find('input[type=text]').on('change', function()
			{
				var s = {};
				var i = $(this).attr('name');
				var v = $(this).val();
				
				s[i] = v;
				
				model.set(s);
			});
			return this.$el;
		}
	});
	
	var CollectionView = Backbone.View.extend({
		className: 'storage-item-list',
		tagName: 'ul',
		initialize: function()
		{
			
		},
		
		render: function()
		{
			var self = this;
			$.each(self.collection.models, function(i, model)
			{
				//console.log(list_view)
				var item = new ListView({model: model}).render();
				self.$el.append(item);
			});
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
					var new_model = new Model(v);
					/*var new_view = new ModelView({
						model: new_model
					});*/
				
					collection.add(new_model);
				});
				var collection_view = new CollectionView({
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
				var new_model = new Model(data);
				var new_view = new EditView({model: new_model});
				new_view.render().modal();
			}
		});
	}
	
	var create_services = function(append_point)
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
			}
		];
		var control_panel = $(Mustache.to_html(panel_view));
				
		$.each(buttons, function(i, button)
		{
			var new_button = $(Mustache.to_html(button_view, button)).click(button.action);
			new_button.tooltip({container: 'body'});
			control_panel.append(new_button);
		});
				
		$(append_point).append(control_panel);
	}
	
	$(document).ready(function()
	{
		create_services('#menu');
	});
});

