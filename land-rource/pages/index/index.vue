<template>
	<view class="content" :style="'height:'+screenHeight+'px'">
		<image class="logo" src="/static/user/bg.png"></image>
		<view class="text-area">
			<button class="login" @click="tologin()"><text>登 &emsp;&emsp;&emsp;&emsp; 录</text></button>
			<button class="register" @click="toreg()">注 &emsp;&emsp;&emsp;&emsp; 册</button>
			<text class="enter" @click="toHome()">暂不登录，先逛逛 ั </text>
		</view>
	</view>
</template>

<script>
	import $http from '../../common/api/request.js'
	export default {
		data() {
			return {
				screenHeight: getApp().globalData.screenHeight
			}
		},
		onLoad() {
			uni.hideTabBar()
			// $http.request({
			// 	url:"/api/v/homes"
			// }).then((res)=>{
			// 	console.log(res);
			// })
		},
		onShow(){
			if(uni.getStorageSync("userinfo").uid){
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		},
		methods: {
			tologin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			toreg() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			toHome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		}
	}
</script>

<style scoped>
	/* page{
		height: 100%;
		background-color: #00CCCC;
	} */
	.content {
		height: 100%;
		background: #FFCC33;
	}
	/* 图片 */
	.logo{ 
		margin-top: 70rpx;
		width: 400rpx;
		height: 400rpx;
	}
	/* 全部文字图片居中 */
	.content {
		text-align: center;
	}

	button {
		width: 604rpx;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 20rpx;
		margin-top: 40rpx;
	}

	/* 登录按钮设置 */
	.login {
		background: #00CCCC;
		color: #ffffff;
	}
	
	/* 暂不登录提醒 */
	.enter {
		line-height: 120rpx;
		font-size: 28rpx;
	}
</style>
