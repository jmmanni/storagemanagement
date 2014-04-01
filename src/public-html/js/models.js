/* This module defines backbone models */

define(['backbone'], function(_Backbone)
{
	var StorageItemModel = Backbone.Model.extend({
		idAttribute: "_id",
		initialize: function()
		{
			//console.log(this.url);
		}
	});
	
	return {
		StorageItem: StorageItemModel
	};
});

