import Headroom from 'headroom.js';

export default (el, $el, opts) =>{
	const setStickyHeight= (isReset)=>{
		const $parent = $el.closest('[data-sticky]');
		if(isReset){
			$parent.data('height', $parent.height())
		}
		$parent.css('height', isReset ? 'auto' : $parent.data('height'));
	};

	const defaultOptions = {
		classes:{
			pinned: "is-pinned",
			unpinned: "is-unpinned",
			top: "is-top",
			notTop: "is-not-top",
			top: "is-top",
			bottom: "is-bottom",
			notBottom: "is-not-bottom"
		},
		onTop(){
			$el.removeClass('has-transition');
			setStickyHeight(true);
		},
		onNotTop(){
			const $this = $el;
			setStickyHeight(false);
			setTimeout(() => {
				if(!$this.hasClass('has-transition')){
					$this.addClass('has-transition');
				}
			}, 0);
		}
	};

	const OPTS ={
		"header": {...defaultOptions},
	};

	const _opts = opts.key ? {...OPTS[key], ...opts } : { ...opts };

	const headroom =  new Headroom(el, _opts);
	headroom.init();
}
