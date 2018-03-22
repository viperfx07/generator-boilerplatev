import JSON5 from 'json5';

export default els =>{
	const $els = $(els);
	const _targetFocus = ($el, opt) =>{
        let $target;
        if(opt.targetInside){
            $target = $el.find(opt.target);
        } else if (opt.targetSelf) {
            $target = $el;
        }
        else{
            $target = $(opt.target);
        }
        $target.focus();
	}

	$els.each((i, el) => {
		let $this = $(el);
		let opt = JSON5.parse($this.attr('data-module-options'));
		if(opt.on !== 'load'){
			$this.on(opt.on || 'click', () =>{
				setTimeout(()=> {
					if(opt.condition){
						if($(opt.condition).length){
							_targetFocus($this, opt);
						}
					} else{
						_targetFocus($this, opt);
					}
				}, opt.delay || 0);
			});
		} else{
			_targetFocus($this, opt);
		}
	});
}
