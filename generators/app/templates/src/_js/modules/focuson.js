import JSON5 from 'json5';

export default (el, $el, opts) =>{
	const _targetFocus = (_$el, opt) =>{
        let $target;
        if(opt.targetInside){
            $target = _$el.find(opt.target);
        } else if (opt.targetSelf) {
            $target = _$el;
        }
        else{
            $target = $(opt.target);
        }
        $target.focus();
	}

	if(opts.on !== 'load'){
		$el.on(opts.on || 'click', () =>{
			setTimeout(()=> {
				if(opts.condition){
					if($(opts.condition).length){
						_targetFocus($el, opts);
					}
				} else{
					_targetFocus($el, opts);
				}
			}, opts.delay || 0);
		});
	} else{
		_targetFocus($el, opts);
	}
}
