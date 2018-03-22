import 'magnific-popup';
import JSON5 from 'json5';

export default els =>{
	const $magnificPopup = $(els);
	if($magnificPopup.length){
		const OPTS = {
			"iframe": {
				type: 'iframe',
				iframe: {
					patterns: {
						youtu: {
							index: 'youtu.be/',
							id: function( url ) {
								// Capture everything after the hostname, excluding possible querystrings.
								var m = url.match( /^.+youtu.be\/([^?]+)/ );
								if ( null !== m ) {
									return m[1];
								}
								return null;
							},
							// Use the captured video ID in an embed URL.
							// Add/remove querystrings as desired.
							src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0'
						}
					}
				}
			}
		};

		$magnificPopup.each(function(){
			const $this = $(this);
			const opts = JSON5.parse($this.attr('data-module-options'));
			$this.magnificPopup({...OPTS[opts.key], ...opts});
		})
	}
}
