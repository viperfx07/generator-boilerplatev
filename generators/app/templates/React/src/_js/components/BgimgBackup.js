import PropTypes from 'prop-types';

const BgimgBackup = ({ imageUrl, alt, isLazy, ...props }) => (
	<img
		{...props}
		alt={alt}
		src={!isLazy ? imageUrl : undefined}
		data-src={isLazy ? imageUrl : undefined}
		className={`u-w100p u-h100p u-ofc u-o0 u-bgimg__backup ${isLazy ? 'js-lazysizes': ''}`}
	/>
);

BgimgBackup.defaultProps = {
	alt: '',
	isLazy: false,
};

BgimgBackup.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	alt: PropTypes.string,
	isLazy: PropTypes.bool,
};

export default BgimgBackup;
