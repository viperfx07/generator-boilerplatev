'use strict';
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

///////////////
// Libraries //
///////////////

///////////////////
// Umbraco Forms //
///////////////////
/**
 * 	There are two types umbraco forms: Umbraco Forms and Contour Forms
 * 	The one we're using is the Umbraco Forms.
 * 	The source of below scripts are from SundownersOverland.Web/App_Plugins/UmbracoForms/Assets/themes/default/*.js
 *
 *  Countour Form ones are from SundownersOverland.Web/App_Plugins/UmbracoForms/Assets/*.js
 */
import './custom_vendors/umbracoforms-dependencies';
import './custom_vendors/umbracoforms';
import './custom_vendors/umbracoforms-conditions';


// Don't know why babel doesn't transpile ssm. Changed to the minified one
import ssm from 'simplestatemanager/dist/ssm.min';
import mh from 'jquery-match-height';
import JSON5 from 'json5';

import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
import 'lazysizes';

// Note for lazysizes
// Need to do "mobile size first"
// If you define bgset="imageA sizeA, imageB sizeB", then if the B is loaded first, the A won't load although it matches the size requirement
// If you define bgset="imageA sizeA, imageB sizeB", then if the A is loaded first, B will load if it matches the size requirement

// To define with media query, do the ones that have mediaquery first, then the ones without
// If you define with media query, it will load based on the set media query

window.lazySizesConfig.lazyClass = 'js-lazysizes';
window.lazySizesConfig.loadedClass = 'is-lazysizes-loaded';
window.lazySizesConfig.loadingClass = 'is-lazysizes-loading';

/////////////
// Plugins //
/////////////
import 'bootstrap-sass/assets/javascripts/bootstrap/collapse';
import 'bootstrap-sass/assets/javascripts/bootstrap/dropdown';
import 'bootstrap-sass/assets/javascripts/bootstrap/transition';
import 'bootstrap-sass/assets/javascripts/bootstrap/tab';

import Headroom from 'headroom.js';

////////////////
// Utils      //
////////////////
import vtoggle from './utils/vtoggle';
import triggerer from './utils/triggerer';
import scrollTo from './utils/scrollto';
import HeaderUtil from './utils/HeaderUtil';

// Setting Webpack public path dynamically so that it loads the utils
// from the folder where the main.js is located
var bundleSrc = $('[src$="/main.js"]').attr("src");
__webpack_public_path__ = bundleSrc.substr(0, bundleSrc.lastIndexOf("/") + 1);

$(() => {
    /////////////////////////////
    // Match Height Customized //
    /////////////////////////////
	require('./utils/custom-matchheight');

	///////////
	// Slick //
	///////////
	let $jsSlick = $('[data-slickjs]');
	if ($jsSlick.length) {
		require.ensure([], () => {
			require('./utils/slicker')($jsSlick);
		}, 'slicker');
	}

	//////////////////////
    // Responsive Table //
    //////////////////////
    const $table = $('.o-richtext table:not([class])');
    if ($table.length) {
        $table.wrap('<div class="u-table-responsive">');
    }

    //////////////////
	// Init Toggler //
	//////////////////
	vtoggle($('[data-vtoggle]'));

	///////////////
	// Triggerer //
	///////////////
	triggerer($('[data-triggerer]'));

	/////////////
	// FocusOn //
	/////////////
	let $focusOn = $('[data-focuson]');
	if ($focusOn.length) {
		require.ensure([], () => {
			require('./utils/FocusOn')($focusOn);
		}, 'focuson');
	}

	////////////////
	// Scroll To //
	////////////////
	scrollTo($('[data-scrollto]'));

	//////////////
	// Headroom //
	//////////////
	const setStickyHeight= (el, isReset)=>{
		const $this = $(el);
		const $parent = $this.closest('[data-sticky]');
		if(isReset){
			$parent.data('height', $parent.height())
		}
		$parent.css('height', isReset ? 'auto' : $parent.data('height'));
	};
	$('[data-headroom]').each(function(){
		const $this = $(this);
		const attr = $this.attr('data-headroom');

		const defaultOptions = {
			classes:{
				pinned: "is-pinned",
				unpinned: "is-unpinned",
				top: "is-top",
				notTop: "is-not-top",
				top: "is-top",
				bottom: "is-bottom",
				notBottom: "is-not-bottom"
			},
			onTop(){
				$(this.elem).removeClass('has-transition');
				setStickyHeight(this.elem, true);
			},
			onNotTop(){
				const $this = $(this.elem);
				setStickyHeight(this.elem, false);
				setTimeout(() => {
					if(!$this.hasClass('has-transition')){
						$this.addClass('has-transition');
					}
				}, 0);
			}
		};

		const OPTS ={
			"header": {...defaultOptions},
			"product-quote": {...defaultOptions}
		};

		let attrs= attr ? JSON5.parse(attr) : {};
		let opt = (attrs.key) ? {...OPTS[attrs.key], ...attrs} : {};

		const headroom =  new Headroom(this, opt);
		headroom.init();
	});

	////////////////////
	// Magnific Popup //
	////////////////////
	const $magnificPopup = $("[data-magnificpopup]");
	if($magnificPopup.length){
		require.ensure([], function(){
			require('magnific-popup');

			const OPTS = {
				"iframe": {
					type: 'iframe',
					iframe: {
						patterns: {
							youtu: {
								index: 'youtu.be/',
								id: function( url ) {
									// Capture everything after the hostname, excluding possible querystrings.
									var m = url.match( /^.+youtu.be\/([^?]+)/ );
									if ( null !== m ) {
										return m[1];
									}
									return null;
								},
								// Use the captured video ID in an embed URL.
								// Add/remove querystrings as desired.
								src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0'
							}
						}
					}
				}
			};

			$magnificPopup.each(function(){
				const $this = $(this);
				const key = $this.attr('data-magnificpopup');
				$this.magnificPopup(OPTS[key]);
			})
		}, 'magnificpopup');
	}

	////////////
	// Header //
	////////////
	HeaderUtil.initMegamenu();
	HeaderUtil.initCloseOffCanvas();


	/////////
	// SSM //
	/////////
	ssm.addStates([{
		id: 'xs',
		query: '(max-width: 767px)',
		onEnter: () => {
			console.info('enter <=767px');
		},
		onLeave: () => {
			console.info('leave <=767px');
		},
	}, {
		id: 'sm',
		query: '(max-width: 991px)',
		onEnter: () => {
			console.info('enter <=991');
		},
		onLeave: () => {
			console.info('leave <=991');
		}
	}, {
		id: 'md',
		query: '(max-width: 1199px)',
		onEnter: () => {
			console.info('enter <=1199px');
		},
		onLeave: () => {
			console.info('leave <= 1199px');
		}
	}, {
		id: 'desktop',
		query: '(min-width: 992px)',
		onEnter: () => {
			console.info('enter >= 992px');
		},
		onLeave: () => {
		}
	} ]);
});
