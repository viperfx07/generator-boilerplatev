export default (el, $el, opts) => {
	const {
		key,
		selfClass,
		class: cls,
		target,
		event: ev,
		transitionProperty,
		removeClass,
		isClosest,
		isAddClass,
		toggledEventName
	} = opts;

	$el.on(ev || "click", () => {
		let $target = $el;

		if (target) {
			$target = $(target);
		}

		if (isClosest) {
			$target = $el.closest(target);
		}

		if (cls) {
			const TRANSITION_EVENT =
				"webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
			const LOADING_CLASS = `${cls}-is-loading`;

			$target.toggleClass(cls, isAddClass);

			if (transitionProperty) {
				$target
					.addClass(LOADING_CLASS)
					.one(TRANSITION_EVENT, function (e) {
						if (
							transitionProperty == e.originalEvent.propertyName
						) {
							const $this = $(this);
							$this.removeClass(LOADING_CLASS);
						}
					});
			}

			if (removeClass) {
				$target.removeClass(removeClass);
			}
		}

		if (selfClass) {
			$target.toggleClass(selfClass);
		}

		$target.trigger(toggledEventName || "vtoggle.toggled");
	});
};
