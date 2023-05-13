<template>
	<view>
		<view class="item">
			<text>手机号</text>
			<view style="display: flex;align-items: center;">
				<text>{{phone}}</text>
				<image src="../../static/enter.png"></image>
			</view>
		</view>
		<view class="item" @click="toUpdatePsd()">
			<text>修改密码</text>
			<image src="../../static/enter.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:""
			}
		},
		onLoad() {
			this.phone = uni.getStorageSync("userinfo").phone
		},
		methods: {
			toUpdatePsd(){
				uni.navigateTo({
					url:'/pages/myuser/updatePassword'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		margin: 0 auto;
		padding: 30rpx 30rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #eee;

		image {
			width: 40rpx;
			height: 40rpx;
		}

		.item1 {
			display: flex;
			align-items: center;
		}
	}
</style>
