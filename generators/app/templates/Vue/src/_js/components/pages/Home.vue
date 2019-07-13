<template lang="pug">
	BaseLayout
		.container
			p This is home
			BaseIcon(name="facebook")
</template>

<script>
import BaseLayout from "@/components/BaseLayout.vue";
import BaseIcon from "@/components/BaseIcon.vue";
export default {
	components: {
		BaseLayout,
		BaseIcon
	}
}
</script>

