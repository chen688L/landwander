<template>
	<view class="aboutUs">
		<image class="icon" src="../../static/land.png"></image>
		<view class="info">
			<view>土地租聘</view>
			<view>土地流转信息服务行业</view>
		</view>
		<view class="box">
			<view class="item">
				<view>服务热线</view>
				<view class="item1">
					<text>400-6666-XXX</text>
					<image src="../../static/enter.png"></image>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="item">
				<view>联系邮箱</view>
				<view class="item1">
					<text>serviceXXX@163.com</text>
					<image src="../../static/enter.png"></image>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="item">
				<view>土地租聘服务协议</view>
				<view class="item1">
					<image src="../../static/enter.png"></image>
				</view>
			</view>
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

		}
	}
</script>

<style lang="scss" scoped>
	.aboutUs {
		text-align: center;
		margin: 0 auto;
		margin-top: 80rpx;
	}

	.icon {
		width: 200rpx;
		height: 200rpx;
	}
	
	.info{
		margin-bottom: 80rpx;
	}

	.box{
		border-bottom: 1px solid #eee;
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
		.item1{
			display: flex;
			align-items: center;
		}
	}
</style>
