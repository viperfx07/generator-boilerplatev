import classNameFn from 'classnames';

const Button = ({ component='button', type, children, className, additionalClassName, ...props }) => {
	const Comp = component;

	const _className = classNameFn({
		[className || 'u-btn-unstyled']: true,
	}, additionalClassName);

	const typeProps = {
		type: component == 'button' && !type ? 'button' : type,
	};

	return (
		<Comp {...props} {...typeProps} className={_className}>
			{children}
		</Comp>
	);
};

export default Button;
