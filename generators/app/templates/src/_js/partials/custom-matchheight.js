'use strict';
import mh from 'jquery-match-height';
import JSON5 from 'json5';

//////////////////
// Match Height //
//////////////////

/**
 * Standard Match Height with some customisation
 * IMPORTANT: don't use data-mh
 * 
 * 1. It can be grouped using data-mh-group, same as data-mh
 * 2. but can also set the options using data attribute as well i.e. data-mh-options
 * 
 * data-mh-group is different from data-mh data-mh can be used natively straight from matchHeight 
 * data-mh-group (require data-mh-options if needed) should be used like data-mh-group='groupName' that will be used as a selector
 * data-mh-options will be used for the options of the match height
 */

let $jsMh = $('[data-mh-group]');
if ($jsMh.length) {
    let groupArray = [];
    $jsMh.each(function(i, el) {
        let $el = $(el);
        let mhOptions = $el.attr('data-mh-options');
        let mhGroup = $el.attr('data-mh-group');
        let jsMhOptions = {};
        if (mhGroup) {
            if (mhOptions) {
                jsMhOptions = JSON5.parse(mhOptions);
            }

            if (!(groupArray.filter(item => item.group == mhGroup)).length) {
                groupArray.push({ group: mhGroup, options: jsMhOptions });
            }
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