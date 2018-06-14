import JSON5 from 'json5';
import SocialStream from '../utils/SocialStream';

export default el => {
	const $el = $(el);
	new SocialStream($el, JSON5.parse($el.attr('data-module-options')));
}

