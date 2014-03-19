require.config({
	baseUrl: 'js/lib',
	paths: {
		jquery: 'jquery-2.1.0',
		templates: '../../templates',
		app: '..'
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
'app/wrapper',
'backbone'],
function($, bootstrap, Mustache, wrapper)
{
	var services = wrapper.service_panel;
	$(document).ready(function()
	{
		var service_panel = services.create_service_panel();
		//$('.container').append($(Mustache.to_html(wrapper.templates.login)));
		$('#menu').append(service_panel);
	});
});

