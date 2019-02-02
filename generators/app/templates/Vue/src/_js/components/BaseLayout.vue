<template lang="pug">
	.u-df.u-fxdc.u-mih100vh
		Header
		main.u-fx1
			slot
		Footer
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
export default {
	components: {
		Header,
		Footer,
	}
}
</script>

