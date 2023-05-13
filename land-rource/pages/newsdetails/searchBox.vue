<template>
	<view>
		<!-- 头部搜索区域 -->
		<view class="search">
			<image class="navimg" src="../../static/lb/zx.png" mode="aspectFill"></image>
			<view class="navBar">
				<view class="navBar-search">
					<image src="../../static/search.png" mode="widthFix" style="width: 34rpx;"></image>
					<input type="text" confirm-type="search" @confirm="toSearch()" placeholder="园林" v-model="content"
						placeholder-style="font-size:30rpx;color:#B5B9BF" />
					<button @click="toSelect()">搜 索</button>
				</view>
				<view class="cancel" @click="toNews()">取消</view>
			</view>
		</view>
		<view class="content">
			<view class="tips tip1">
				<text>历史搜索</text>
				<image src="../../static/delete.png" @click="delhistory()"></image>
			</view>
			<view class="history">
				<view class="item" v-for="(item,index) in historyList" v-if="historyAShow?(index<7):true"
					@click="search(item)">
					{{item}}
				</view>
				<view v-if="historyAShow" class="item" @click="historyShow(false)">更多...</view>
				<view v-if="!historyAShow&&historyBShow" class="item" @click="historyShow(true)">收起</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				historyList: [],
				historyAShow: false,
				historyBShow: false
			}
		},
		onShow() {
			this.historyList = uni.getStorageSync("sys_news_historyselect");
			this.content = uni.getStorageSync("sys_news_selectcontent")
		},
		methods: {
			// 取消搜索,返回
			toNews() {
				uni.navigateTo({
					url: "/pages/news/news"
				})
			},
			// 收起展开历史记录
			historyShow(val) {
				this.historyAShow = val
			},
			// 搜索按钮
			toSelect() {
				this.toSelectNews()
			},
			// 搜索处理
			toSelectNews() {
				let hoistry = uni.getStorageSync("sys_news_historyselect");
				let n = hoistry ? hoistry : [];
				n.unshift(this.content)
				uni.setStorageSync("sys_news_historyselect", n)
				uni.setStorageSync("sys_news_selectcontent", this.content)
				uni.navigateTo({
					url: "/pages/news/news"
				})
			},
			// 点击 历史 或 热门 选项搜索
			search(val) {
				this.content = val
				this.toSelectNews()
			},
			// 删除历史记录
			delhistory() {
				uni.removeStorageSync("sys_news_historyselect")
				this.historyList = [];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		background-color: #fff;
		position: relative;

		.navimg {
			width: 100%;
			height: 400rpx;
		}
	}

	.navBar {
		padding: 5rpx 32rpx 6rpx 28rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		position: absolute;
		top: 240rpx;
		width: 100%;
		box-sizing: border-box;

		&-search {
			border: 2rpx solid black;
			margin: 0 auto;
			width: 580rpx;
			height: 68rpx;
			background-color: #F8F9FA;
			border-radius: 30rpx;
			padding-left: 16rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			input {
				margin-left: 20rpx;
				margin-right: 90rpx;
			}

			button {
				height: 100%;
				width: 178rpx;
				border-radius: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				background-color: #2868f8;
				color: #fff;
			}
		}

		.cancel {
			font-size: 32rpx;
			color: #fff;
		}
	}


	.content {
		height: 900rpx;
		background-color: #fff;
		border-radius: 80rpx 80rpx 0 0;
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;
		top: -80rpx;
		.tips {
			margin: 60rpx 0 16rpx 0;
		}

		.tip1 {
			display: flex;
			justify-content: space-between;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.history {
			display: flex;
			flex-wrap: wrap;
		}

		.item {
			background-color: #eee;
			border-radius: 30rpx;
			padding: 10rpx 30rpx;
			margin-right: 12rpx;
			margin-top: 16rpx;
		}
	}
</style>
