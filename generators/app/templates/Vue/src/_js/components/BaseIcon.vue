<template lang="pug">
	span(aria-hidden="true", :class="_classNames")
</template>

<script>
export default {
	props:{
		/** Name of the icon */
		name:{
			type: String,
			required: true,
		},
		/**
		 * Prefix of the icon class name
		 * The icon class name is prefixClass + name
		 * e.g. g-icon- + facebook = g-icon-facebook
		 * */
		prefixClass:{
			type: String,
			default: 'g-icon-',
		}
	},
	computed:{
		_classNames(){
			return {
				[`g-icon-${this.name}`]: this.name,
			};
		},
	},
}
</script>
