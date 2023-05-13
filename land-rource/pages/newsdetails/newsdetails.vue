<template>
	<view class="newsd">
		<view class="title">{{news.title}}</view>
		<view class="time">
			<image src="../../static/time.png"></image>
			{{news.updatedAt | getTime}}</view>
		<view class="content" v-html="news.content">
		</view>
		<!-- <image :src="url+news.picture"></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news:{},
				url: " ",
			}
		},
		methods: {
			
		},
		onLoad() {
			this.url = getApp().globalData.serviceIp
			this.news = uni.getStorageSync("sys_news_details")
		},
		filters: {
			getTime(time) {
				var json_date = new Date(time).toJSON();
				  return new Date(new Date(json_date) + 8 * 3600 * 1000)
				    .toISOString()
				    .replace(/T/g, " ")
				    .replace(/\.[\d]{3}Z/, "");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.newsd{
		width: 90%;
		margin: 10rpx auto;
		margin-bottom: 30rpx;
	}
	.title{
		font-size: 40rpx;
		font-weight: bold;
	}
	.time{
		margin: 20rpx 0;
		display: flex;
		align-items: center;
		color: #9d9d9d;
		font-size: 28rpx;
		image{
			margin-right: 20rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}
</style>
