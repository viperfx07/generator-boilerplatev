import 'jquery.scrollto';
import wurl from 'wurl';

export default (el, $el, opts) => {
	const MQ_ORDER_FROM_THE_LARGEST = ['lg', 'md', 'sm', 'xs'];

	// Required opts (examples)
	// mq:{ xs:0, sm:768, smd: 992, md: 1200, lg: 1448}
	// cols:{xs:1,sm:2,md:4}
	// panelSelector: '.o-board'
	// detailSelector:'.js-profile-detail'
	// detailCloseSelector: '.js-profile-detail-close'
	// detailCollapseSelector:'.js-profile-detail-collapse'
	// stickyHeight: { xs: -55, sm: -63 }

	// Return lg, md, sm, or xs
	const getMqBasedOnWindowWidth = () => {
		const windowWidth = window.innerWidth;
		for (let m of MQ_ORDER_FROM_THE_LARGEST) {
			const mq = opts.mq[m];
			if (windowWidth >= mq) {
				return m;
			}
		}
	}

	const getValueFromTheRightMQ = (mq, prop) => {
		const x = opts[prop][mq];
		if (x) return x;

		for (let i = MQ_ORDER_FROM_THE_LARGEST.indexOf(mq); i < MQ_ORDER_FROM_THE_LARGEST.length; i++) {
			const x = (opts[prop][MQ_ORDER_FROM_THE_LARGEST[i]])
			if (x) return x;
		}

		return null;
	}


	const attachListener = () => {
		$el.find(opts.panelSelector).on('click', (ev) => {
			ev.preventDefault();
			const $this = $(ev.currentTarget);
			const isActive = $this.hasClass('active');
			const $detailCollapse = $this.next(opts.detailCollapseSelector);

			const $col = $this.closest('[data-col]');

			const selectedColIndex = $col.attr('data-col');
			const prevSelectedColIndex = $el.attr('data-boards-row');

			let temp = [];
			let $theCols = $col.nextAll(opts.detailSelector);

			// If it is not active
			if (!isActive) {
				$el.find(opts.detailSelector).removeClass('active');
				$theCols.each((i, el) => {
					const $el = $(el);
					Object.keys(opts.cols).forEach(key => {
						if ($el.is(`${opts.detailSelector}.u-db-${key}`) && !temp.includes(key)) {
							$el.addClass('active').html($detailCollapse.clone(true));
							temp.push(key);
						}
					})
				})
			}

			const $theCollapse = $el.find(`${opts.detailSelector}.active`).find('.collapse')
				.one('shown.bs.collapse', (ev) => {
					const $el = $(ev.currentTarget);
					if ($el.closest(opts.detailSelector).is(':visible')) {
						scrollToActiveProfile();
					}
				});


			if (!isActive) {
				// If the previous selected is different than the current selected one
				if (prevSelectedColIndex !== selectedColIndex && (prevSelectedColIndex !== '')) {
					const parseSelectedColIndex = parseInt(selectedColIndex);
					const parsePrevSelectedColIndex = parseInt(prevSelectedColIndex);
					const mq = getMqBasedOnWindowWidth();
					const cols = getValueFromTheRightMQ(mq, 'cols');


					// If different rows between the previous and current selected one
					if (Math.floor(parseSelectedColIndex / cols) !== Math.floor(parsePrevSelectedColIndex / cols)) {
						$el.find(`${opts.detailSelector}:not(.active)`).find(".collapse")
							.one('hidden.bs.collapse', function () {
								$(this).html('');
								$theCollapse.collapse('show');
							})
							.collapse('hide');
					} else {
						$theCollapse.addClass('show');
						$el.find(`${opts.detailSelector}:not(.active)`).html('');
					}
				} else {
					$theCollapse.collapse('show');
				}
			} else {
				$theCollapse.collapse('hide');
			}

			$el.toggleClass('is-rowactive', !isActive).attr('data-boards-row', !isActive ? selectedColIndex : '');
			$this.toggleClass('active');

			if (prevSelectedColIndex !== selectedColIndex) {
				$el.find(opts.panelSelector).not($this).removeClass('active');
			}
		});

		$el.find(opts.detailCloseSelector).on('click', ev => {
			const $this = $(ev.currentTarget);
			const $profiles = $this.closest('[data-boards-row]');
			$(`[data-col="${$profiles.attr('data-boards-row')}"] ${opts.panelSelector}`).trigger('click');
		})
	}



	const scrollToActiveProfile = () => {
		let stickyHeight = 0;
		let stickyHeightOffset = 0;
		const mq = getMqBasedOnWindowWidth();
		stickyHeight = getValueFromTheRightMQ(mq, 'stickyHeight');
		stickyHeightOffset = getValueFromTheRightMQ(mq, 'stickyHeightOffset');

		const top = -(stickyHeight + stickyHeightOffset);

		$.scrollTo($el.find(`${opts.detailSelector}.active:visible`), 500, {
			offset: {
				top
			}
		});
	}

	const openProfileByHash = () => {
		const hash = wurl("#");
		if (!hash) return;

		// trigger click the id
		for (let h of Object.keys(hash)) {
			const $profile = $(`#${h}`);
			if ($(`#${h}`).length) {
				$profile.trigger('click');
				break;
			}
		}
	}

	attachListener();

	openProfileByHash();
}
