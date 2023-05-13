<template>
	<view class="demandhall">
		<view class="gender">
			<view class="wu">
				<view class="wuLeft" @click="checkdemand()">
					<image src="../../static/search.png"></image>
				</view>
				<view class="wuRight" @click="checkdemand()">
					<input type="text" placeholder="输入需求" v-model="content" />
				</view>
				<view class="search">
					<view @click="checkdemand()" v-if="content==''" class="btn">搜 索</view>
					<view @click="cleanDemand()" v-else class="btn btn1">清 除</view>
				</view>
			</view>
		</view>
		<view class="demands">
			<view v-for="item in demand" :key="item.id" class="box" @click="todetail(item)">
				<view>{{item.title}}</view>
				<view class="flexbox">
					<text>
						<text class="money">{{item.areaDown}}~{{item.areaUp}}</text>
						<text>{{item.type=="住宅用地"?'元/平米/年':'元/亩/年'}}</text>
					</text>
					<text class="row">{{item.year}}年</text>
				</view>
				<view class="flexbox row">
					<view class="three">
						<image src="../../static/landmu.png"></image>
						<text>{{item.areaDown}}-{{item.areaUp}}{{item.type=="住宅用地"?'平米':'亩'}}</text>
					</view>
					<view class="three">
						<image src="../../static/dw.png"></image>
						{{item.address}}
					</view>
				</view>
			</view>
			<view class="bottom">到底了~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unit: '元/亩/年',
				demand: [],
				pageNum: 10,
				pageSize: 0,
				reachIndex: 1,
				content: ""
			}
		},
		onShow() {


		},
		onLoad() {
			this.content = uni.getStorageSync("sys_demand_selectcontent")
			if (this.content) {
				this.demand = []
				this.selectDemandResult(this.content, this.pageSize, this.pageNum)
			} else {
				this.selectDemand(this.pageSize, this.pageNum)
			}
		},
		// 设置固定返回首页
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
		onReachBottom() {
			if (this.reachIndex) {
				this.pageSize = this.pageSize + this.pageNum
				if (this.content) {
					this.selectDemandResult(this.content, this.pageSize, this.pageNum)
				} else {
					this.selectDemand(this.pageSize, this.pageNum)
				}
			}
		},
		methods: {
			selectDemand(pageSize, pageNum) {
				this.$ajax.demand.check({
					uid: '',
					pageSize: pageSize,
					pageNum: pageNum
				}).then(res => {
					console.log(res.data);
					if (res.data.length == 0) {
						this.reachIndex = 0
					}
					this.demand = this.demand.concat(res.data)
				})
			},
			selectDemandResult(content, pageSize, pageNum) {
				this.$ajax.demand.checks({
					title: content,
					fs: content,
					address: content,
					type: content,
					content: content,
					pageSize: pageSize,
					pageNum: pageNum
				}).then(res => {
					console.log("checks:", res.data);
					if (res.data.length == 0) {
						this.reachIndex = 0
					}
					this.demand = this.demand.concat(res.data)
				})
			},
			cleanDemand(){
				this.demand = []
				this.selectDemand(0,this.pageNum)
				this.content = "";
				uni.setStorageSync("sys_demand_selectcontent",this.content)
			},
			oninput() {},
			checkdemand() {
				uni.navigateTo({
					url: "/pages/demandhall/selectBox"
				})
			},
			todetail(home) {
				uni.setStorage({
					key: 'demandhome',
					data: home
				})
				uni.navigateTo({
					url: "/pages/demandetail/demandetail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.demands {
		background-color: #eee;
		padding-bottom: 20rpx;
	}

	.gender {
		display: flex;
		align-items: center;
		padding-right: 10rpx;
	}

	.wu {
		width: 652rpx;
		/*输入下划线*/
		/* border: 1rpx solid red; */
		height: 84rpx;
		border: 1rpx solid black;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		margin: 10rpx auto;
	}

	.wuLeft {
		margin-left: 28rpx;
		display: flex;
		align-items: center;
	}

	.wuRight {
		margin-left: 14rpx;
		width: 300rpx;
	}

	.wuLeft>image {
		width: 50rpx;
		height: 50rpx;
	}

	.search {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 190rpx;
		height: 86rpx;
		margin-left: 76rpx;
		border: 2rpx solid black;
		border-radius: 40rpx;

		.btn {
			height: 78rpx;
			width: 100%;
			background-color: #2868f8;
			margin-bottom: 8rpx;
			color: #fff;
			border: 2rpx solid black;
			border-radius: 40rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.btn1 {
			background-color: orangered;
		}
	}

	.dropItemRight {
		margin-left: 150rpx;
	}

	.dropItemRight>image {
		width: 42rpx;
		height: 42rpx;
	}

	.demands>.box {
		height: 180rpx;
		padding-left: 30rpx;
		padding-top: 30rpx;
		padding-right: 30rpx;
		border-top: 1px solid #eee;
		background-color: #fff;
	}

	.box>view:first-child {
		padding-bottom: 30rpx;
	}

	.flexbox>view {
		color: #9B9B9D;
		font-size: 28rpx;
	}

	.demands>.box:last-child {
		border-bottom: 1px solid #eee;
	}

	.demands>.box:first-child {
		border: 0;
	}

	.flexbox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.money {
		color: orange;
		font-size: 36rpx;
	}

	.row {
		image {
			padding-top: 6rpx;
			width: 28rpx;
			height: 28rpx;
		}
	}

	.three {
		display: flex;
		align-items: center;
	}

	.bottom {
		text-align: center;
		margin-top: 20rpx;
		color: #9d9d9d;
	}
</style>
