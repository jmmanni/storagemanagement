/* This module loads templates */

define(['text!templates/storage_item_list_view',
'text!templates/edit_modal',
'text!templates/edit_view',
'text!templates/create_modal',
'text!templates/create_view',
'text!templates/service_panel',
'text!templates/service_button',
'text!templates/login'],
function(list_view_template,
edit_modal_template,
edit_form_template,
create_modal_template,
create_form_template,
service_panel,
service_button,
login)
{
	return {
		list_view_template: list_view_template,
		edit_modal_template: edit_modal_template,
		edit_form_template: edit_form_template,
		create_modal_template: create_modal_template,
		create_form_template: create_form_template,
		service_panel: service_panel,
		service_button: service_button,
		login: login
	}
});

