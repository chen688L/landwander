<template>
	<view>
		<view class="item" @click="toSafe()">
			<view>账号与安全</view>
			<image src="../../static/enter.png"></image>
		</view>
		<view class="item" @click="toAboutUs()">
			<view>关于我们</view>
			<image src="../../static/enter.png"></image>
		</view>
		<view class="item" @click="share()">
			<view>分享给好友</view>
			<image src="../../static/enter.png"></image>
		</view>
		<button @click="reglogin()">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			share(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href:"https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/962fc340-4f2c-11eb-bdc1-8bd33eb6adaa.png",
					title:"土地租聘app",
					summary:"欢迎使用土地租聘app，快来跟我一起下载吧！",
					imageUrl:'http://172.16.205.110:8082/#/pages/home/home',
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});

			},
			toSafe(){
				if(uni.getStorageSync("userinfo")){
					uni.navigateTo({
						url:'/pages/myuser/safe'
					})
				}else{
					uni.showLoading({
						title: "请先登录",
						icon:'none'
					});
					setTimeout(function () {
						uni.hideLoading();
					}, 2000);
				}
				
			},
			toAboutUs(){
				uni.navigateTo({
					url:"/pages/myuser/aboutUs"
				})
			},
			reglogin(){
				uni.removeStorageSync('userinfo');
				uni.switchTab({
					url:'/pages/home/home'
				})
			}
		}
	}
</script>

<style lang="scss">
	.item{
		width: 90%;
		margin: 60rpx auto;
		display: flex;
		justify-content: space-between;
	}
	image{
		width: 40rpx;
		height: 40rpx;
	}
	button{
		width: 90%;
		color: red;
	}

</style>
