export default (el, $el, opts) => {
	// opts
	// opts.target = target (CSS string selector)
	// opts.sourceEvents = (str) default(click) - the events that trigger eventTriggers
	// opts.triggerEvents = (str) the events triggered on the target
	// if on enter
	const isOnEnter = opts.sourceEvents == "enter";

	if (isOnEnter) {
		opts.sourceEvents = "keypress";
	}

	$el.on(opts.sourceEvents || "click", e => {
		if (isOnEnter) {
			if (e.which == 13) {
				$(opts.target).trigger(opts.triggerEvents);
			}
		} else {
			$(opts.target).trigger(opts.triggerEvents);
			return false;
		}
	});
};
