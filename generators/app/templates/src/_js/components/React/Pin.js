export default function Pin(props){
	return(
		<svg xmlns="http://www.w3.org/2000/svg" width={props.width || 24} height={ props.height || 24} viewBox="0 0 24 24">
			<g fill="none" fillRule="evenodd">
				<circle cx="12" cy="9" r="3" fill={ props.circleColor || '#fff'}/>
				<path fill={ props.color || '#000' } d="M12.786 22.012a1 1 0 0 1-1.572 0C6.404 15.895 4 11.479 4 8.765 4 4.476 7.582 1 12 1s8 3.476 8 7.765c0 2.714-2.405 7.13-7.214 13.247zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
			</g>
		</svg>
	);
}