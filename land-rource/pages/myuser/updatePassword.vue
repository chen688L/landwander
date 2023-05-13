<template>
	<view class="updatePassword">
		<view class="item">
			<text>旧密码：</text>
			<input type="number" placeholder="点击输入旧密码" v-model="oldPwd"/>
		</view>
		<view class="item">
			<text>新密码：</text>
			<input type="number" placeholder="请设置6-12位登录密码" v-model="newPwd"/>
		</view>
		<view class="item">
			<text>新密码确认：</text>
			<input type="number" placeholder="请再次确认输入密码" v-model="newPwd2"/>
		</view>
		<button @click="updatePwd()">确 认 修 改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPwd:"",
				newPwd:"",
				newPwd2:"",
				isverify:false,
			}
		},
		methods: {
			updatePwd(){
				this.verify()
				if(this.isverify){
					this.$ajax.user.change_pwd({
						uid:uni.getStorageSync("userinfo").uid,
						oldpassword: this.oldPwd,
						newpassword: this.newPwd
					}).then(res=>{
						if(res.message==null){
							uni.removeStorageSync('userinfo');
							uni.removeStorageSync("sr_tkn")
							uni.showLoading({
								title: res.message==null?"修改成功":res.message,
								icon:'none'
							});
							setTimeout(function () {
								uni.hideLoading();
							}, 2000);
							uni.switchTab({
								url:"/pages/home/home"
							})
						}
						
						
					}).catch(err=>{
						uni.showLoading({
							title: "修改失败！",
							icon:'none'
						});
						setTimeout(function () {
							uni.hideLoading();
						}, 2000);
					})
				}
			},
			verify(){
				let oldPwd = this.oldPwd
				let newPwd = this.newPwd
				let newPwd2 = this.newPwd2
				this.isverify = false
				if(oldPwd=="" || newPwd=="" || newPwd2==""){
					uni.showLoading({
						title: "密码不能为空！",
						icon:'none'
					});
					setTimeout(function () {
						uni.hideLoading();
					}, 2000);
				}else if(newPwd.length<6 || newPwd.length>12){
					uni.showLoading({
						title: "密码长度错误！",
						icon:'none'
					});
					setTimeout(function () {
						uni.hideLoading();
					}, 2000);
				}else if(newPwd!=newPwd2){
					uni.showLoading({
						title: "输入新密码不相同！",
						icon:'none'
					});
					setTimeout(function () {
						uni.hideLoading();
					}, 2000);
				}else{
					this.isverify = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.updatePassword{
		margin-top: 50rpx;
		font-size: 32rpx;
	}
	.item{
		display: flex;
		padding: 20rpx 30rpx;
		text{
			display: block;
			width: 200rpx;
		}
	}
	button{
		margin-top: 30rpx;
		width: 90%;
		background-color: orange;
		color: #fff;
	}
</style>
