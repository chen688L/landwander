<template>
	<view class="issue">
		<view>
			<view class="box">
				<view class="require vcor" @click="toaddland()">
					<image src="../../static/xie.png"></image>
				</view>
				<view style="margin-top: 20rpx;">发土地</view>
			</view>
			<view class="box">
				<view class="require" @click="toaddDemand()">
					<image src="../../static/zhao.png"></image>
				</view>
				<view style="margin-top: 20rpx;">发找地</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: ""
			}
		},
		onShow() {
			let userinfo = uni.getStorageSync('userinfo');
			if (userinfo) {
				this.userId = userinfo.uid
			}
		},
		methods: {
			toaddland() {
				if (this.userId) {
					uni.setStorageSync("sys_update_land","addland")
					uni.removeStorageSync("sys_landinfo")
					uni.removeStorageSync("land_address")
					uni.removeStorageSync("testifyimgs")
					uni.removeStorageSync("landimgs")
					
					let ispass= uni.getStorageSync('userinfo').ispass;
					if(ispass==2){
						uni.navigateTo({
							url: '/pages/issue/addland'
						})
					}else {
						uni.showLoading({
							title: "请先实名认证，并通过",
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 2000);
					}
					
				} else {
					uni.showLoading({
						title: "请先登录",
						icon: 'none'
					});

					setTimeout(function() {
						uni.hideLoading();
					}, 2000);
				}
			},
			toaddDemand(){
				uni.navigateTo({
					url:"/pages/issue/addDemand"
				})
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.issue {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 200rpx;
	}

	.box {
		width: 100%;
		text-align: center;
	}

	.box:first-child {
		margin-bottom: 80rpx;
	}

	.require {
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200rpx;
		height: 200rpx;
		border-radius: 200rpx;
		background: linear-gradient(to top left, #00cc66 0%, #00ffcc 100%);
		box-shadow: 8rpx 8rpx 8rpx #eee;

		image {
			width: 120rpx;
			height: 120rpx;
		}


	}

	.vcor {
		background: linear-gradient(to top left, #0066cc 0%, #ffffff 108%);
	}
</style>
