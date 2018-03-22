import JSON5 from 'json5';
import 'jquery.scrollto';

export default function scrollto(els){
	const $els = $(els);
	$els.each(function(){
		const $el = $(this);
		const selector = $el.selector;
		const opt = JSON5.parse($el.attr('data-module-options'));

		const callback = (e) => {
			e.preventDefault();
			e.stopPropagation();
			const $this = $(e.currentTarget);
			const $target = $(opt.target);

			if(opt.checkSectionOffset){
				const scrollToOffsetAttr = $target.attr('data-scrollto-offset');
				if(scrollToOffsetAttr){
					const scrollToOffset = JSON5.parse(scrollToOffsetAttr);
					opt.settings = {...opt.settings, ...{offset: scrollToOffset}};
				}
			}

			if(opt.delay){
				setTimeout(function(){
						$.scrollTo(opt.target, opt.duration || 800, opt.settings);
					}, opt.delay || 0);
			}
			$.scrollTo(opt.target, opt.duration || 800, opt.settings);
			$target.focus();
		};

		if(selector){
			$(document).on(opt.on || 'click touchstart', selector, callback);
		} else{
			$el.each(function(){
				const $this = $(this);
				$this.on(opt.on || 'click touchstart', callback);
			});
		}
	})
}
