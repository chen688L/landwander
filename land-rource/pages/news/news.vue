<template>
	<view>
		<view class="search">
			<image @click="tohome()" class="whiteleft" src="../../static/whiteleft.png"></image>
			<image class="navimg" src="../../static/lb/zx.png" mode="aspectFill"></image>
			<view class="input">
				<view class="search_key">
					<view style="display: flex;" @click="selectNews()">
						<uni-icons type="search" size="20" color="#999"></uni-icons>
						<!-- <view class="keyword">请输入关键字搜索</view> -->
						<input placeholder="请输入关键字搜索" placeholder-style="font-size:26rpx;" v-model="searchContent" />
					</view>
					<image v-if="searchContent!=''" @click="closeSearch()" class="close" src="../../static/err.png">
					</image>
				</view>
			</view>
		</view>
		<view class="news">
			<view class="newsbox" v-for="(item,index) in news" :key="index" @click="tonewsdetails(item)">
				<view class="title">{{item.title}}</view>
				<image :src="url+item.picture" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				news: [],
				pageNum: 10,
				pageSize: 0,
				url: " ",
				searchContent:"",
				reachIndex: 1,
			}
		},
		onLoad() {
			this.url = getApp().globalData.serviceIp
			this.searchContent = uni.getStorageSync("sys_news_selectcontent")
			this.getNews()
		},
		onShow() {
			
		},
		onReachBottom() {
			if (this.reachIndex) {
				this.pageSize = this.pageSize + this.pageNum
				this.getNews()
			}
		},
		methods: {
			tohome(){
				uni.switchTab({
					url:"/pages/home/home"
				})
			},
			getNews() {
				this.$ajax.news.check({
					title: this.searchContent,
					content: "",
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}).then(res => {
					this.news = this.news.concat(res.data)
					if (res.data.length == 0) {
						this.reachIndex = 0
					}
				})
			},
			tonewsdetails(item) {
				uni.setStorageSync("sys_news_details", item)
				uni.navigateTo({
					url: "/pages/newsdetails/newsdetails"
				})
			},
			selectNews() {
				console.log(122);
				uni.navigateTo({
					url: "/pages/newsdetails/searchBox"
				})
			},
			closeSearch(){
				this.searchContent = ""
				uni.setStorageSync("sys_news_selectcontent", this.searchContent)
				this.getNews()
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	.search {
		background-color: #fff;
		position: relative;
	}
	.whiteleft{
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		z-index: 10;
		top: 30rpx;
	}

	.search>.input {
		display: flex;
		align-items: center;
		position: absolute;
		top: 270rpx;
		left: 50%;
		transform: translateX(-50%);
		padding-left: 50rpx;
		background-color: #eee;
		width: 80%;
		height: 70rpx;
		border-radius: 30rpx;
		font-size: 28rpx;
	}

	.navimg {
		width: 100%;
		height: 300rpx;
	}

	.search_key {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 85%;
		position: absolute;
		font-size: 28rpx;

		input {
			margin-left: 10rpx;
		}
	}

	.newsbox:first-child {
		margin-top: 50rpx;
	}

	.newsbox {
		border-bottom: 2rpx solid #eee;
		display: flex;
		padding: 20rpx 30rpx;

		.title {
			width: 560rpx;
		}

		image {
			width: 380rpx;
			height: 160rpx;
		}
	}

	.close {
		width: 50rpx;
		height: 50rpx;
	}
</style>
