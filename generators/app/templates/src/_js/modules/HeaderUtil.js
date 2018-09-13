'use strict';
import '../custom_vendors/jquery-accessibleMegaMenu';

export default class HeaderUtil {
	static initMegamenu() {
		const options = {
			"mainnav": {
				/* prefix for generated unique id attributes, which are required
					   to indicate aria-owns, aria-controls and aria-labelledby */
				uuidPrefix: "mainnav-megamenu",

				/* css class used to define the megamenu styling */
				menuClass: "c-nav-main__menu",

				/* css class for a top-level navigation item in the megamenu */
				topNavItemClass: "c-nav-main__item",

				/* css class for a megamenu panel */
				panelClass: "c-nav-main__subnav",

				/* css class for a group of items within a megamenu panel */
				panelGroupClass: "js-megamenu-panelgroup",

				/* css class for the hover state */
				hoverClass: "is-hover",

				/* css class for the focus state */
				focusClass: "is-focus",

				/* css class for the open state */
				openClass: "is-open",

				// hover intent
				openDelay: 50,

				onTopLiClosed(){
					$('html').removeClass('is-navmain-active');
				},
				onTopLiOpened(){
					const $opened = $('.c-nav-main').find('.is-open');
					if($opened.length){
						if($opened.closest('.has-sub').length || $opened.hasClass('has-sub')){
							$('html').addClass('is-navmain-active');
						}
					}
				}
			}
		};

		$('[data-megamenu]').each(function() {
			let $this = $(this);
			let opt = options[$this.attr('data-megamenu')];
			if (opt) {
				$this
					.on('topliclosed.accessible-megamenu', function(){
						opt.onTopLiClosed();
					})
					.on('topliopened.accessible-megamenu', function(){
						opt.onTopLiOpened();
					})
					.accessibleMegaMenu(opt);
			}
		});
	}

	static initCloseOffCanvas() {
		let $wrapper = $('html');

		const closeHandler = function() {

			if ($wrapper.hasClass('is-menu-active')) {
				$('.js-mobilemenutoggle').trigger('click');
			} else if ($wrapper.hasClass('is-search-active')) {
				$wrapper[0].classList.remove(...[...$wrapper[0].classList].filter(x=> x.match(/is-search-.*active/)));
			} else if ($wrapper.hasClass('is-flyinoffcanvas-active')) {
				$wrapper.addClass('is-flyinoffcanvas-active-is-loading');
				$wrapper.removeClass('is-flyinoffcanvas-active');
				setTimeout(()=>{
					$wrapper.removeClass('is-flyinoffcanvas-active-is-loading');
				}, 501);
			}
		}

		$('.js-closeoffcanvas').off('click').click(closeHandler);
		$wrapper.on('keydown.dismiss.offcanvas', $.proxy(function(e){
			e.which == 27 && closeHandler();
		}, this));
	}

	static initClearSearch() {
		// data-clearsearch="[target]"
		$('[data-clearsearch]').off('click').click(function() {
			$($(this).data('clearsearch')).val('');
		});
	}

	static initSearchButtonClick() {
		$('.js-mainsearchbtn').click(function() {
			document.location.href = '/search?q=' + $(this).siblings('.js-inputsearch').val();
		});
	}
}
