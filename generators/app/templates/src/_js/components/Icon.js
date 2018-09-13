export default function Icon(props){
	const prefixClass = props.prefixClass || 'g-icon-';
	return (
		<span aria-hidden="true" className={`${prefixClass}${props.name} ${props.className || ''}`} style={props.style} />
	);
}
