import "@/custom_vendors/jquery-accessibleMegaMenu";

export default (el, $el, opts) => {
  const _opts = {
    header: {
      /* prefix for generated unique id attributes, which are required
					   to indicate aria-owns, aria-controls and aria-labelledby */
      uuidPrefix: "mainnav-megamenu",

      /* css class used to define the megamenu styling */
      menuClass: "js-megamenu-menu",

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

      onTopLiClosed() {
        $("html").removeClass("is-navmain-active");
      },
      onTopLiOpened() {
        const $opened = $(".c-nav-main").find(".is-open");
        if ($opened.length) {
          if (
            $opened.closest(".has-sub").length ||
            $opened.hasClass("has-sub")
          ) {
            $("html").addClass("is-navmain-active");
          }
        }
      }
    },
    navsub: {
      /* prefix for generated unique id attributes, which are required
					   to indicate aria-owns, aria-controls and aria-labelledby */
      uuidPrefix: "mainnav-megamenu",

      /* css class used to define the megamenu styling */
      menuClass: "js-megamenu-menu",

      /* css class for a top-level navigation item in the megamenu */
      topNavItemClass: "js-megamenu-topnavitem",

      /* css class for a megamenu panel */
      panelClass: "js-megamenu-panel",

      /* css class for a group of items within a megamenu panel */
      panelGroupClass: "js-megamenu-panelgroup",

      /* css class for the hover state */
      hoverClass: "is-hover",

      /* css class for the focus state */
      focusClass: "is-focus",

      /* css class for the open state */
      openClass: "is-open",

      // hover intent
      openDelay: 50

      // onTopLiClosed() {
      // 	$('html').removeClass('is-navmain-active')
      // },
      // onTopLiOpened() {
      // 	const $opened = $('.c-nav-main').find('.is-open')
      // 	if ($opened.length) {
      // 		if (
      // 			$opened.closest('.has-sub').length ||
      // 			$opened.hasClass('has-sub')
      // 		) {
      // 			$('html').addClass('is-navmain-active')
      // 		}
      // 	}
      // }
    }
  };

  const opt = opts.key ? _opts[opts.key] : {};

  $el.accessibleMegaMenu(opt);
  // $el
  // 	.on('topliclosed.accessible-megamenu', function() {
  // 		opt.onTopLiClosed()
  // 	})
  // 	.on('topliopened.accessible-megamenu', function() {
  // 		opt.onTopLiOpened()
  // 	})
  // 	.accessibleMegaMenu(opt)
};
