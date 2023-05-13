<template>
	<view class="selectBox">
		<view class="box">
			<view class="nav">
				<image src="../../static/search.png"></image>
				<input placeholder="请输入搜索内容" v-model="content" />
				<view class="selectBtn">
					<view class="selectBtn-item" @click="selectDemand()">搜 索</view>
				</view>
			</view>
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
			this.historyList = uni.getStorageSync("sys_demand_historyselect");
			this.historyAShow = (this.historyList.length >= 8 && this.historyList.length != 0) ? true : false
			console.log(this.historyAShow);
			this.historyBShow = this.historyList.length >= 8 && this.historyList.length != 0
		},
		onShow() {
			this.historyList = uni.getStorageSync("sys_demand_historyselect");
			this.content = uni.getStorageSync("sys_demand_selectcontent")
		},
		// 设置固定返回需求大厅
		onBackPress(options) {
			console.log(options.from);
			if (options.from == 'backbutton') {
				uni.navigateTo({
					url: "/pages/demandhall/demandhall"
				})
				return true;
			} else if (options.from == 'navigateBack') {
				return false;
			}
		},
		methods: {
			getHotRecord(){
				this.$ajax.dict.checkHotRecord().then(res=>{
					this.hotList = res.data
				})
			},
			historyShow(val) {
				this.historyAShow = val
			},
			selectDemand() {
				this.todemadhall()
			},
			todemadhall() {
				let hoistry = uni.getStorageSync("sys_demand_historyselect");
				let n = hoistry ? hoistry : [];
				n.unshift(this.content)
				uni.setStorageSync("sys_demand_historyselect", n)
				uni.setStorageSync("sys_demand_selectcontent", this.content)
				//上传到数据库
				this.$ajax.record.add({
					uid:uni.getStorageSync("userinfo").uid,
					content:this.content,
					state:2
				}).then(res=>{
					console.log(res);
				})
				uni.navigateTo({
					url: "/pages/demandhall/demandhall"
				})
			},
			search(val) {
				this.content = val
				this.todemadhall()
			},
			delhistory() {
				uni.removeStorageSync("sys_demand_historyselect")
				this.historyList = [];
			}

		}
	}
</script>

<style lang="scss" scoped>
	.selectBox {
		background-color: #FFCC33;
		width: 100%;
	}

	.box {
		background-color: #FFCC33;
		padding: 10rpx 0;
		height: 85rpx;
	}

	.nav {
		background-color: #fff;
		width: 88%;
		height: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		border: 2rpx solid black;
		border-radius: 60rpx;
		display: flex;
		align-items: center;

		image {
			width: 60rpx;
			height: 52rpx;
			margin-left: 16rpx;
		}

		input {
			width: 70%;
			padding-left: 10rpx;
			padding-right: 10rpx;
		}
	}

	.selectBtn {
		height: 100%;
		width: 190rpx;
		border: 2rpx solid black;
		border-radius: 60rpx;

		.selectBtn-item {
			height: 73rpx;
			background-color: #2868f8;
			color: #fff;
			border: 2rpx solid black;
			border-radius: 60rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
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
