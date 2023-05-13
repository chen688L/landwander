<template>
	<view class="issue">
		<view class="tip">提示：请在个人资料中验证身份后才可发布</view>
		<view>
			<form @submit="formSubmit()">
				<view class="item item1">
					<label><span>*</span><text>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题:</text></label>
					<input placeholder="请输入标题" class="title" v-model="landForm.title" />
				</view>
				<view class="item">
					<label>内容介绍:</label>
					<textarea placeholder="请输入内容介绍" v-model="landForm.content"></textarea>
				</view>
				<view class="item upimg enter" @click="toaddLandimg()">
					<label><span>*</span>上传图片/凭证:</label>
					<image src="../../static/enter.png"></image>
				</view>
				<view class="item">
					<label><span>*</span>土地类型：</label>
					<picker @change="typeChange" :value="typeindex" :range="typearray">
						<view class="enter">
							<view class="uni-input"><text>-{{typearray[typeindex]}}</text></view>
							<image src="../../static/enter.png"></image>
						</view>
					</picker>
					<picker @change="typeValueChange" :value="typeValueindex" :range="typeValue">
						<view class="enter">
							<view class="uni-input"><text>-{{typeValue[typeValueindex]}}</text></view>
							<image src="../../static/enter.png"></image>
						</view>
					</picker>
				</view>
				<view class="item">
					<label><span>*</span>流转方式:</label>
					<picker @change="fsChange" :value="fsindex" :range="fsarray">
						<view class="enter">
							<view class="uni-input"><text>-{{fsarray[fsindex]}}</text></view>
							<image src="../../static/enter.png"></image>
						</view>
					</picker>
				</view>
				<view class="item">
					<label><span>*</span>所在区域:</label>
					<view class="address" v-if="landForm.address">已选：{{landForm.address}}</view>
					<area-select></area-select>
				</view>

				<view class="item item1">
					<label><span>*</span>详细地址:</label>
					<input style="width: 400rpx;" class="title" placeholder="请输入详细地址" v-model="addressd" />
					<view @click="detail_address">点击搜索</view>
				</view>


				<view class="item item1">
					<label><span>*</span>流转年限:</label>
					<input class="title" placeholder="请输入流转年限" v-model="landForm.year" />
				</view>
				<view class="item item1">
					<label><span>*</span>流转面积:</label>
					<input placeholder="例如: 10亩/50平方米" class="title" v-model="landForm.area" />
				</view>
				<view class="item item1">
					<label><span>*</span><text>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格:</text></label>
					<input class="title" placeholder="例如: 10" v-model="landForm.price" />
					<text>万元</text>
				</view>
				<view class="item item1">
					<label><span>*</span>联系电话:</label>
					<input placeholder="请输入联系电话" class="title" v-model="landForm.phone" />
				</view>
				<view class="item lastitem">
					<label>
						<checkbox value="cb" checked="true" color="#FFCC33" style="transform:scale(0.7)" />同意《土地委托流转协议》
					</label>
					<button v-if="sys_update_land=='addland'" type="primary" form-type="submit">确 认 发 布</button>
					<button v-else type="primary" @click="updateLand()">修 改 土 地</button>
				</view>
			</form>
		</view>
	</view>
</template>


