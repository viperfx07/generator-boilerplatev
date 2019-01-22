import cx from "classnames";
import PropTypes from "prop-types";
import HandlerPropReturner from "./HandlerPropReturner";

const Inputbox = ({
	id,
	type,
	name,
	value,
	checked,
	disabled,
	className,
	additionalClassName,
	boxClassName,
	additionalBoxClassName,
	textClassName,
	additionalTextClassName,
	label,
	inputProps,
	...props
}) => {
	const _className = cx(
		className || {
			"u-df u-fw400 o-inputbox": true,
			[`o-inputbox--${type}`]: type,
			"is-disabled": disabled
		},
		additionalClassName
	);

	const _boxClassName = cx(
		boxClassName || {
			"u-db u-posr u-tac u-fxs0 u-mrb2 o-inputbox__box": true
		},
		additionalBoxClassName
	);

	const _textClassName = cx(
		textClassName || {
			"u-c-text2 o-inputbox__text": true
		},
		additionalTextClassName
	);

	return (
		<label htmlFor={id} className={_className}>
			<HandlerPropReturner
				{...inputProps}
				component="input"
				id={id}
				className="sr-only u-fxb0"
				type={type}
				name={name}
				checked={checked}
				disabled={disabled}
				value={value}
			/>
			<span className={_boxClassName} />
			<span className={_textClassName}>{label}</span>
		</label>
	);
};

Inputbox.defaultProps = {
	type: "checkbox",
	value: "",
	checked: false,
	disabled: false,
	className: "",
	boxClassName: "",
	additionalBoxClassName: "",
	textClassName: "",
	additionalTextClassName: "",
	inputProps: {}
};

Inputbox.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	boxClassName: PropTypes.string,
	additionalBoxClassName: PropTypes.string,
	textClassName: PropTypes.string,
	additionalTextClassName: PropTypes.string,
	inputProps: PropTypes.object
};

export default Inputbox;
