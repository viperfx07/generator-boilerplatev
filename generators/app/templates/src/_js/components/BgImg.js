import classNameFn from 'classnames';
import PropTypes from 'prop-types';

import BgimgBackup from './BgimgBackup';

const BgImg = ({imageUrl, className, additionalClassName, isLazy, ...props}) => {
    const _className = classNameFn(
        className || {
            'u-bgimg u-embed': true,
            'js-lazysizes': isLazy,
        },
        additionalClassName,
    );

    const _style = {
        backgroundImage: !isLazy && imageUrl ? `url(${imageUrl})` : undefined
    };

    return (
        <div className={_className} style={_style} data-bg={isLazy ? imageUrl : undefined}>
            <BgimgBackup imageUrl={imageUrl} isLazy={isLazy} />
        </div>
    );
}

BgImg.propTypes = {
    imageUrl: PropTypes.string.isRequired,
}

export default BgImg;
