'use strict';
import JSON5 from 'json5';
import Instafeed from 'instafeed.js';
import TwitterFetcher from 'twitter-fetcher';
import formatDate from 'date-fns/format';
import $clamp from 'clamp-js-main';
import filterizr from '../custom_vendors/filterizr';

export default class SocialStream {
	constructor($el, options) {
		this.feeds = [];
		this.$el = $el;
		this.options = {
			facebook: {
				page: '',
				accessToken: '',
				maxPerFeed: 8,
				feederFn: this.getFacebookFeeds.bind(this),
				getHtmlFn: this.getFacebookHtml.bind(this),
			},
			twitter: {
				pageName: '',
				maxPerFeed: 8,
				feederFn: this.getTwitterFeeds.bind(this),
				getHtmlFn: this.getTwitterHtml.bind(this),
			},
			instagram: {
				userId: '',
				accessToken: '',
				maxPerFeed: 8,
				feederFn: this.getInstagramFeeds.bind(this),
				getHtmlFn: this.getInstagramHtml.bind(this),
				isLazyLoad: true, // require vanilla-lazyload
			},
			youtube: {
				apiKey: '',
				playlistId: '',
				maxPerFeed: 8,
				feederFn: this.getYoutubeFeeds.bind(this),
				getHtmlFn: this.getYoutubeHtml.bind(this),
				isLazyLoad: true, // require vanilla-lazyload
			},
			filterizr: {
				animationDuration: 0.5,
				callbacks: {
					onFilteringStart: function () {},
					onFilteringEnd: function () {},
					onShufflingStart: function () {},
					onShufflingEnd: function () {},
					onSortingStart: function () {},
					onSortingEnd: function () {}
				},
				delay: 0,
				delayMode: 'progressive',
				easing: 'ease-out',
				filter: 'all',
				filterOutCss: {
					opacity: 0,
					transform: 'scale(0.5)'
				},
				filterInCss: {
					opacity: 1,
					transform: 'scale(1)'
				},
				layout: 'packed',
				selector: '.filter-container',
				setupControls: true
			},
			instafeed: {
				get: 'user',
				sortBy: 'most-recent',
				target: 'social-stream'
			},
			clamp: {
				clamp: 4
			},
			order: 'instagram, twitter, youtube', //name of the social should match with the option keys
			orderNumberShownAtStartup: 0, // if 0, means it shows all. Index starts from 1
		};

		let attr = $el.attr('data-socialstream');
		this.options = $.extend(true, this.options, attr ? JSON5.parse(attr) : options);

		this.promise = this.init();

	}

	init() {
		return this.render();
	}

	render() {
		// check order
		this.orderArray = this.options.order.split(",").map(x => x.trim());
		const feederFns = this.orderArray.map(x => this.options[x].feederFn());

		return Promise.all(feederFns).then((results) => {
			let content = '';
			results.forEach((result, i) => {
				const key = this.orderArray[i];
				content += this.options[key].getHtmlFn(result[key], i);
			});
			const socialStreamHtml = this.getSocialStreamHtml(content);
			this.$el.html(socialStreamHtml);
			this.applyClamp();
			this.applyFilter();
		});
	}

	applyClamp() {
		const that = this;
		$('.o-socialstream__item-text').each(function () {
			$clamp(this, that.options.clamp);
		});
	}

	applyFilter() {
		const $filterContainer = this.$el.find(this.options.filterizr.selector);
		const $filterBtns = this.$el.find('.o-socialstream__filter-btn');

		$filterBtns.click(function () {
			const $this = $(this);
			$('.o-socialstream__filter').find('.active').removeClass('active');
			$this.parent().addClass('active')
		});

		$filterContainer.filterizr(this.options.filterizr).filterizr('shuffle');
	}

	getFilterItemHtml(key, filterKey, label, icon, attr, additionalClass = '') {
		return `<div class="u-pbb1 u-mrb6 u-posr o-socialstream__filter-item ${additionalClass}" role='presentation'>
			<button title="Show ${label || key} feeds" aria-label="Show ${label || key} feeds" type="button" class="u-btn-unstyled u-posr u-w100p u-df center-xs middle-xs u-c-inherit o-socialstream__filter-btn o-socialstream__filter-btn--${key}" data-filter="${filterKey}" ${attr}>
				${ icon ? `<span class="g-icon-${icon} u-c-highlight u-mrb2 u-vam u-iconfz-m o-socialstream__filter-btn-icon" aria-hidden="true"></span>` : ``}
				<span class="b-fsbtnlarge u-ttu u-vam hidden-xs o-socialstream__filter-btn-text" aria-hidden="true">${label || key}</span>
			</button>
			<div class="u-posa u-b0 u-w100p u-o0 u-bgc-highlight o-socialstream__filter-indicator"></div>
		</div>`;
	}

