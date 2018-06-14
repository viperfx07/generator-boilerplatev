/**
 *
 * @param {integer} width pin width
 * @param {integer} height pin height
 * @param {[string,string]} position format: [x,y], e.g. ["center","top"], ["center", "bottom"]. ["center", "center"] by default
 */
export function getPinStyle (width, height, position=["center","center"]) {
	let left = 0;
	switch(position[0]){
		case 'center':
			left = -width/2;
			break;
		case 'right':
			left = -width;
			break;
		default:
			left = 0;
	}

	let top=0;
	switch(position[1]){
		case 'center':
			top = -height/2;
			break;
		case 'bottom':
			top = -height;
			break;
		default:
			top = 0;
	}


	return {
		position: 'absolute',
  		width, height, top, left
	};
}
