import Headroom from 'headroom.js';
import JSON5 from 'json5';

export default els =>{
	const $els = $(els)	;
	const setStickyHeight= (el, isReset)=>{
		const $this = $(el);
		const $parent = $this.closest('[data-sticky]');
		if(isReset){
			$parent.data('height', $parent.height())
		}
		$parent.css('height', isReset ? 'auto' : $parent.data('height'));
	};

	$els.each(function(){
		const $this = $(this);
		const attr = $this.attr('data-module-options');

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
				$(this.elem).removeClass('has-transition');
				setStickyHeight(this.elem, true);
			},
			onNotTop(){
				const $this = $(this.elem);
				setStickyHeight(this.elem, false);
				setTimeout(() => {
					if(!$this.hasClass('has-transition')){
						$this.addClass('has-transition');
					}
				}, 0);
			}
		};

		const OPTS ={
			"header": {...defaultOptions},
			"product-quote": {...defaultOptions}
		};

		let attrs= attr ? JSON5.parse(attr) : {};
		let opt = (attrs.key) ? {...OPTS[attrs.key], ...attrs} : {};

		const headroom =  new Headroom(this, opt);
		headroom.init();
	});
}
