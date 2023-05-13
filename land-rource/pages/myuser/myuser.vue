<template>
	<view>
		<!-- 头部个人信息 -->
		<view class="top">
			<image class="imgavater" v-if="userinfo.avater" :src="url+userinfo.avater"></image>
			<image class="imgavater" v-else src="../../static/user/logo.jpg" @click="check()"></image>

			<view v-if="userinfo.phone">
				<view class="username">{{userinfo.username}}</view>
				<view class="check" @click="check()">查看并编辑个人资料</view>
			</view>
			<view v-if="!userinfo.phone">
				<text class="loginbtn" @click="tologin()">请先登录...</text>
			</view>
		</view>
		<!-- 土地管理 盒子 -->
		<view class="block">
			<view class="landtit">土地管理</view>
			<view class="landmanage">
				<view @click="tomyLand()">
					<image src="../../static/all.png"></image>
					<view class="landitem">全部</view>
				</view>
				<view @click="tomyLand(2)">
					<image src="../../static/send.png"></image>
					<view class="landitem">已发布</view>
				</view>
				<view @click="tomyLand(1)">
					<image src="../../static/sh.png"></image>
					<view class="landitem">待审核</view>
				</view>
			</view>
		</view>
		<!-- 个人管理 盒子 -->
		<view class="block">
			<view class="landtit">个人管理</view>
			<view class="person" @click="toCollect()">
				<image src="../../static/sc.png"></image>
				<text>我的收藏</text>
			</view>
			<view class="person" @click="toContract()">
				<image src="../../static/ht.png"></image>
				<text>合同大全</text>
			</view>
			<view class="person" @click="tomyDemand()">
				<image src="../../static/xq.png"></image>
				<text>我的需求</text>
			</view>
			<view class="person" @click="toHelp()">
				<image src="../../static/bz.png"></image>
				<text>帮助与反馈</text>
			</view>
			<view class="person">
				<image src="../../static/kf.png"></image>
				<text>联系客服</text>
			</view>
			<view class="person" @click="toSetting()">
				<image src="../../static/sz.png"></image>
				<text>设置</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {
					username: ""
				},
				url: '',
			}
		},
		onLoad() {
			this.url = getApp().globalData.serviceIp
		},
		onShow() {
			this.url = getApp().globalData.serviceIp
		},
		onShow() {
			if (uni.getStorageSync('userinfo')) {
				this.userinfo = uni.getStorageSync('userinfo')
			} else {
				this.userinfo = {}
			}
		},
		methods: {
			tologin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			toCollect() {
				uni.navigateTo({
					url: '/pages/myuser/myCollect'
				})
			},
			toContract() {
				uni.navigateTo({
					url: '/pages/myuser/contract'
				})
			},
			toSetting() {
				uni.navigateTo({
					url: '/pages/myuser/setting'
				})
			},
			toHelp() {
				uni.navigateTo({
					url: '/pages/myuser/help'
				})
			},
			check() {
				uni.navigateTo({
					url: '/pages/myuser/changeInfo'
				})
			},
			tomyLand(index) {
				uni.setStorageSync("myLandCheckIndex", index)
				uni.navigateTo({
					url: '/pages/myuser/myLand'
				})
			},
			tomyDemand() {
				uni.navigateTo({
					url: '/pages/myuser/myDemand'
				})
			}
		}
	}
</script>

<style lang="scss">
	.top {
		display: flex;
		align-items: center;
		width: 90%;
		border: 1px solid #EEEEEE;
		box-shadow: 10rpx 10rpx 10rpx #eee;
		border-radius: 20rpx;
		margin: 30rpx auto;

		.imgavater {
			border-radius: 80rpx;
			margin: 30rpx;
		}

		image {
			width: 160rpx;
			height: 160rpx;
		}

		.username {
			margin-left: 30rpx;
			margin-bottom: 20rpx;
			font-size: 36rpx;
		}

		.check {
			margin-left: 30rpx;
			font-size: 28rpx;
			color: #999999;
		}
	}

	.loginbtn {
		color: #888888;
	}

	.block {
		width: 90%;
		margin: 40rpx auto;
		padding: 20rpx 0;
		border-radius: 20rpx;
		border: 1px solid #EEEEEE;
		box-shadow: 10rpx 10rpx 10rpx #EEEEEE;
	}

	.landtit {
		margin-left: 20rpx;
		margin-bottom: 26rpx;
		font-weight: bold;
	}

	.landmanage {
		margin-left: 20rpx;
		margin-right: 20rpx;
		padding: 10rpx 0;
		display: flex;
		justify-content: space-between;
		text-align: center;
		font-size: 28rpx;

		image {
			width: 110rpx;
			height: 110rpx;
		}

		.landitem {
			padding-top: 20rpx;
		}
	}

	.person {
		margin-left: 20rpx;
		margin-top: 26rpx;
		display: flex;
		align-items: center;

		image {
			margin-right: 16rpx;
			width: 80rpx;
			height: 80rpx;
		}

		text {
			font-size: 28rpx;
		}
	}
</style>
