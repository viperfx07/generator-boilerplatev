import JSON5 from 'json5';

export default function triggerer(els){
	const $els = $(els);
	$els.each(function(){
		let $this = $(this);
		let attr = $this.attr('data-module-options');
		if(attr){
			// opts
			// opt.target = target (CSS string selector)
			// opt.sourceEvents = (str) default(click) - the events that trigger eventTriggers
			// opt.triggerEvents = (str) the events triggered on the target
			let opt = JSON5.parse(attr);

			// if on enter
			let isOnEnter = opt.sourceEvents == 'enter';

			if(isOnEnter){
				opt.sourceEvents = 'keypress';
			}

			$this.on(opt.sourceEvents || 'click', function(e){
				if(isOnEnter){
					if(e.which == 13){
						$(opt.target).trigger(opt.triggerEvents);
					}
				} else{
					$(opt.target).trigger(opt.triggerEvents);
					return false;
				}
			});
		}
	});
}
