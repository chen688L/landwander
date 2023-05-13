<template>
	<view>
		<!-- 头部搜索区域 -->
		<view class="navBar">
			<image :src="url+user.avater"></image>
			<view>{{user.name}}</view>
		</view>
		<!-- 搜索内容 -->
		<view style="padding: 10rpx 30rpx;border-top: 1px solid #8d8d8d;margin-top: 10rpx;">{{user.name}} 发布的土地：</view>
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
				reachIndex: 0,
				user:""
			}
		},
		onShow() {
			this.url = getApp().globalData.serviceIp

		},
		onLoad() {
			this.getSearchLand()
			this.$ajax.user.findByuid({
				uid: uni.getStorageSync("sys_oneuserland").uid
			}).then(res => {
				this.user=res.data
			})
		},
		onReachBottom() {
			console.log("lalal");
			if (this.reachIndex) {
				this.pageSize = this.pageSize + this.pageNum
				this.getSearchLand()
				console.log("触发");
			}
		},
		methods: {
			updateSysSelectLand(val) {
				uni.setStorageSync("select_land_reasult", val)
			},
			getSearchLand() {
				this.$ajax.land.checklandByUid({
					uid: uni.getStorageSync("sys_oneuserland").uid,
					ispass: 2,
					status: "",
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}).then(res => {
					this.lands = this.lands.concat(res.data)
					console.log(22, res.data);
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
				uni.setStorageSync("sys_land_selectcontent", this.searchReasult)
				this.getSearchLand()
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
		padding: 6rpx 10rpx;
		text-align: center;
		background-color: #fff;

		image {
			border-radius: 180rpx;
			width: 180rpx;
			height: 180rpx;
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
