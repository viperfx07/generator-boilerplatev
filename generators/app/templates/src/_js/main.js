"use strict";

/**
 * Some useful packages (you can install by using npm)
 * 1. slick-carousel (pre-installed) = Simple, easy, responsive carousel (buggy centerMode - variableWidth - lazyMode)
 * 2. jquery-match-height (pre-installed) = Use this to match the height of elements. Either use this or Equalizer from Foundation
 *
 * IMPORTANT:
 * To import async-ly, you need to wrap your codes in require.ensure([], () => { });
 * It's best not to async plugins, to leverage browser cache
 * Ref: https://webpack.js.org/guides/code-splitting/
 *
 * NOTES:
 * This boilerplate uses CDN/external for jQuery/React package. Configured in gulp/webpack.js.
 * This to prevent the needs of jQuery/React from node_modules
 */

// /////////////
// Libraries //
// /////////////

// /////////////////
// Umbraco Forms //
// /////////////////
/**
 * 	There are two types umbraco forms: Umbraco Forms and Contour Forms
 * 	The one we're using is the Umbraco Forms.
 * 	The source of below scripts are from SundownersOverland.Web/App_Plugins/UmbracoForms/Assets/themes/default/*.js
 *
 *  Countour Form ones are from SundownersOverland.Web/App_Plugins/UmbracoForms/Assets/*.js
 */
// import './custom_vendors/umbracoforms-dependencies';
// import './custom_vendors/umbracoforms';
// import './custom_vendors/umbracoforms-conditions';

// Don't know why babel doesn't transpile ssm. Changed to the minified one
import * as conditioner from "conditioner-core";
// import ssm from 'simplestatemanager';
import JSON5 from "json5";
import "feature.js";

import "lazysizes/plugins/respimg/ls.respimg";
import "lazysizes/plugins/attrchange/ls.attrchange";
import "lazysizes/plugins/bgset/ls.bgset";
import "lazysizes/plugins/unveilhooks/ls.unveilhooks";
import "lazysizes";

// ///////////
// Plugins //
// ///////////
import "bootstrap/js/src/collapse";
import "bootstrap/js/src/dropdown";
import "bootstrap/js/src/tab";

// //////////////
// Utils      //
// //////////////
import HeaderUtil from "./modules/HeaderUtil";

// Note for lazysizes
// Need to do "mobile size first"
// If you define bgset="imageA sizeA, imageB sizeB", then if the B is loaded first, the A won't load although it matches the size requirement
// If you define bgset="imageA sizeA, imageB sizeB", then if the A is loaded first, B will load if it matches the size requirement

// To define with media query, do the ones that have mediaquery first, then the ones without
// If you define with media query, it will load based on the set media query

window.lazySizesConfig.lazyClass = "js-lazysizes";
window.lazySizesConfig.loadedClass = "is-lazysizes-loaded";
window.lazySizesConfig.loadingClass = "is-lazysizes-loading";

// Setting Webpack public path dynamically so that it loads the utils
// from the folder where the main.js is located
const bundleSrc = $('[src*="/main.js"]').attr("src");
__webpack_public_path__ = bundleSrc.substr(0, bundleSrc.lastIndexOf("/") + 1);

if (!window.feature.touch) {
	import(/* webpackMode: "lazy" */ /* webpackChunkName: "smoothscroll" */ "smoothscroll-for-websites").then(
		({ default: SmoothScroll }) => {
			SmoothScroll({ animationTime: 800 });
		}
	);
}

$(() => {
	// /////////////////////////////
	// Dynamic Lazy Load Modules //
	// /////////////////////////////
	conditioner.addPlugin({
		// converts module aliases to paths
		moduleSetName: name => `${name}`,

		// use default exports as constructor
		moduleGetConstructor: module => module.default,

		moduleImport: name =>
			import(/* webpackMode: "lazy" */ /* webpackChunkName: "[request]" */ `./modules/${name}`),

		moduleSetConstructorArguments: (name, el) => {
			const $el = $(el);
			let opts = {};
			try {
				if (!!$el.attr("data-module-options")) {
					opts = {
						...opts,
						...JSON5.parse($el.attr("data-module-options"))
					};
				}
				return [el, $el, opts];
			} catch (err) {
				console.error(err);
				return [el, $el, opts];
			}
		}
	});
	conditioner.hydrate(document.documentElement);

	// ////////////////////
	// Responsive Table //
	// ////////////////////
	const $table = $(".o-richtext table:not([class])");
	if ($table.length) {
		$table.wrap('<div class="u-table-responsive">');
	}

	// //////////
	// Header //
	// //////////
	HeaderUtil.initMegamenu();
	HeaderUtil.initCloseOffCanvas();

	// ///////
	// SSM //
	// ///////
	// ssm.addStates([{
	// 	id: 'xs',
	// 	query: '(max-width: 767px)',
	// 	onEnter: () => {
	// 		console.info('enter <=767px');
	// 	},
	// 	onLeave: () => {
	// 		console.info('leave <=767px');
	// 	},
	// }, {
	// 	id: 'sm',
	// 	query: '(max-width: 991px)',
	// 	onEnter: () => {
	// 		console.info('enter <=991');
	// 	},
	// 	onLeave: () => {
	// 		console.info('leave <=991');
	// 	}
	// }, {
	// 	id: 'md',
	// 	query: '(max-width: 1199px)',
	// 	onEnter: () => {
	// 		console.info('enter <=1199px');
	// 	},
	// 	onLeave: () => {
	// 		console.info('leave <= 1199px');
	// 	}
	// }, {
	// 	id: 'desktop',
	// 	query: '(min-width: 992px)',
	// 	onEnter: () => {
	// 		console.info('enter >= 992px');
	// 	},
	// 	onLeave: () => {
	// 	}
	// } ]);
});
