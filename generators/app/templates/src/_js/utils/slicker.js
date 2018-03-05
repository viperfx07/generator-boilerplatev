import JSON5 from 'json5';
import 'slick-carousel';

export default function slicker($els){
	if ($els.length) {
		window.jsSlickOptions = {
			'hero':{
				dots: true,
				arrows: false,
				autoplay: true,
				rows:0,
				setCounter(slick, $el){
				},
				onSetPosition(slick, $el, opt){
				},
				onInit(slick, $el, opt){
				},
				onBreakpoint(slick, $el, opt){
				},
				onAfterChange(slick, $el, currentSlide, opt){
				}
			},
		};

		$els.each(function() {
			let $el = $(this);
			const attr = $el.attr('data-slickjs');
			const opts = (attr && attr != 'data-slickjs') ? JSON5.parse(attr) : {};
			const options = (opts && opts.key) ? { ...jsSlickOptions[opts.key], ...opts } : opts;
			const genericSlideCounts = $el.children().length;

			options.arrows = genericSlideCounts > 1 && options.arrows;
			options.dots = genericSlideCounts > 1 && options.dots;

			$el
				.on('init', function(ev, slick){
					const $this = $(this);

					if(options && options.onInit){
						options.onInit(slick, $this, options);
					}
				})
				.on('breakpoint', function(ev, slick){
					const $this = $(this);
					if(options && options.onBreakpoint){
						options.onBreakpoint(slick, $this, options);
					}
				})
				.on('afterChange', function(ev, slick, currentSlide){
					const $this = $(this);
					if(options && options.onAfterChange){
						options.onAfterChange(slick, $this, currentSlide, options);
					}
				})
				.on('setPosition', function(ev, slick){
					const $this = $(this);
					if(options && options.onSetPosition){
						options.onSetPosition(slick, $this, options);
					}
				})
				.on('beforeChange', function(ev, slick, currentSlide, nextSlide){
					const $this = $(this);
					if(options && options.onBeforeChange){
						options.onBeforeChange(slick, $this, currentSlide, nextSlide, options);
					}
				})
				.slick(options || {});
		});
	}
}
