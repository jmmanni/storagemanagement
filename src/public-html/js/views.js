/* This module defines views for models */

define(['backbone', 'mustache', 'app/templates', 'notify'],
function(_Backbone, Mustache, templates)
{
	var ListView = Backbone.View.extend({
		className: 'storage-item',
		initialize: function()
		{
			this.$el = $(Mustache.to_html(templates.list_view, this.model.attributes));
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
		initialize: function(params)
		{
			var modal_template = params.modal_template || templates.edit_modal;
			this.$el = $(Mustache.to_html(modal_template));
		},
		
		events: {
			'hidden.bs.modal': function()
			{
				this.$el.remove();
			},
			'click .btn-primary': function(collection)
			{
				var to_be_changed = [];
				$.each(this.model.changedAttributes(),
				function(attr, v)
				{
					to_be_changed.push(attr);
				});
				
				if(this.collection !== undefined)
				{
					this.collection.add(this.model);
				}
				
				this.model.save({}, {
					success: function(model, res, opts)
					{
						$.notify(res._id + " added/updated succesfully", {
							globalPosition: 'bottom right',
							className: 'success'
						});
					},
					error: function(model, res, opts)
					{
						$.notify(res.responseText, {
							globalPosition: 'bottom right',
							className: 'error'
						});
					}
				});
				this.$el.modal('hide');
			},
			'click .btn-danger': function()
			{
				if(this.model.id == undefined)
				{
					$.notify("cannot delete item without id", {
						className: "warn",
						globalPosition: "bottom right"
					});
					return;
				}
				
				this.model.destroy({
					success: function(model, res, opts)
					{
						$.notify(res._id + " removed succesfully", {
							globalPosition: 'bottom right',
							className: 'success'
						});
					},
					error: function(model, res, opts)
					{
						$.notify(res.responseText, {
							globalPosition: 'bottom right',
							className: 'error'
						});
					}
				});
				this.$el.modal('hide');
			}
		},
		
		render: function()
		{
			var attributes = [];
			(function(self)
			{
				var arr = [];
				$.each(self.model.attributes, function(i, v)
				{
					arr.push(i);
				});
				arr = arr.sort();
				$.each(arr, function(i, attr)
				{
					attributes.push({
						index: attr,
						value: self.model.get(attr)
					});
				});
			})(this);
			var modal_content = $(Mustache.to_html(templates.edit_view_form, {
				'attributes': attributes
			}));
			
			var model = this.model;
			this.$el.find('.modal-body').append(modal_content);
			this.$el.find('input[type=text][name="_id"]')
			.attr('disabled', 'true').addClass('no-edit');
			this.$el.find('input[type=text][name="__v"]')
			.attr('disabled', 'true').addClass('no-edit');
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
			this.$el.empty();
			var self = this;
			$.each(self.collection.models, function(i, model)
			{
				var item = new ListView({model: model}).render();
				self.$el.append(item);
			});
			return this.$el;
		}
	});
	
	return {
		ListView: ListView,
		CollectionView: CollectionView,
		EditView: EditView
	};
});

