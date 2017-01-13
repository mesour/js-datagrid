import DataGrid from './DataGrid.jsx';
import DataGridEditable from './DataGridEditable.jsx';
import DataGridSelection from './DataGridSelection.jsx';
import DataGridSortable from './DataGridSortable.jsx';

import Modal from 'mesour-modal/lib/Modal';
import DateTime from 'mesour-datetime/lib/DateTime';
import Editable from 'mesour-editable/lib/EditableWidget';
import Popover from 'mesour-editable/lib/PopoverWidget';
import Validator from 'mesour-validator/lib/Validator';
import Selection from 'mesour-selection/lib/Selection';
import Pager from 'mesour-pager/lib/Pager';
import Filter from 'mesour-filter/lib/FilterWidget';

import 'mesour-core/dist/mesour.min.js';

(function(mesour) {
	mesour.createWidget('datetime', new DateTime());
	mesour.createWidget('validator', new Validator());
	mesour.createWidget('modal', new Modal());
	mesour.createWidget('pager', new Pager());
	mesour.createWidget('selection', new Selection(
		mesour.selection && mesour.selection.userOptions ? mesour.selection.userOptions : {}
	));
	mesour.createWidget('filter', new Filter());
	mesour.createWidget('editable', new Editable());
	mesour.createWidget('popover', new Popover());

	mesour.createWidget('gridEditable', new DataGridEditable());
	mesour.createWidget('gridSelection', new DataGridSelection());
	mesour.createWidget('gridSortable', new DataGridSortable());
	mesour.createWidget('grid', new DataGrid());
})(window.mesour);

import './../node_modules/mesour-pager/sass/style.sass';
import './../node_modules/mesour-editable/scss/style.scss';
import './../node_modules/mesour-filter/scss/style.scss';
import './../node_modules/mesour-selection/sass/style.sass';
import './../scss/style.scss';

export default DataGrid;