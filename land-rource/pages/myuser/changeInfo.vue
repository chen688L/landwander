<template>
	<view class="changeInfo">
		<view class="info">
			<image v-if="userinfo.avater"  :src="url+userinfo.avater"></image>
			<image v-else src="../../static/h.png"></image>
			<view class="upavater" @click="upload('avater')">更换头像</view>
			<view class="title">基本信息</view>
			<view class="rows">
				<view>用户名：</view>
				<input v-model="userinfo.username" />
			</view>
			<view class="rows">
				<view>手机号：</view>
				<input :value="userinfo.phone" readonly disabled="disabled" style="background-color: #eee;" />
			</view>
			<view class="rows">
				<view>性别：</view>
				<view class="radio">
					<radio-group v-model="userinfo.sex" @change="sexradio">
						<radio :checked="userinfo.sex=='男'" value="男">男</radio>
						<radio :checked="userinfo.sex=='女'" value="女">女</radio>
					</radio-group>
				</view>
			</view>
		</view>
		<view class="idea">
			<view class="title">以下信息仅个人可见</view>
			<view class="rows">
				<view>真实姓名：</view>
				<input v-model="userinfo.realname" />
			</view>
			<view class="rows">
				<view>身份证号：</view>
				<input v-model="userinfo.idcard" />
			</view>
			<view class="upload">
				<view>添加凭证(身份证正面):</view>
				<image v-if="userinfo.identityU" @click="upload('identityU')" class="pzimg"
					:src="url+userinfo.identityU"></image>
				<image v-else @click="upload('identityU')" class="addimg" src="../../static/add.png"></image>
			</view>
			<view class="upload">
				<view>添加凭证(反面):</view>
				<image @click="upload('identityD')" v-if="userinfo.identityD" class="pzimg"
					:src="url+userinfo.identityD"></image>
				<image @click="upload('identityD')" v-else class="addimg" src="../../static/add.png"></image>
			</view>
			<image class="passimg" v-if="userinfo.ispass==1" src="../../static/ispass.png"></image>
			<image class="passimg" v-if="userinfo.ispass==2" src="../../static/pass.png"></image>
			<image class="passimg" v-if="userinfo.ispass==3" src="../../static/nopass.png"></image>
		</view>
		<button @click="updateUser()">保 存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {},
				url: '',
				identityU: ""
			}
		},
		onShow() {
			this.url = getApp().globalData.serviceIp
			this.userinfo = uni.getStorageSync('userinfo')
		},
		onLoad() {
			this.refresh()
		},
		methods: {
			sexradio(e) {
				this.userinfo.sex = e.detail.value
			},
			updateUser() {
				this.$ajax.user.updateUser(this.userinfo).then(res=>{
					if(res.state == 200){
						uni.setStorageSync("userinfo",this.userinfo)
						uni.showLoading({
							title: "修改成功",
							icon:'none'
						});
						setTimeout(function () {
							uni.hideLoading();
						}, 2000);
					}else{
						uni.showLoading({
							title: "服务器连接失败...",
							icon:'none'
						});
						setTimeout(function () {
							uni.hideLoading();
						}, 2000);
					}
				})
			},
			refresh(){
				this.$ajax.user.updateUserInfo().then(res=>{
					console.log(res);
					uni.setStorageSync("userinfo",res.data)
					this.userinfo=res.data
				})
			},
			upload(imgname) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: this.url+"/upload/avater",
							filePath: tempFilePaths[0],
							fileType: "image",
							name: "file",
							formData: {
								file: res.tempFiles[0],
								uid: this.userinfo.uid,
							},
							success: ({
								data,
								statusCode
							}) => {
								data = JSON.parse(data)
								console.log(data);
								if (statusCode !== 200) {
									console.log("上传失败", data);
								} else {
									if (imgname == 'identityU') {
										this.userinfo.identityU = data.data
									} else if (imgname == 'identityD') {
										this.userinfo.identityD = data.data
									} else {
										this.userinfo.avater = data.data
									}
								}
								console.log(this.userinfo);
							},
							fail: (err) => {
								console.log(err);
								// this.Tips.toast("上传失败");
							},
						});
					},
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.changeInfo {
		margin-left: 20rpx;
	}

	.title {
		font-weight: bold;
	}

	.upavater {
		text-align: center;
		position: relative;
		font-size: 12px;
		text-decoration: underline;
		top: -12px;
	}

	.info {
		image {
			display: block;
			margin: 20rpx auto;
			width: 200rpx;
			height: 200rpx;
			border-radius: 100rpx;
		}

		.radio {
			width: 320rpx;
		}

		radio:last-child {
			margin-left: 40rpx;
		}
	}

	.rows {
		display: flex;
		width: 520rpx;
		margin-top: 30rpx;
		justify-content: space-between;
	}

	input {
		width: 330rpx;
		border: 1px solid #9d9d9d;
		padding: 6rpx;
		font-size: 28rpx;

	}

	.idea {
		margin-top: 50rpx;
		position: relative;

		.passimg {
			position: absolute;
			width: 100rpx;
			height: 100rpx;
			top: 80rpx;
			right: 30rpx;
		}
	}

	button {
		width: 300rpx;
		margin: 50rpx auto;
	}

	.upload {
		margin: 20rpx 0;

		view {
			margin: 10rpx 0;
		}

		.pzimg {
			width: 380rpx;
			height: 200rpx;
		}

		.pzimg:hover {
			background-color: #9d9d9d;
		}

		.addimg {
			height: 160rpx;
			width: 160rpx;
			padding: 20rpx;
			border: 2rpx solid #bfbfbf;
		}
	}
</style>
