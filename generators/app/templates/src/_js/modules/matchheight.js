'use strict';
import 'jquery-match-height';
import JSON5 from 'json5';

//////////////////
// Match Height //
//////////////////

/**
 * Standard Match Height with some customisation
 * IMPORTANT: don't use data-mh
 *
 * 1. It can be grouped using data-mh-group='groupName', same as data-mh='groupName'
 * 2. but can also set the options using data attribute as well i.e. data-module-options
 *
 */

export default els =>{
	const $jsMh = $('[data-module="matchheight"]');
	if ($jsMh.length) {
		let groupArray = [];
		$jsMh.each(function(i, el) {
			let $el = $(el);
			let mhOptions = $el.attr('data-module-options');
			let group = $el.attr('data-mh-group');
			const jsMhOptions = JSON5.parse(mhOptions);

			if (!(groupArray.filter(item => item.group == group)).length) {
				groupArray.push({ group, options: jsMhOptions });
			}
		});

		groupArray.forEach(function(obj) {
			// if nonFlexBrowserOnly is enabled, check whether the browser is > ie9 or not
			// if it's <= ie9, proceed
			if(!(obj.options.nonFlexBrowserOnly && $('.lt-ie10').length == 0)){
				$(`[data-mh-group="${obj.group}"]`).matchHeight(obj.options);
			}
		});
	}
}
