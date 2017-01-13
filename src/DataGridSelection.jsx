export default class DataGridSelection
{

	attributeName = 'data-mesour-gridselection';
	ajaxAttribute = 'data-mesour-selection';
	dropDownAttr = 'data-mesour-selectiondropdown';

	sendData(name, linkName, ajax)
	{
		let data = {
			items: window.mesour.selection.getValues(name),
			name: linkName
		};
		if (ajax) {
			let result = window.mesour.url.createLink(name, 'onSelect', data, true);
			$.post(result[0], result[1]).complete(window.mesour.redrawCallback);
		} else {
			window.location.href = window.mesour.url.createLink(name, 'onSelect', data);
		}
	}

	live()
	{
		let names = {},
			_this = this;
		$('[' + this.attributeName + ']')
			.each(function () {
				let $this = $(this),
					name = $this.attr(_this.attributeName);
				names[name] = name;
			})
			.off('click.grid-selection')
			.on('click.grid-selection', function (e) {
				e.preventDefault();

				let $this = $(this),
					name = $this.attr(_this.attributeName),
					linkName = $this.attr('data-name'),
					isAjax = $this.is('[' + _this.ajaxAttribute + '=ajax]'),
					_confirm = $this.attr('data-confirm');

				if (_confirm) {
					if (!confirm(_confirm)) {
						return;
					}
				}
				_this.sendData(name, linkName, isAjax);
			});

		let CallbackManager = function () {
			let currentName, items;

			this.setName = function (newName) {
				currentName = newName;
			};

			this.setItems = function (newItems) {
				items = newItems;
			};

			this.callback = () => {
				let values = window.mesour.selection.getValues(currentName),
					matchCount = 0;
				for (let j in values) {
					if (values[j]) {
						matchCount++;
					}
				}
				let button = $('[' + this.dropDownAttr + '="' + currentName + '"]').children('button'),
					counter = button.find('[data-selection-counter]');
				if (!counter.is('*')) {
					counter = $('<span data-selection-counter="1"></span>');
					button.find('.caret').before(counter);
				}
				counter.text('(' + matchCount + ') ');
				if (matchCount > 0) {
					button.removeClass('disabled');
				} else {
					button.addClass('disabled');
				}

				items.each(function () {
					let $_this = $(this),
						checked = $_this.hasClass('btn-warning');
					if (checked) {
						$_this.closest('td').closest('tr').addClass('checked');
					} else {
						$_this.closest('td').closest('tr').removeClass('checked');
					}
				});
			};
		};

		for (let i in names) {
			let items = window.mesour.selection.getItems(names[i]),
				currentName = names[i];

			let instance = new CallbackManager();
			instance.setItems(items);
			instance.setName(currentName);

			items.off('change.selection');
			items.on('change.selection', instance.callback);

			let mainCheckbox = window.mesour.selection.getMainCheckbox(currentName);
			mainCheckbox.off('change.selection');
			mainCheckbox.on('change.selection', instance.callback);
		}
	}

}