	getFilterHtml() {
		return `<div class="u-df end-sm u-mbb4 o-socialstream__filter" role='tablist'>
			${ this.getFilterItemHtml('all', 'all', 'All', '', 'data-shuffle', 'active')}
			${this.orderArray.map((x, i)=>{
				return this.getFilterItemHtml(x, i+1, this.options[x].label, x, '');
			}).join('')}
		</div>`;
	}

	getSocialStreamHtml(contentHtml) {
		return `<div class="o-socialstream">
			${this.getFilterHtml()}
			<div class="u-ovh o-socialstream__content">
				<div class="filter-container row u-ovh o-socialstream__content-inner">${contentHtml}</div>
			</div>
		</div>`;
	}

	getYoutubeFeeds() {
		const url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + this.options.youtube.playlistId + '&key=' + this.options.youtube.apiKey + '&pageToken=&maxResults=' + this.options.youtube.maxPerFeed;
		return new Promise((resolve, reject) => {
			$.ajax({
				url: url,
				cache: true,
				dataType: 'jsonp',
				success: (response) => {
					if (!!response.items) {
						this.feeds.youtube = response.items.map(function (item) {
							return {
								id: item.snippet.resourceId.videoId,
								time: formatDate(item.snippet.publishedAt, 'X'),
								thumbnail: item.snippet.thumbnails.maxres || item.snippet.thumbnails.high || item.snippet.thumbnails.standard || item.snippet.thumbnails.default,
								title: item.snippet.title,
							};
						});
						resolve({
							youtube: this.feeds.youtube
						});
					}
				}
			});
		});
	}

	getTwitterFeeds() {
		return new Promise((resolve, reject) => {
			const dateFormatter = (date) => formatDate(date);
			const handleTweets = (tweets) => {
				this.feeds.twitter = tweets.map(function (item, idx) {
					return {
						content: item.tweet,
						link: item.permalinkURL
					};
				});
				resolve({
					twitter: this.feeds.twitter
				});
			};
			const configProfile = {
				profile: {
					"screenName": this.options.twitter.pageName
				},
				domId: '',
				maxTweets: this.options.twitter.maxPerFeed,
				enableLinks: true,
				showUser: false,
				showTime: true,
				dateFunction: dateFormatter,
				showImages: false,
				lang: 'en',
				showInteraction: false,
				customCallback: handleTweets.bind(this),
				dataOnly: true
			};

			TwitterFetcher.fetch(configProfile);
		});
	}

	getInstagramFeeds() {
		return new Promise((resolve, reject) => {
			let opts = {
				get: 'user',
				userId: this.options.instagram.userId,
				accessToken: this.options.instagram.accessToken,
				sortBy: 'most-recent',
				limit: this.options.instagram.maxPerFeed,
				target: 'social-stream',
				success: (data) => {
					if (!!data.data) {
						this.feeds.instagram = data.data.map(function (image) {
							return {
								link: image.link,
								title: !!image.caption ? image.caption.text : '',
								images: image.images.standard_resolution,
								time: image.created_time
							};
						});
						resolve({
							instagram: this.feeds.instagram
						});
					}
				}
			};
			opts = $.extend(true, opts, this.options.instafeed);
			const userFeed = new Instafeed(opts);
			userFeed.run();
		});
	}

