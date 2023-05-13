<template>
	<view>
		<view class="preview" style="background-color: #313131;">
			<view class="title" style="margin-bottom: 30px;">冒泡效果</view>
			<tab-bar-bubble :fixed-bottom="false"></tab-bar-bubble>
		</view>
	</view>
</template>

<script>
	import tabBarBubble from "./tab-bar-bubble.vue";
	
	export default {
		components: {
			"tab-bar-bubble": tabBarBubble,
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
