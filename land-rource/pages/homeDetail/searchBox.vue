<template>
	<view>
		<!-- 头部搜索区域 -->
		<view class="navBar">
			<view class="navBar-search">
				<image src="../../static/search.png" mode="widthFix" style="width: 34rpx;"></image>
				<input type="text" confirm-type="search" @confirm="toSearch()" placeholder="园林" v-model="content"
					placeholder-style="font-size:30rpx;color:#B5B9BF" />
				<button style="margin-left: 20rpx;" @click="selectLand()">搜 索</button>
			</view>
			<view class="cancel" @click="toSearchLand()">取消</view>
		</view>
		<view class="content">
			<view class="tips">热门搜索</view>
			<view class="history">
				<view class="item" v-for="(item,index) in hotList" @click="search(item)">
					{{item}}
				</view>
			</view>
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
				hotList: [],
				historyAShow: false,
				historyBShow: false
			}
		},
		onLoad() {
			this.getHotRecord()
		},
		onShow() {
			this.historyList = uni.getStorageSync("sys_land_historyselect");
			this.content = uni.getStorageSync("sys_land_selectcontent")
		},
		onBackPress(options) {
			if (options.from == 'backbutton') {
				uni.switchTab({
					url: "/pages/home/home"
				})
				return true;
			} else if (options.from == 'navigateBack') {
				return false;
			}
		},
		methods: {
			getHotRecord() {
				this.$ajax.dict.checkHotRecord().then(res => {
					this.hotList = res.data
				})
			},
			// 取消搜索,返回
			toSearchLand() {
				uni.switchTab({
					url: "/pages/home/home"
				})
			},
			// 收起展开历史记录
			historyShow(val) {
				this.historyAShow = val
			},
			// 搜索按钮
			selectLand() {
				this.toSelectLand()
			},
			// 搜索处理
			toSelectLand() {
				let hoistry = uni.getStorageSync("sys_land_historyselect");
				let n = hoistry ? hoistry : [];
				n.unshift(this.content)
				uni.setStorageSync("sys_land_historyselect", n)
				uni.setStorageSync("sys_land_selectcontent", this.content)
				//上传到数据库
				this.$ajax.record.add({
					uid: uni.getStorageSync("userinfo").uid,
					content: this.content,
					state: 2
				}).then(res => {
					console.log(res);
				})
				uni.navigateTo({
					url: "/pages/homeDetail/searchLand"
				})
			},
			// 点击 历史 或 热门 选项搜索
			search(val) {
				this.content = val
				this.toSelectLand()
			},
			// 删除历史记录
			delhistory() {
				uni.removeStorageSync("sys_land_historyselect")
				this.historyList = [];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navBar {
		padding: 5rpx 32rpx 6rpx 28rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		background-color: #FFCC33;
		// box-shadow: 8rpx 8rpx 8rpx #eee;

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
				margin-right: 70rpx;
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
