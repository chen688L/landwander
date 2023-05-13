<template>
	<view class="demanddetails" :style="'height:'+screenHeight+'px'">
		<view class="header">
			<view class="title">{{demand.title}}</view>
			<view class="moneyF">
				<text class="money">{{demand.priceDown}}~{{demand.priceUp}} </text>
				{{demand.type=="住宅用地"?'元/平米/年':'元/亩/年'}}
			</view>
			<view class="row removetop">
				<text>更新：{{demand.updatedAt | formatDate}}</text>
				<text>ID:172877</text>
			</view>
		</view>
		<view class="content">
			<view class="row removetop">
				<text>所在地区：</text>
				<view>{{demand.address}}</view>
			</view>
			<view class="row">
				<text>需求类型：</text>
				<view>{{demand.type}}</view>
			</view>
			<view class="row">
				<text>面积大小：</text>
				<view>{{demand.areaDown}}~{{demand.areaUp}} {{demand.type=="住宅用地"?'平米':'亩'}}</view>
			</view>
			<view class="row">
				<text>需求年限：</text>
				<view>{{demand.year}} 年</view>
			</view>
		</view>
		<view class="details">
			<view>需求介绍</view>
			<text>{{demand.content}}</text>
		</view>
		<view class="bottom">
			<view>{{user.name}}</view>
			<view class="phone" @click="telphone()">
				拨打电话
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				demand: {},
				screenHeight: getApp().globalData.screenHeight,
				user: "",
			}
		},
		onLoad(options) {
			this.demand = uni.getStorageSync('demandhome')

		},
		onShow() {
			this.$ajax.user.findByuid({
				uid: this.demand.uid
			}).then(res => {
				console.log('user:', res.data);
				this.user = res.data
			})
		},
		methods: {
			//拨打电话
			telphone(){
				if(uni.getStorageSync("userinfo").ispass==2){
					this.telFun();
				}else{
					uni.showLoading({
						title: "请先进行实名认证！",
						icon:'none'
					});
					
					setTimeout(function () {
						uni.hideLoading();
					}, 2000);
				}
			},
			telFun() {
				// 获取设备平台
				let phone =this.demand.phone
				let platform = uni.getSystemInfoSync().platform;
				if (platform == 'android') {
					uni.showActionSheet({
						itemList: [phone, '呼叫'],
						success: function(res) {
							console.log(res);
							if (res.tapIndex == 1) {
								uni.makePhoneCall({
									phoneNumber: phone,
								})
							}
						}
					})

				} else if (platform == 'ios') {
					// 使用uni-app提供的借口
					uni.makePhoneCall({
						phoneNumber: phone,

					})
				}
			}
		},
		filters: {
			formatDate(oldDate) {
				// 方式1 转换为'yyyy-MM-dd HH:mm:ss'
				function add0(num) {
					return num < 10 ? '0' + num : num
				} // 个位数的值在前面补0
				const date = new Date(oldDate)
				const Y = date.getFullYear()
				const M = date.getMonth() + 1
				const D = date.getDate()
				const h = date.getHours()
				const m = date.getMinutes()
				const s = date.getSeconds()

				const dateString = Y + '-' + add0(M) + '-' + add0(D) + '  ' + add0(h) + ':' + add0(m) + ':' + add0(s)
				return dateString
			},
		}
	}
</script>

<style lang="scss" scoped>
	.demanddetails {
		height: 100%;
		background-color: #F0EFF4;
	}

	text {
		color: #9D9D9D;
		font-size: 28rpx;
	}

	.header {
		padding: 30rpx;
		margin: 20rpx 0;
		background-color: #ffffff;
	}

	.title {
		font-size: 36rpx;
	}

	.moneyF {
		color: orange;
		font-size: 24rpx;

		.money {
			line-height: 80rpx;
			font-size: 48rpx;
			color: orange;
			margin-right: 10rpx;
		}
	}


	.content {
		padding: 30rpx;
		margin: 20rpx 0;
		background-color: #ffffff;
	}

	.row {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.removetop {
		margin-top: 0;
	}

	.details {
		padding: 30rpx;
		margin: 20rpx 0;
		background-color: #ffffff;

		view {
			margin-bottom: 20rpx;
		}
	}

	.bottom {
		position: fixed;
		bottom: 0;
		box-shadow: 4rpx 8rpx 10rpx #EEEEEE;
		width: 100%;
		padding: 20rpx 0;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.phone {
		background-color: orange;
		height: 80rpx;
		width: 280rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50rpx;
	}
</style>
