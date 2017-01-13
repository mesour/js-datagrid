export default class DataGridSortable
{

	attributeName = 'data-mesour-sortable';

	create()
	{
		let tbody = $('[' + this.attributeName + ']').children('tbody'),
			_this = this;
		if(!tbody.is('*') || typeof tbody.sortable !== 'function') {
			return;
		}

		tbody.sortable({
			disableNesting: 'no-child',
			forcePlaceholderSize: true,
			autoScroll: true,
			handle: 'a.handler',
			listType: 'tbody',
			helper: 'clone',
			items: '> tr:not(.no-sort)',
			maxLevels: $('a#sort_href').attr("title"),
			opacity: .6,
			placeholder: 'placeholder',
			revert: 250,
			tabSize: 25,
			tolerance: 'pointer',
			toleranceElement: '> td',
			stop: function (a, b) {
				let item_id = b.item.attr('id').split('-');
				let $this = $(this);
				let data = {
					data: $this.sortable('serialize'),
					item: item_id[item_id.length - 1]
				};
				_this.sendData($this.closest('[' + _this.attributeName + ']').attr(_this.attributeName), data)
			},
			start: function (a, b) {
				let sorted;
				$(this).find('.no-sort').remove();
				if (b.placeholder.is('tr') && sorted == undefined) {
					let x = 0;
					$('thead tr th', $(a.currentTarget).closest('table')).each(function () {
						x++;
						$('td:nth-child(' + x + ')', b.helper).css('width', $(this).width());
					});

					$(b.placeholder).find('td').css('height', $(b.placeholder).next('tr').outerHeight());

					sorted = true;
				} else if (sorted == true) {
					sorted = false;
				}
			}
		});
	}

	live()
	{
		this.create();
	}

	sendData (name, data)
	{
		let result = mesour.url.createLink(name, 'sortData', data, true);
		$.post(result[0], result[1]).complete(mesour.redrawCallback);
	}

}