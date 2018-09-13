import { withHandlers, compose } from 'recompose';

const EnhancedComponent = compose(
	withHandlers({
		handleClick: props => (ev) => {
			if (props.onClick) {
				props.onClick(ev, props);
			}
		},
		handleChange: props => (ev) => {
			if (props.onChange) {
				props.onChange(ev, props);
			}
		},
		handleBlur: props => (ev) => {
			if (props.onBlur) {
				props.onBlur(ev, props);
			}
		},
	}),
)(({ component = 'div', handleClick, handleChange, handleBlur, children, onClick, ...props }) => {
	const Comp = component;

	return (
		<Comp
			{...props}
			onClick={handleClick}
			onChange={handleChange}
			onBlur={handleBlur}
		>
			{children}
		</Comp>
	);
});

export default EnhancedComponent;
