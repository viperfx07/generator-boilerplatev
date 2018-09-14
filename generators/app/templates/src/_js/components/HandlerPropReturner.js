// A component whose handlers return its component props
import React, { Component, SyntheticEvent } from "react";
import PropTypes from "prop-types";

export default class HandlerPropReturner extends Component {
	static propTypes = {
		component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		render: PropTypes.func,
		children: PropTypes.element
	};

	static defaultProps = {
		component: "div",
		render: null,
		children: null
	};

	constructor(props) {
		super(props);
		this.el = React.createRef();
	}

	handleClick = ev => {
		if (this.props.onClick) {
			this.props.onClick(ev, this.props);
		}
	};

	handleChange = ev => {
		if (this.props.onChange) {
			this.props.onChange(ev, this.props);
		}
	};

	render() {
		const { component: Comp, children, ...props } = this.props;

		return (
			<Comp
				{...props}
				ref={this.el}
				onClick={this.handleClick}
				onChange={this.handleChange}
			>
				{children}
			</Comp>
		);
	}
}