	getFacebookFeeds() {
		return new Promise((resolve, reject) => {
			(function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {
					return;
				}
				js = d.createElement(s);
				js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));

			window.fbAsyncInit = () => {
				var opts = this.options.facebook;

				window.FB.init({
					appId: '2104933593075327',
					autoLogAppEvents: true,
					xfbml: true,
					version: 'v3.0'
				});
				window.FB.AppEvents.logPageView();
				window.FB.api('/' + opts.page + '/feed?access_token=' + opts.accessToken, (response) => {
					if (response && !response.error) {
						this.feeds.facebook = response.data.slice(0, opts.maxPerFeed).map((feed) => {
							return {
								id: feed.id,
								content: feed.message || feed.story,
								time: feed.created_time
							}
						});

						resolve({
							facebook: this.feeds.facebook
						});
					} else {
						console.error('Cannot get facebook feed: ', response.error);
					}
				});
			}
		})

	}

	getFacebookHtml(items, orderNumber) {
		return items && items.map(item => {
			return `<div class="filtr-item col-xs-12 col-sm-6 col-md-4 col-lg-3 u-ptb2 u-pbb2 o-socialstream__col o-socialstream__col--facebook" data-category="${orderNumber + 1}">
						<div class="u-bgc-dark u-embed o-socialstream__item o-socialstream__item--facebook">
							<div class="u-embed__item o-socialstream__item-inner">
								<div class="u-fx1 u-ptb4 u-pbb4 u-plb4 u-prb4 o-fancylist">
									<div class="o-socialstream__item-text">${item.content}</div>
								</div>
							</div>
							<a class="u-posa u-link-colorstay u-link-tdn u-iconfz-m u-mbb4 u-mlb4 u-b0 u-l0 o-socialstream__itemicon" href="https://facebook.com/${item.id}" target="_blank">
								<span class="g-icon-facebook" aria-hidden="true"></span>
							</a>
						</div>
					</div>`;
		}).join('');
	}

	getInstagramHtml(items, orderNumber) {
		const lazyLoad = (item) => `data-original="${item.images.url}"`;
		const standardBgimg = (item) => `style="background-image: url(${item.images.url})"`;

		return items ? items.map(item => {
			return `<div class="filtr-item col-xs-12 col-sm-6 col-md-4 col-lg-3 u-ptb2 u-pbb2 o-socialstream__col o-socialstream__col--instagram" data-category="${orderNumber + 1}">
				<div class="u-posr">
					<a class="u-db u-bgc-dark u-embed o-socialstream__item o-socialstream__item--instagram" href="${item.link}" title="${item.title}" target="_blank">
						<div class="u-bgimg u-embed__item o-socialstream__item-inner ${this.options.instagram.isLazyLoad ? 'js-lazy': ''}"
							${this.options.instagram.isLazyLoad ? lazyLoad(item) : standardBgimg(item) }>
							<div class="o-fancylist"></div>
						</div>
					</a>
					<a class="u-posa u-c-fff u-link-colorstay u-link-tdn u-iconfz-m u-mbb4 u-mlb4 u-b0 u-l0 o-socialstream__itemicon" href=${item.link}>
						<span class="g-icon-instagram" aria-hidden="true"></span>
					</a>
				</div>
			</div>`;
		}).join('') : '';
	}

	getTwitterHtml(items, orderNumber) {
		return items ? items.map(item => {
			return `<div class="filtr-item col-xs-12 col-sm-6 col-md-4 col-lg-3 u-ptb2 u-pbb2 o-socialstream__col o-socialstream__col--twitter" data-category="${orderNumber + 1}">
					<div class="u-bgc-dark u-embed o-socialstream__item o-socialstream__item--twitter">
						<div class="u-embed__item u-bgc-dark u-embed o-socialstream__item-inner">
							<div class="u-fx1 u-ptb4 u-pbb4 u-plb4 u-prb4 o-fancylist">
								<div class="u-mbb2 o-socialstream__item-text">${item.content}</div>
							</div>
						</div>
						<a class="u-posa u-c-inherit u-link-tdn u-iconfz-m u-mbb4 u-mlb4 u-b0 u-l0 o-socialstream__itemicon" href="${item.link}" target="_blank">
							<span class="g-icon-twitter" aria-hidden="true"></span>
						</a>
					</div>
				</div>`;
		}).join('') : '';
	}

	getYoutubeHtml(items, orderNumber) {
		const lazyLoad = (item) => `data-original="${item.thumbnail.url}"`;
		const standardBgimg = (item) => `style="background-image: url(${item.thumbnail.url})"`;

		return items ? items.map(item => {
			return `<div class="filtr-item col-xs-12 col-sm-6 col-md-4 col-lg-3 u-ptb2 u-pbb2 o-socialstream__col o-socialstream__col--youtube" data-category="${orderNumber + 1}">
				<div class="u-posr">
					<a class="u-db u-bgc-dark u-embed o-socialstream__item o-socialstream__item--youtube" href="https://youtube.com/watch?v=${item.id}" title="${item.title}" target="_blank">
						<div class="u-embed__item u-bgimg o-socialstream__item-inner ${this.options.youtube.isLazyLoad ? 'js-lazy': ''}" ${this.options.youtube.isLazyLoad ? lazyLoad(item) : standardBgimg(item) }>
							<div class="o-fancylist"></div>
						</div>
					</a>
					<a class="u-posa u-c-fff u-c-inherit u-link-colorstay u-link-tdn u-iconfz-m u-mbb4 u-mlb4 u-b0 u-l0 o-socialstream__itemicon" href="https://youtube.com/watch?v=${item.id}" target="_blank">
						<span class="g-icon-youtube" aria-hidden="true"></span>
					</a>
				</div>
			</div>`;
		}).join('') : '';
	}
}

