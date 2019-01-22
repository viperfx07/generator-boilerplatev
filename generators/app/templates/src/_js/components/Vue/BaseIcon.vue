<template lang="pug">
	span(aria-hidden="true", :class="_classNames")
</template>

<script>
export default {
	props:{
		name:{
			type: String,
			required: true,
		},
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
