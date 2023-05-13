<template>
	<view>
		<view class="box">
			<view>土地图片（最多上传6张）：</view>
			<view class="imgbox">
				<span v-for="(item,index) in land">
					<div class="chabox">
						<!-- <image :src="url+item"></image> -->
						<image :src="url+item"></image>
						<image class="cha" src="../../static/cha.png" @click="deleteimg(index,item)"></image>
					</div>
				</span>
				<image @click="uploadImg()" class="addimg" src="../../static/add.png"></image>
			</view>
			<span>第一张图片作为封面图</span>
		</view>
		<view class="box box2">
			<view>土地权证（最多上传6张）：</view>
			<view class="imgbox">
				<span v-for="(item,index) in testify">
					<div class="chabox">
						<image :src="url+item"></image>
						<image class="cha" src="../../static/cha.png" @click="deleteimg2(index,item)"></image>
					</div>
				</span>
				<image @click="uploadImg2()" class="addimg" src="../../static/add.png"></image>
			</view>
			<span>凭证不会对外展示，仅供平台审核土地时查看</span>
		</view>
		<view class="lastitem">
			<button type="primary" @click="submit()">保 存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs1: [],
				imgs2: [],
				imgsFile: [],
				imgsFile2: [],
				userinfo: {},
				land: [],
				testify: [],
				url: "",
			}
		},
		onLoad() {
			console.log("onLoad");
			this.url = getApp().globalData.serviceIp
			this.userinfo = uni.getStorageSync('userinfo')
			this.getImgs()
		},
		onShow() {
			this.getImgs()
		},
		methods: {
			getImgs(){
				if (uni.getStorageSync('landimgs')) {
					this.land = uni.getStorageSync('landimgs')
					this.imgs1 = uni.getStorageSync('landimgs')
				}
				if (uni.getStorageSync('testifyimgs')) {
					this.testify = uni.getStorageSync('testifyimgs')
					this.imgs2 = uni.getStorageSync('testifyimgs')
				}
			},
			deleteimg(index,item) {
				this.land.splice(index, 1);
				console.log(item);
				this.$ajax.upload.deleteImg({
					path:item
				}).then(res=>{
					
				})
			},
			deleteimg2(index,item) {
				this.testify.splice(index, 1);
				this.imgsFile2.splice(index, 1);
				this.$ajax.upload.deleteImg({
					path:item
				}).then(res=>{
					
				})
			},
			uploadImg() {
				// 选择图片文件
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: (res) => {
						console.log(res);
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: this.url + "/upload/avater",
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
								let land = []
								land[0] = data.data
								this.land = this.land.concat(land)
							},
							fail: (err) => {
								console.log(err);
							},
						});
					},
				});
			},
			uploadImg2() {
				// 选择图片文件
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: (res) => {
						console.log(res);
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: this.url + "/upload/avater",
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
								let testify = []
								testify[0] = data.data
								this.testify = this.testify.concat(testify)
							},
							fail: (err) => {
								console.log(err);
							},
						});
					},
				});
			},
			aftersubmit() {
				uni.setStorage({
					key: 'landimgs',
					data: this.land,
					success: function() {
						console.log('success');
					}
				});
				uni.setStorage({
					key: 'testifyimgs',
					data: this.testify,
					success: function() {
						console.log('success2');
					}
				});
				uni.navigateTo({
					url: "/pages/issue/addland"
				})
			},
			async submit() {
				this.aftersubmit()
			}
		},

	}
</script>

<style lang="scss" scoped>
	.box {
		margin: 30rpx;
	}

	.box2 {
		margin-top: 60rpx;
		margin-bottom: 60rpx;
	}

	span {
		font-size: 24rpx;
		color: #9d9d9d;
	}

	.addimg {
		margin-top: 20rpx;
		display: block;
		width: 200rpx;
		height: 200rpx;
		background: #FFFFFF;
	}

	.lastitem {
		button {
			margin: 30rpx auto;
			width: 700rpx;
			background-color: orange;
		}
	}

	.imgbox {
		display: flex;
		flex-wrap: wrap;

		image {
			border: 2rpx solid #9d9d9d;
			display: inline-block;
			margin: 10rpx;
			width: 200rpx;
			height: 200rpx;
		}

		.chabox {
			position: relative;
		}

		.cha {
			width: 50rpx;
			height: 50rpx;
			top: 0;
			left: 150rpx;
			position: absolute;

		}
	}
</style>
