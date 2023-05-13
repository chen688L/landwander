<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>

		<!-- 自定义状态栏 -->
		<view class="status_title">
			<image class="status_left" src="../../static/left.png" mode="widthFix" @click="back()"></image>
			<view class="status_center">详情</view>
			<image class="status_right" src="../../static/ts.png" mode="widthFix" @click="appComplain()"></image>
		</view>

		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots="true" autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in imgs" :key="index">
					<view class="swiper-item">
						<image :src="url+item.url" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="header">
			<text class="money">{{land.price}}</text>
			<text class="type">{{land.fs}}</text>
			<view class="title">{{land.title}}</view>
			<view class="issuetime">发布时间：{{land.issuetime | formatDate}} &emsp;&emsp;ID：{{land.lid | getNumber}}</view>
		</view>
		<view class="header content">
			<view class="info">基本信息</view>
			<view class="conitem">
				<view class="left">所在地区</view>
				<view class="right">{{land.address}}</view>
			</view>
			<view class="conitem">
				<view class="left">土地用途</view>
				<view class="right">{{land.dictType}} | {{land.dictValue}}</view>
			</view>
			<view class="conitem">
				<view class="left">面积大小</view>
				<view class="right">{{land.area}}</view>
			</view>
			<view class="conitem">
				<view class="left">流转年限</view>
				<view class="right">{{land.year}}年</view>
			</view>
			<!-- <view class="conitem">
				<view class="left">带看费</view>
				<view class="right">100元</view>
			</view> -->
			<view class="conitem">
				<view class="left">位置导航</view>
				<view class="right">
					<image  style="width: 30rpx;height: 30rpx;" @click="handleOpenNavigation()" src="../../static/dwred.png"></image>
				</view>
			</view>
			<view class="info">描述介绍</view>
			<view class="details">
				{{land.content}}
			</view>
			<view class="sm">
				<view class="tit">免责声明</view>
				<view>
					<text>
						您在从事与土地租聘相关的所有行为(包括但不限于访问浏览、利用、转载、宣传介绍)时，必须以善意且谨慎的态度行事；您不得故意或者过失的损害或者弱化土地租聘的各类合法权利与利益，不得利用土地租聘以任何方式直接或者间接的从事违反法律法规以及社会公德的行为，且您应当恪守下述承诺
					</text>
					<view>1、传输和利用信息符合相关法律、法规的规定、符合公序良俗；</view>
					　　<view>2、不将土地租聘以及与之相关的网络服务用作非法用途以及非正当用途；</view>
					　　<view>3、不干扰和扰乱土地租聘以及与之相关的网络服务；</view>
					　　<view>4、遵守与土地租聘以及与之相关的网络服务的协议、规定、程序和惯例等。</view>
				</view>
			</view>
			<view class="info">提示</view>
			<view class="details">
				《中华人民共和国农村土地承包法》规定：“流转期限不得超过承包期的剩余期限。”
			</view>
			<view>
				核心服务：土地租聘寻找优质客户
			</view>
			<view class="lastitem">联系电话：18124225266</view>
		</view>
		<view class="footer">
			<view>
				<image @click="toUserLand(land)" src="../../static/my.png"></image>
				<view @click="toUserLand(land)">{{user.name}}</view>
			</view>
			<view>
				<image @click="telphone()" src="../../static/phone.png"></image>
				<view>电话</view>
			</view>
			<view>
				<image @click="chooseCollect()" v-if="isCollect" src="../../static/home_sc_action.png"></image>
				<image @click="chooseCollect()" v-else src="../../static/home_sc.png"></image>
				<view>收藏</view>
			</view>
			<view class="consult">
				<!-- <button class="consultbtn">预约带看</button> -->
			</view>
			<view class="consult" @click="toChat()">
				<button class="consultbtn">在线咨询</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				land: {},
				imgs: [],
				isCollect: false,
				user: {
					name: "管理员"
				},
				enginessInfo:{
					lat:"",
					lng:"",
					address:""
				},
				curSysPosition:{
					latitude:"",
					longitude:""
				}
			}
		},
		onLoad() {
			this.url = getApp().globalData.serviceIp
		},
		onShow() {
			this.land = uni.getStorageSync('land');
			console.log(this.land);
			this.$ajax.land.checkimgsBylid({
				lid: this.land.lid,
				type: "land",
			}).then(res => {
				if (res.state == 200) {
					this.imgs = res.data
				}
			})
			this.$ajax.user.findByuid({
				uid: this.land.uid
			}).then(res => {
				console.log('user:',res.data);
				this.user = res.data
			})
			if (uni.getStorageSync("userinfo").uid) {
				this.getCollect()
			}
			this.getLandlocation()
		},
		methods: {
			//拨打电话
			telphone(){
				// console.log(uni.getStorageSync("userinfo"));
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
				let phone =this.land.phone
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
			},
			//获取土地位置信息
			getLandlocation(){
				this.$ajax.location.checkLocationBylid({lid:this.land.lid}).then(res=>{
					let {
						latitude,
						longitude
					} = res.data[0]
					this.enginessInfo.lat = latitude;
					this.enginessInfo.lng = longitude;
					this.enginessInfo.address = this.land.addressd
				})
			},
			// 判断是否存在导航软件
			judgeHasExistNavignation() {
				let navAppParam = [{
						pname: 'com.baidu.BaiduMap',
						action: 'baidumap://'
					}, // 百度
					{
						pname: 'com.autonavi.minimap',
						action: 'iosamap://'
					}, // 高德
					{
						pname: 'com.tencent.map',
						action: 'tencentmap://'
					}, // 腾讯
				];
				return navAppParam.some(param => {
					return plus.runtime.isApplicationExist(param);
				})
			},
			//获取当前定位
			getPosition() {
				let that = this;
				return new Promise(resolve => {
					uni.getLocation({
						type: 'gcj02',
						geocode: true, //设置该参数为true可直接获取经纬度及城市信息
						success: function(res) {
							let {
								latitude,
								longitude
							} = res
							that.curSysPosition.latitude = latitude;
							that.curSysPosition.longitude = longitude;
							resolve();
						}
					});
				})
			},
			//  打开第三方地图
			async handleOpenNavigation() {
				let {
					lat,
					lng,
					address
				} = this.enginessInfo;
				await this.getPosition();
				let {
					latitude,
					longitude
				} = this.curSysPosition;
				// #ifdef APP-PLUS
				if (!this.judgeHasExistNavignation()) {
					return this.$showToast("该设备上不存在第三方导航APP");
				}
				
				let tLngLat = new plus.maps.Point(lng, lat); // 目的地
				let oLngLat = new plus.maps.Point(longitude, latitude); // 起始地
				plus.maps.openSysMap(tLngLat, address, oLngLat);
				// #endif

			},
			getUserInfoone() {
				this.$ajax.user.findByuid({
					uid: uni.getStorageSync("sys_oneuserland").uid
				}).then(res => {
					this.user = res.data
				})
			},
			getCollect() {
				this.$ajax.collect.check({
					uid: uni.getStorageSync("userinfo").uid,
					lid: this.land.lid
				}).then(res => {
					if (res.data.length) {
						this.isCollect = true
					}
				})
			},
			toUserLand(land) {
				uni.setStorageSync("sys_oneuserland", land)
				uni.navigateTo({
					url: "/pages/oneUserLand/oneUserLand"
				})
			},
			chooseCollect() {
				if (uni.getStorageSync("userinfo").uid) {
					if (this.isCollect) {
						this.$ajax.collect.delete({
							uid: uni.getStorageSync("userinfo").uid,
							lid: this.land.lid
						}).then(res => {
							this.isCollect = false
						})
					} else {
						this.$ajax.collect.add({
							uid: uni.getStorageSync("userinfo").uid,
							lid: this.land.lid
						}).then(res => {
							this.isCollect = true
						})
					}
				} else {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			},
			toChat() {
				let userId = uni.getStorageSync("userinfo").uid;
				if (userId) {
					uni.setStorageSync("sys_usersend_uid", this.land.uid)
					uni.navigateTo({
						url: "/pages/chat/chat?msg="+encodeURIComponent("咨询土地:"+this.land.lid)+"&name="+this.user.name
					})
				} else {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			},
			back() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
					success: function() {
						beforePage; // 执行上一页的onLoad方法
					}
				});
			},
			appComplain() {
				if (uni.getStorageSync("userinfo").uid) {
					uni.navigateTo({
						url: "/pages/complain/complain"
					})
				} else {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}


			},
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
			getNumber(id){
				let newid = ""+(id.replace(/[^0-9]/ig,""))
				return newid.substring(0,6);
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 自定义状态栏 */
	.status_bar {
		height: var(--status-bar-height);
		background: #ffcc33;
		width: 100%;
	}

	/* 自定义导航栏 */
	.status_title {
		background: #ffcc33;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 44px;
		padding: 0 16px;
	}

	.status_left {
		width: 18px !important;
	}

	.status_center {
		font-size: 17px;
		font-weight: 700;
	}

	.status_right {
		width: 22px;
	}

	.uni-margin-wrap {
		width: 100%;
	}

	.swiper {
		height: 400rpx;
		width: 100%;
	}

	.swiper-item {
		width: 100%;
		display: block;
	}

	image {
		width: 100%;
	}

	.header {
		width: 90%;
		margin: 18rpx auto;
	}

	.money {
		color: #ffcc33;
		font-weight: bold;
		font-size: 40rpx;
	}

	.type {
		border-radius: 20rpx;
		background: #3399FF;
		margin-left: 40rpx;
		padding: 5rpx 10rpx;
		font-size: 28rpx;
	}

	.title {
		margin: 10rpx 0;
		font-size: 32rpx;
		font-weight: bold;
	}

	.issuetime {
		margin: 10rpx 0;
		font-size: 24rpx;
	}

	.content {
		font-size: 28rpx;
	}

	.info {
		font-size: 32rpx;
		border-bottom: 3rpx solid #eee;
		margin-top: 40rpx;
		padding-bottom: 10rpx;
	}

	.conitem {
		color: dimgray;
		margin: 10rpx 0;
		display: flex;
		justify-content: space-between;
	}

	.details {
		margin: 20rpx 0;
	}

	.sm {
		background: #eee;
		padding: 20rpx 10rpx;
	}

	.tit {
		margin-bottom: 20rpx;
		font-size: 32rpx;
		text-align: center;
		width: 100%;
	}

	.lastitem {
		padding-bottom: 100rpx;
	}

	.footer {
		display: flex;
		justify-content: space-around;
		text-align: center;
		font-size: 24rpx;
		background: #fff;
		width: 100%;
		position: fixed;
		bottom: 0;
		padding: 10rpx 0;
		border-top: 1px solid #eee;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.consult {
		display: flex;
		align-items: center;
	}

	.consultbtn {
		height: 70rpx;
		background: orange;
		color: #fff;
		line-height: 70rpx;
		font-size: 32rpx;
	}
</style>
