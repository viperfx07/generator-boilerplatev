import focusable from "../utils/focusable";

// options:
/**
 * disableChildrenTabIndexesOnInit: giving all focusable children of an element (el / opts.target) a value of -1
 * tabIndexesToggledOn: an event where the tab indexes of the children of element/target are toggled
 * ariaHiddenToggledOn: an event where the aria hidden are reverted
 */

export default (el, $el, opts) => {
	focusable();

	const $focusableChildren = $el.find(":focusable");
	if (opts.disableChildrenTabIndexesOnInit) {
		$el.find(":focusable").each(function() {
			const $this = $(this);
			const tabindex = $this.attr("tabindex");
			$this.attr("data-va11ytabindex-prev", tabindex);
			if (!tabindex) {
				$this.attr("tabindex", -1);
			}
		});
	}

	if (opts.tabIndexesToggledOn) {
		$el.on(opts.tabIndexesToggledOn, function() {
			$focusableChildren.each(function() {
				const $this = $(this);
				const initialTabIndex =
					$this.attr("data-va11ytabindex-prev") || "";
				$this.attr("data-va11ytabindex-prev", $this.attr("tabindex"));
				$this.attr("tabindex", initialTabIndex);
			});
		});
	}

	opts.ariaHiddenOnInit && $el.attr("aria-hidden", true);

	if (opts.ariaHiddenToggledOn) {
		$el.on(opts.ariaHiddenToggledOn, function() {
			$el.attr(
				"aria-hidden",
				$el.attr("aria-hidden") === "true" ? "false" : "true"
			);
		});
	}
};
