export default class DataGrid
{

	items = {};
	resetButtonSpace = 35;
	orderIconWidth = 30;

	setRelation(gridName, tableName, data)
	{
		if (!this.items[gridName]) {
			this.items[gridName] = {
				relations: {}
			};
		}
		if (!this.items[gridName].relations[tableName]) {
			this.items[gridName].relations[tableName] = {};
		}
		this.items[gridName].relations[tableName] = data;
	}

	live()
	{
		let grids = $('.mesour-datagrid'),
			_this = this;

		grids.find('.only-buttons').each(function () {
			$(this).closest('td').addClass('actions-column');
		});

		grids.find('[data-mesour-enabled-filter="1"]').find('.selection-dropdown').each(function () {
			$(this).before('<span class="fake-header">&nbsp;</span>');
		});

		grids.each(function() {
			let $this = $(this);
			$this
				.find('tr th')
				.filter(':not(.sortable-column):not(.act-select):not(.grid-column-action)')
				.each(function() {
				let $this = $(this),
					contents = $this.contents(),
					minWidth = $this.css('min-width');
				if (!minWidth || minWidth === '0' || minWidth === '0px') {
					let width = contents.outerWidth();

					let rowTitle = $this.find('a, span').filter(':first'),
						realWidth = 0;
					if (rowTitle.is('a')) {
						rowTitle.find('span:not(.order-asc):not(.order-desc)').each(function() {
							realWidth = realWidth + $(this).outerWidth();
						});
					} else {
						realWidth = rowTitle.outerWidth();
					}
					realWidth = realWidth + _this.orderIconWidth;

					if (width < realWidth) {
						$this.css('min-width', realWidth);
					}
				}
			});

			$this.find('tr th:last-child .mesour-filter-dropdown').each(function() {
				let $this = $(this),
					$reset = $this.prev('.full-reset');
				if ($reset.is('*') && !$reset.closest('.right-tools').is('*')) {
					let span = jQuery('<span class="right-tools">'),
						width = _this.resetButtonSpace;

					$this.after(span);
					span.append($this);
					span.append($reset);

					width = width + $this.width();
					width = width + $reset.width();

					$this.closest('th').css('min-width', width);
					$this.find('.dropdown-menu').addClass('dropdown-menu-right');
				}
			});

			let outerWidth = $this.find('table.table:first').outerWidth();
			$this.width(outerWidth);
			$this.find('.mesour-datagrid-pager:last, .mesour-datagrid-filter:first').width(outerWidth);
		});

		$('[data-mesour-toggle="tooltip"]').tooltip();
	}

}