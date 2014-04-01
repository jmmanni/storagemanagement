/* This module loads templates */

define(['text!templates/storage_item_list_view',
'text!templates/item_edit_modal',
'text!templates/item_edit_view',
'text!templates/create_view',
'text!templates/service_panel',
'text!templates/service_button',
'text!templates/login'],
function(list_view_template,
modal_template,
edit_template,
create_template,
service_panel,
service_button,
login)
{
	return {
		edit_view_form: edit_template,
		create_modal: create_template,
		edit_modal: modal_template,
		list_view: list_view_template,
		service_panel: service_panel,
		service_button: service_button,
		login: login
	}
});

