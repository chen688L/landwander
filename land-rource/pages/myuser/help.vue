<template>
	<view class="help">
		<view class="item">
			<text>如何发布土地？</text>
			<image src="../../static/enter.png"></image>
		</view>
		<view class="item">
			<text>如何发布找地需求？</text>
			<image src="../../static/enter.png"></image>
		</view>
		<view class="item" @click="tolc()">
			<text>土地流转流程？</text>
			<image src="../../static/enter.png"></image>
		</view>
		<view class="item">
			<text>如何收藏土地？</text>
			<image src="../../static/enter.png"></image>
		</view>
		<view class="item">
			<text>意见反馈</text>
			<image src="../../static/enter.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			tolc(){
				uni.navigateTo({
					url:"/pages/myuser/help/lc"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.help{
		margin-top: 30rpx;
	}
.item {
		width: 90%;
		margin: 0 auto;
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		image {
			width: 40rpx;
			height: 40rpx;
		}
	}
</style>
