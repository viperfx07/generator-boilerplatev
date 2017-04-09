'use strict';

export default function($){
	console.log('this comes from partial.js example');

	// $ is injected jQuery
	var arrayTest = [1,2,4];
	$.each(arrayTest, function(i, val){ console.log(val); });
}