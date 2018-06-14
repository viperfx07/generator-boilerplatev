import JSON5 from 'json5';
import { vsprintf } from 'sprintf-js';
export default el => {

	const $this = $(el);
	const opt = JSON5.parse($this.attr('data-module-options'));

	const $target = opt.target ? $(opt.target) : $this;

	$this.on(opt.on || 'keypress', (e) => {
		if ((e.type == 'keypress' && e.which == 13) || e.type == opt.on) {
			const $targetVal = $target.val();
			if (typeof $targetVal !== 'undefined' && $targetVal !== '') {
				document.location.href = vsprintf(opt.format, $target.val());
			}
		}
	})
}
