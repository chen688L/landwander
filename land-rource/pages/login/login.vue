<template>
	<view class="loginpage" :style="'height:'+screenHeight+'px'">
		<view class="main animate__animated animate__flipInY">
			<view class="tabs">
				<image src="../../static/user/logo.jpg"></image>
			</view>
			<view class="sumbform">
				<form class="user">
					<input focus v-model="phone" placeholder="请输入账号"/>
					<input v-model="pwd" password type="text" placeholder="请输入密码"/>
					<button form-type="submit" @click="login()"><text>登 &emsp;&emsp;&emsp;&emsp; 录</text></button>
					<text class="toreg" @click="toreg">无账号，去注册</text>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: getApp().globalData.screenHeight- 120,
				phone:"",
				pwd:"",
			}
		},
		onLoad() {
			let uphone = uni.getStorageSync('sys_user_phone')
			if(uphone!=""&&uphone!=null){
				this.phone = uphone
			}
		},
		onShow() {
			let uphone = uni.getStorageSync('sys_user_phone')
			if(uphone!=""&&uphone!=null){
				this.phone = uphone
			}
		},
		methods: {
			toreg(){
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			login(){
				console.log(this.phone);
				// 判断手机号是否合法
				this.verPhone()
				if(this.phone!='' && this.pwd!='' ){
					this.$ajax.user.login({
					        phone:this.phone,
							password:this.pwd
					    }).then((res) => {
							if(res.state==200){
								uni.setStorageSync('userinfo',res.data)
								uni.setStorageSync("sr_tkn", res.data.token);
								uni.switchTab({
									url: '/pages/home/home'
								})
							}else{
								uni.showLoading({
									title: res.message,
									icon:'none'
								});
								
								setTimeout(function () {
									uni.hideLoading();
								}, 2000);
							}
						})
				}else{
					uni.showLoading({
						title: "账号或密码不能为空",
						icon:'none'
					});
					setTimeout(function () {
						uni.hideLoading();
					}, 2000);
				}
			},
			verPhone(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	$width : 604rpx;
	$form-item-height : 96rpx;

	// 全局设置
	.loginpage{
		// background: #FFCC33;
		display: flex;
		justify-content: center;
		padding-top: 240rpx;
	}
	// 白色区域内容
	.main{
		background: #FFFFFF;
		padding-top: 20rpx;
		padding-bottom: 40rpx;
		width: 90%;
		margin: 0 auto;
		border-radius: 20rpx;
		height: 600rpx;
	}
	// 登录logo
	.tabs{
		text-align: center;
		margin-bottom: 40rpx;
		image{
			width: 60px;
			height: 60px;
		}
	}
	/* 表单区域 */
	.sumbform{
		margin: 0 auto;
		width: $width;
	}
	input{
		background: #EEEEEE;
		width: $width - 40;
		height: $form-item-height;
		line-height: $form-item-height;
		margin: 20rpx auto;
		padding-left: 40rpx;
		border: 1px solid #EEEEEE;
		border-radius: 40rpx;
	}
	button{
		width: $width;
		height: $form-item-height;
		line-height: $form-item-height;
		border-radius: 40rpx;
		margin-top: 60rpx;
		background: #00CCCC;
		color: #ffffff;
	}
	/* 去注册提示 */
	.toreg{
		font-size: 28rpx;
		text-decoration: underline;
		float: right;
		line-height: $form-item-height;
		color: #666666;
	}
	
</style>
