export default (el, $el, opts)=>{
	const $target = opts.target ? $(opts.target) : $el;

	const actions = {
		removeClass: ()=>{
			$target.removeClass(opts.class);
		}
	}

	$target.on('keydown.dismiss.onescape', $.proxy(function (e) {
		if(e.which == 27){
			actions[opts.action]();	
			$target.trigger(opts.targetTriggerEventName || 'onescape.dismiss');
		} 
	}, document));
}
