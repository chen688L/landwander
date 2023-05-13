<template>
	<view>
		<!-- 头部搜索区域 -->
		<view class="navBar">
			<view class="navBar-search">
				<view>
					<image src="../../static/search.png" mode="widthFix" style="width: 34rpx;"></image>
					<input type="text" confirm-type="search" @click="toSearch()" placeholder="园林"
						v-model="searchReasult" placeholder-style="font-size:30rpx;color:#B5B9BF" />
				</view>
				<image v-if="searchReasult!=''" class="delete" src="../../static/err.png" @click="closeSearch()">
				</image>
			</view>
		</view>
		<!-- 搜索内容 -->
		<view class="box" v-for="(item,index) in lands" :key="index" @click="tohomeDetail(item)">
			<image id="landimg" :src="url+item.imgurl"></image>
			<view class="right">
				<view class="title">{{item.title}}</view>
				<view class="row">
					<view class="typebox">{{item.dictType}}</view>
					<view class="typebox">{{item.dictValue}}</view>
					<view class="typebox">{{item.fs}}</view>
				</view>
				<view class="row row2">
					<view class="money">{{item.price}}</view>
					<view class="year">{{item.year}}年</view>
				</view>
				<view class="row row2">
					<view class="address">
						<image src="../../static/landmu.png"></image>
						<view>{{item.area}}</view>
					</view>
					<view class="address">
						<image src="../../static/dw.png"></image>
						<view>{{item.address}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lands: [],
				url: ' ',
				searchReasult: "",
				pageNum: 10,
				pageSize: 0,
				reachIndex: 1,

			}
		},
		onShow() {
			this.url = getApp().globalData.serviceIp
			this.searchReasult = uni.getStorageSync("sys_land_selectcontent")
			this.getSearchLand()
		},
		onReachBottom() {
			if (this.reachIndex) {
				this.pageSize = this.pageSize + this.pageNum
				this.getSearchLand()
			}
		},
		methods: {
			updateSysSelectLand(val){
				uni.setStorageSync("select_land_reasult",val)
			},
			getSearchLand(){
				this.$ajax.land.checkland({
					ispass:"2",
					title: this.searchReasult,
					dict_value: this.searchReasult,
					dict_type:this.searchReasult,
					pagerNum:this.pageNum,
					pageSize:this.pageSize
				}).then(res=>{
					this.lands = this.lands.concat(res.data)
					if (res.data.length == 0) {
						this.reachIndex = 0
					}
				})
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/homeDetail/searchBox'
				})
			},
			closeSearch() {
				this.searchReasult = ""
				this.lands = []
				console.log(11);
				if(this.lands.length==0){
					console.log(22);
					this.getSearchLand()
				}
				uni.setStorageSync("sys_land_selectcontent", this.searchReasult)
				
			},
			tohomeDetail(item) {
				uni.setStorageSync('land', item)
				uni.navigateTo({
					url: '/pages/homeDetail/homeDetail'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.navBar {
		padding: 5rpx 32rpx 6rpx 28rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		background-color: #fff;

		&-search {
			border: 2rpx solid black;
			margin: 0 auto;
			width: 690rpx;
			height: 58rpx;
			background-color: #F8F9FA;
			border-radius: 30rpx;
			padding-left: 16rpx;
			// margin-right: 32rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			view {
				display: flex;
				align-items: center;
			}

			input {
				margin-left: 20rpx;
			}
		}
	}

	.delete {
		width: 50rpx;
		height: 50rpx;
	}

	.box {
		display: flex;
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
	}

	#landimg {
		width: 220rpx;
		height: 200rpx;
		margin-right: 20rpx;
	}

	.right {
		width: 430rpx;
	}

	.title {
		font-size: 32rpx;
		height: 40rpx;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.row {
		display: flex;
	}

	.typebox {
		background-color: #eee;
		font-size: 20rpx;
		padding: 4rpx 10rpx;
		color: #9d9d9d;
		border-radius: 6rpx;
		margin-right: 10rpx;
		margin-top: 10rpx;
	}

	.row2 {
		justify-content: space-between;
		align-items: center;
		margin-top: 16rpx;

		.money {
			color: orange;
			font-size: 36rpx;
		}

		.year {
			color: #9d9d9d;
			font-size: 24rpx;
		}
	}

	.address {
		display: flex;
		align-items: center;
		color: #9d9d9d;
		font-size: 24rpx;

		image {
			width: 18rpx;
			height: 18rpx;
			margin-right: 10rpx;
		}
	}
</style>
