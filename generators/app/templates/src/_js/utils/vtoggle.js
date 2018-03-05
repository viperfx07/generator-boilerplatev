import JSON5 from 'json5';
export default function vtoggle($els){
	$els.each(function(){
		let $this = $(this);
		let { key, selfClass, class:cls, target, event:ev, transitionProperty, removeClass, isAddClass } = JSON5.parse($this.attr('data-vtoggle'));

		$this.on(ev || 'click', function() {
			let $this = $(this);

			if(cls){
				let $target = $(target);
				const TRANSITION_EVENT = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
				const LOADING_CLASS = `${cls}-is-loading`;

				if(!isAddClass){
					$target.toggleClass(cls);
				} else{
					$target.addClass(cls);
				}

				if(transitionProperty){
					$target
						.addClass(LOADING_CLASS)
						.one(TRANSITION_EVENT, function(e){
							if(transitionProperty == e.originalEvent.propertyName){
								let $this = $(this);
								$this.removeClass(LOADING_CLASS);
							}
						});
				}

				if(removeClass){
					$target.removeClass(removeClass);
				}
			}

			if(selfClass){
				$this.toggleClass(selfClass);
			}
		});
	});
}