<script>
	import areaSelect from "../test/areaSelect.vue"
	export default {
		components: {
			areaSelect
		},
		data() {
			return {
				screenHeight: getApp().globalData.screenHeight,
				typeindex: 0,
				fsindex: 0,
				typearray: [],
				fsarray: ['转让', '出租', '转包', '合作', '入股', '互换', '招拍挂'],
				typeValueList: [],
				typeValue: ['请选择'],
				typeValueindex: 0,
				landFormFirst: {},
				addressd: "",
				landForm: {
					title: "",
					content: "",
					dictValue: "",
					dictType: "",
					address: "",
					addressd: "",
					area: "",
					fs: "",
					year: "",
					price: "",
					phone: "",
					imgurl: "",
				},
				userId: "",
				land: [],
				testify: [],
				sys_update_land: "addland",
				isverifyLand: false,
				longitude: 0,
				latitude: 0,
			}
		},
		onLoad(options) {
			this.landFormFirst = this.landForm
			this.land = uni.getStorageSync('landimgs')
			this.imgs1 = uni.getStorageSync('landimgs')
			this.getLandValue();
			this.getfenlei_land_type();
			this.getLandFs();
			//判断是 修改(myLand)
			if (uni.getStorageSync("sys_update_land") == "myLand") {
				this.sys_update_land = "myLand"
				this.getImgs() //获取要修改的图片
				//保存有土地信息
				this.landForm = uni.getStorageSync('sys_landinfo')
				this.addressd = this.landForm.addressd ? this.landForm.addressd : this.addressd
				this.getfenlei_land_type(); //跟新土地类型
				this.getLandValue(); //更新类型
				this.getLandFsIndexByLid(); //获取要修改的土地类型、方式
			}
			console.log("土地为：", this.landForm);

		},
		onShow() {
			//判断是 修改(myLand) 还是 发布(addland)
			if (uni.getStorageSync("sys_update_land") == "myLand") {
				this.sys_update_land = "myLand"
				//保存有土地信息
				this.landForm = uni.getStorageSync('sys_landinfo')
				this.addressd = this.landForm.addressd ? this.landForm.addressd : this.addressd
				this.getfenlei_land_type(); //跟新土地类型
				this.getLandValue(); //更新类型
				this.getLandFsIndexByLid(); //获取要修改的土地类型、方式
				this.getImgs() //获取要修改的图片
			} else { //发布(addland)
				this.sys_update_land = "addland"
				// uni.removeStorageSync("sys_landinfo_type")
				this.land = uni.getStorageSync('landimgs');
				this.testify = uni.getStorageSync('testifyimgs')
			}


			let userinfo = uni.getStorageSync('userinfo');
			if (userinfo) {
				this.userId = userinfo.uid
			}


		},
		onBackPress(options) {
			if (options.from == 'backbutton') {
				uni.switchTab({
					url: "/pages/issue/issue"
				})
				return true;
			} else if (options.from == 'navigateBack') {
				return false;
			}
		},
		onHide() {
			uni.setStorageSync("sys_landinfo", this.landForm)
		},

		methods: {
			updateLand() {
				if (uni.getStorageSync('landimgs')) {
					this.land = uni.getStorageSync('landimgs')
				}
				if (uni.getStorageSync('landimgs')) {
					this.imgs1 = uni.getStorageSync('landimgs')
				}
				this.$ajax.land.updateLand({
					uid: "",
					landdetail: this.landForm,
					land: this.land,
					testify: this.testify,
					longitude: this.longitude,
					latitude: this.latitude
				}).then(res => {
					if (res.state == 200) {
						uni.showLoading({
							title: "修改成功",
							icon: 'none'
						});

						setTimeout(function() {
							uni.hideLoading();
						}, 2000);
					} else {
						uni.showLoading({
							title: "服务器出错了" + res.state,
							icon: 'none'
						});

						setTimeout(function() {
							uni.hideLoading();
						}, 2000);
					}
				})
			},
			// 详细地址
			detail_address() {
				uni.chooseLocation({
					success: res => {
						this.addressd = res.address
						this.longitude = res.longitude //经度
						this.latitude = res.latitude
					}
				});
			},
			getImgs() {
				//判断是 修改(myLand) 还是 发布(addland)
				if (uni.getStorageSync("sys_update_land") == "myLand") {
					this.sys_update_land = "myLand"
					//获取土地图片
					this.$ajax.land.checkimgsBylid({
						lid: this.landForm.lid,
						type: "land",
					}).then(res => {
						if (res.state == 200) {
							let landimgs = []
							for (let i = 0; i < res.data.length; i++) {
								landimgs[i] = res.data[i].url
							}
							uni.setStorageSync("landimgs", landimgs)
							this.land = landimgs
						}
					})
					//获取土地权证
					this.$ajax.land.checkimgsBylid({
						lid: this.landForm.lid,
						type: "testify",
					}).then(res => {
						if (res.state == 200) {
							let testifyimgs = []
							for (let i = 0; i < res.data.length; i++) {
								testifyimgs[i] = res.data[i].url
							}
							uni.setStorageSync("testifyimgs", testifyimgs)
							this.testify = testifyimgs
						}
					})
				} else { //发布(addland)
					this.land = uni.getStorageSync('landimgs');
					this.testify = uni.getStorageSync('testifyimgs')
				}
			},
			getLandFsIndexByLid() {
				this.getfenlei_land_type()
				if (this.sys_update_land == "myLand") {
					this.fsindex = this.fsarray.indexOf(this.landForm.fs)
				}
			},
			getLandValue() {
				this.$ajax.dict.checklandValue().then(res => {
					this.typeValueList = res.data
					uni.setStorageSync('fenlei_land_type_value', res.data)
					this.getfenlei_land_type()
				})


			},
			getfenlei_land_type() {
				this.$ajax.dict.checklandType().then(res => {
					this.typearray = res.data
					uni.setStorageSync('fenlei_land_type', res.data)
					if (this.sys_update_land == "addland") {
						this.landForm.dictType = this.typearray[0]
					}else{
						this.typeindex = this.typearray.indexOf(uni.getStorageSync("sys_landinfo_type"))
						console.log("type", this.typeValueList, this.typeindex);
						this.typeValue = this.typeValueList[this.typeindex].goods
						this.typeValueindex = this.typeValueList[this.typeindex].goods.indexOf(this.landForm.dictValue)
					}
				})

			},
			getLandFs() {
				this.$ajax.dict.checklandFs().then(res => {
					this.fsarray = res.data
				})
				if (this.sys_update_land == "addland") {
					this.landForm.fs = this.fsarray[0]
				}
			},
			typeChange: function(e) {
				this.typeindex = e.detail.value
				this.landForm.dictType = this.typearray[e.detail.value]
				this.typeValue = this.typeValueList[e.detail.value].goods
			},
			typeValueChange: function(e) {
				this.typeValueindex = e.detail.value
				this.landForm.dictValue = this.typeValue[e.detail.value]
			},
			fsChange: function(e) {
				this.fsindex = e.detail.value
				this.landForm.fs = this.fsarray[e.detail.value]
			},
			formSubmit: function(e) {
				this.getImgs()
				this.landForm.address = uni.getStorageSync("land_address")
				this.landForm.addressd = this.addressd
				this.landForm.imgurl = this.land[0]
				this.verifyLand()
				if (this.isverifyLand) {
					this.$ajax.land.addland({
						uid: this.userId,
						landdetail: this.landForm,
						land: this.land,
						testify: this.testify,
						longitude: this.longitude,
						latitude: this.latitude
					}).then(res => {
						if (res.state == 200) {
							uni.showLoading({
								title: "发布成功",
								icon: 'none'
							});
							setTimeout(function() {
								uni.hideLoading();
							}, 2000);
						}
						this.formReset()
					})
				}
			},
			formReset: function(e) {
				this.landForm = {
					title: "",
					content: "",
					dictValue: "",
					dictType: "",
					address: "",
					addressd: "",
					area: "",
					fs: "",
					year: "",
					price: "",
					phone: "",
					imgurl: "",
				}
				this.addressd = ""
				uni.removeStorageSync("sys_landinfo")
				uni.removeStorageSync("land_address")
				uni.removeStorageSync("testifyimgs")
				uni.removeStorageSync("landimgs")
				this.land = [];
				this.testify = []
			},
			toaddLandimg() {
				this.getImgs()
				uni.navigateTo({
					url: "/pages/issue/addLandimg"
				})
			},
			verifyLand() {
				//判断用户是否提交身份认证
				if (uni.getStorageSync('userinfo').ispass != 2) {
					uni.showLoading({
						title: "请先进行身份认证",
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideLoading();
					}, 2000);
				} else {
					if (this.landForm.title != '') {
						this.isverifyLand = true
					} else {
						uni.showLoading({
							title: "标题不能为空",
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 2000);
					}
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {}

	.issue {
		background: #EBEDF0;
		padding: 10rpx 0;
	}

	.tip {
		text-align: center;
		font-size: 24rpx;
		color: #FFCC33;
	}

	span {
		color: red;
	}

	label {
		font-size: 28rpx;
	}

	input {
		font-size: 28rpx;
		margin: 10rpx 10rpx;
		padding: 10rpx;
		border: 1px solid #9d9d9d;
		border-radius: 6rpx;
	}

	textarea {
		font-size: 28rpx;
		width: 95%;
		margin: 10rpx 10rpx;
		padding: 10rpx;
		border: 1px solid #9d9d9d;
	}

	.address {
		padding: 10rpx 40rpx;
	}

	.item {
		font-size: 28rpx;
		padding: 30rpx 10rpx;
		background: #FFFFFF;
		margin: 20rpx 16rpx;
		border-radius: 10rpx;
	}

	.item1 {
		display: flex;
		align-items: center;

		input {
			width: 460rpx;
		}
	}

	.lastitem {

		button {
			margin: 30rpx auto;
			width: 700rpx;
			background-color: orange;
		}
	}



	.enter {
		display: flex;
		align-items: center;
		justify-content: space-between;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>
