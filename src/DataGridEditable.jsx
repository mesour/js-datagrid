export default class DataGridEditable
{

	create()
	{
		let _this = this;
		$('.mesour-datagrid').each(function () {
			let $this = $(this).find('[data-mesour-editable]');
			if ($this.is('*')) {
				let componentName = $this.attr('data-mesour-editable'),
					$el = jQuery('[data-mesour-editable="' + componentName + '"]');

				let edit = $el.find('[data-grid-is-edit]');
				edit.off('click.grid-editable');
				edit.on('click.grid-editable', function (e) {
					e.preventDefault();

					let $current = $(this);
					let element = _this.getEditableElement($current);
					let value = _this.getEditableValue($current);

					mesour.editable.getComponent(componentName).edit(element.name, element.element, element.id, value);
				});

				let add = $el.find('[data-grid-is-add]');
				add.off('click.grid-editable');
				add.on('click.grid-editable', function (e) {
					e.preventDefault();

					let element = _this.getEditableElement($(this));

					mesour.editable.getComponent(componentName).newEntry(element.name, element.element, element.id);
				});

				let remove = $el.find('[data-grid-is-remove]');
				remove.off('click.grid-editable');
				remove.on('click.grid-editable', function (e) {
					e.preventDefault();

					let $current = $(this);

					let element = _this.getEditableElement($current);
					let value = _this.getEditableValue($current);

					let confirmText = $current.attr('data-confirm');
					if (!confirmText || (confirmText && confirm(confirmText))) {
						mesour.editable.getComponent(componentName).remove(element.name, element.element, element.id, value);
					}
				});
			}
		});
	}

	live()
	{
		this.create();
		$('.mesour-datagrid').each(function () {
			let $this = $(this).find('[data-mesour-editable]');
			if ($this.is('*')) {
				let $edit = $this.find('[data-grid-edit]');
				if (!$edit.find('[data-grid-is-edit]').is('*')) {
					$edit.append('&nbsp;');
					$edit.append('<a data-grid-is-edit="true" role="button"><span class="fa fa-pencil"></span></a>');
				}
			}
		});
	}

	getEditableElement($el)
	{
		if (!$el.is('[data-grid-editable]')) {
			$el = $el.closest('[data-grid-editable]');
		}
		return {
			element: $el,
			name: $el.attr('data-grid-editable'),
			id: $el.attr('data-grid-id')
		};
	}

	getEditableValue($el)
	{
		if (!$el.is('[data-grid-value]')) {
			$el = $el.closest('[data-grid-value]');
		}
		return $el.attr('data-grid-value');
	}

}