import 'slick-carousel';

export default (el, $el, opts) => {

	// custom options. set based on opts.key
	const jsSlickOptions = {
	};

	const options =
		opts && opts.key
			? { row: 0, ...jsSlickOptions[opts.key], ...opts }
			: { row: 0, ...opts };
	const genericSlideCounts = $el.children().length;

	options.arrows = genericSlideCounts > 1 && options.arrows;
	options.dots = genericSlideCounts > 1 && options.dots;

	options.beforeInit && options.beforeInit(options);

	$el.on("init", (ev, slick) => {
		if (options && options.onInit) {
			options.onInit(ev, slick, options);
		}
	})
		.on("breakpoint", (ev, slick) => {
			if (options && options.onBreakpoint) {
				options.onBreakpoint(ev, slick, options);
			}
		})
		.on("afterChange", (ev, slick, currentSlide) => {
			if (options && options.onAfterChange) {
				options.onAfterChange(ev, slick, currentSlide, options);
			}
		})
		.on("setPosition", (ev, slick) => {
			if (options && options.onSetPosition) {
				options.onSetPosition(ev, slick, options);
			}
		})
		.on("beforeChange", (ev, slick, currentSlide, nextSlide) => {
			if (options && options.onBeforeChange) {
				options.onBeforeChange(
					ev,
					slick,
					currentSlide,
					nextSlide,
					options
				);
			}
		})
		.slick(options || {});
};
