import { vsprintf } from "sprintf-js";

export default (el, $el, opt) => {
	const $target = opt.target ? $(opt.target) : $el;

	$el.on(opt.on || "keypress", e => {
		if ((e.type == "keypress" && e.which == 13) || e.type == opt.on) {
			e.preventDefault();
			const $targetVal = $target.val();
			if (typeof $targetVal !== "undefined" && $targetVal !== "") {
				document.location.href = vsprintf(
					opt.format || "%s",
					$target.val()
				);
			}
		}
	});
};
