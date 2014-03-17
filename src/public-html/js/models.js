/* This module defines backbone models */

define(['backbone'], function(_Backbone)
{
	var StorageItemModel = Backbone.Model.extend({
		idAttribute: "_id",
		urlRoot: "/storageitem"
	});
	
	return {
		StorageItem: StorageItemModel
	};
});

