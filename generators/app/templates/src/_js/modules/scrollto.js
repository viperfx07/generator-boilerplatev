import 'jquery.scrollto';

export default (el, $el, opts) => {
	const callback = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const $target = $(opts.target);

		if(opts.delay){
			setTimeout(function(){
					$.scrollTo(opts.target, opts.duration || 800, opts.settings);
				}, opts.delay || 0);
		}
		$.scrollTo(opts.target, opts.duration || 800, opts.settings);
		$target.focus();
	};

	$el.on(opts.on || 'click touchstart', callback);
}
