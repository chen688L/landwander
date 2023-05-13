<template>
	<view class="home">
		<view class="position">
			<view @click="detail_address">当前城市：<text>{{address}}</text></view>
			<input @click="tohomeSearch()"/>
		</view>
		<image src="../../static/lb/1.png"></image>
		<view class="navs">
			<!-- <view @click="toCircle()">
				<image src="../../static/lb/map.png"></image>
				<text>土地圈</text>
			</view> -->
			<view @click="todemandedhall()">
				<image src="../../static/xqdt.png"></image>
				<text>需求大厅</text>
			</view>
			<view @click="toNews()">
				<image src="../../static/lb/news.png"></image>
				<text>土地资讯</text>
			</view>
		</view>
		<view class="notify">
			<image class="notify_img" src="../../static/lab.png"></image>
			<text class="newsletter notit">土流快讯</text>
			<view class="notit">
				<swiper circular="true" vertical="true" autoplay="true" interval="3000" duration="1000" class="margin-right30 swiperBox">
					<swiper-item  v-for="(item,index) in nylist" :key="index"><view class="notit-con">{{item.content}}</view></swiper-item>
				</swiper>
			</view>
		</view>
		<view class="commond_tit">为你推荐</view>
		<view class="commond">
			<view class="item" v-for="(item,index) in lands" :key="index" @click="tohomeDetail(item)">
				<image :src="url + item.imgurl"></image>
				<view class="title">
					{{item.title}}
				</view>
				<view class="info">
					<view class="wz">{{item.address}}</view>
				</view>
				<view class="tabs">
					<view class="area"> {{item.area}}</view>
					<view class="time">{{item.year}} 年</view>
				</view>
				<view class="tabs">
					<view class="money">{{item.price}}</view>
					<view class="way">{{item.fs}}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
				navList: [
				  {
				    imgUrl: require("../../static/lb/2.png"),
				    title: "校园招聘会"
				  },
				  {
				    imgUrl: require("../../static/lb/2.png"),
				    title: "热门企业"
				  }
				],
				nylist:[
					{
						id:0,
						content:"132***08发布土地"
					},
					{
						id:0,
						content:"2023年广州土地价格有所下降"
					},
					{
						id:0,
						content:"137***21发布土地"
					},
					{
						id:0,
						content:"137***21发布土地"
					},
				],
				lands:[],
				reachIndex: 1,
				pageNum: 10,
				pageSize: 0,
				address:"广州"
			}
		},
		onLoad() {
			this.url = getApp().globalData.serviceIp
			uni.showTabBar()
			this.getland()
			this.getNews()
		},
		onReachBottom() {
			if (this.reachIndex) {
				this.pageSize = this.pageSize + this.pageNum
				this.getland()
			}
		},
		methods: {
			getNews() {
				this.$ajax.news.check({
					title: "",
					content: "",
					pageSize: 0,
					pageNum: 10
				}).then(res => {
					console.log(res);
					let data = []
					res.data.forEach(function(item,index){
						let temp = {id:index,content:item.title}
						data.push(temp)
					})
					this.nylist = data
				})
			},
			// 详细地址
			detail_address() {
				uni.chooseLocation({
					success: res => {
						this.address = res.name
					}
				});
			},
			getland(){
				console.log("打开页面");
				this.$ajax.land.checkland({
					ispass:"2",
					title: "",
					dict_value: "",
					dict_type:"",
					pagerNum:this.pageNum,
					pageSize:this.pageSize
				}).then(res=>{
					this.lands = this.lands.concat(res.data)
					console.log(res);
					if (res.data.length == 0) {
						this.reachIndex = 0
					}
				})
			},
			tohomeDetail(item){
				uni.setStorageSync('land',item)
				uni.navigateTo({
					url: '/pages/homeDetail/homeDetail'
				})
			},
			tohomeSearch(){
				uni.navigateTo({
					url:"/pages/homeDetail/searchBox"
				})
			},
			toCircle(){
				uni.navigateTo({
					url:"/pages/home/landCircle"
				})
			},
			toNews(){
				uni.navigateTo({
					url: '/pages/news/news'
				})
			},
			todemandedhall(){
				uni.setStorageSync("sys_demand_selectcontent","")
				uni.navigateTo({
					url: '/pages/demandhall/demandhall'
				})
			},
			getPosition() {
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function (res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function () {
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #F8F8F8;
		margin-bottom: 200rpx;
	}
	.position{
		// background: #00CCCC;
		margin: 10rpx auto;
		width: 90%;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		height: 60rpx;
		align-items: center;
		input{
			width: 400rpx;
			height: 50rpx;
			font-size: 24rpx;
			padding-left: 40rpx;
			background: #EEEEEE;
			border-radius: 40rpx;
		}
	}
	image{
		display: block;
		margin: 0 auto;
		margin-top: 20rpx;
		width: 90%;
		height: 320rpx;
	}
	.navs{
		display: flex;
		margin: 10rpx auto;
		padding: 16rpx 0;
		justify-content: space-around;
		text-align: center;
		width: 90%;
		background: #FFFFFF;
		border: 1px solid #EEEEEE;
		border-radius: 20rpx;
		box-shadow: 4rpx 8rpx 10rpx #EEEEEE;
		font-size: 28rpx;
		image{
			width: 100rpx;
			height: 100rpx;
		}
	}
	.notify{
		width: 90%;
		margin: 10rpx auto;
		display: grid;
		grid-template-columns: 8% 25% 67%;
		align-items: center;
	}
	.notify_img{
		margin: 0 0 10rpx 10rpx;
		width: 50rpx;
		height: 50rpx;
	}
	.notit{
		overflow: hidden;
		height: 80rpx;
		font-size: 28rpx;
		margin-left: 20rpx;
		line-height: 80rpx;
	}
	.notit-con{
		overflow: hidden;
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.swiperBox{
		width: 100%;
		height: 80rpx;
	}
	.newsletter{
		height: 80rpx;
		display: flex;
		align-items: center;
		font-size: 32rpx;
		color: #FFCC33;
	}
	.commond{
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.commond_tit{
		width: 90%;
		margin: 20rpx auto;
		font-size: 32rpx;
		font-weight: bold;
	}
	.item{
		margin-bottom: 26rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 4rpx 8rpx 8rpx #EEEEEE;
		width: 48%;
		height: 410rpx;
		padding: 10rpx 0;
		image{
			height: 150rpx;
			width: 300rpx;
		}
		.title{
			width: 300rpx;
			font-size: 26rpx;
			font-weight: bold;
			margin: 16rpx auto;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.info{
			display: flex;
			width: 300rpx;
			margin: 0 auto;
			font-size: 20rpx;
		}
		.tabs{
			width: 300rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			// display: grid;
			// grid-template-columns: 35% 15% 50%;
			font-size: 24rpx;
			margin-top: 10rpx;
			.money{
				text-align: center;
				background: #00CCCC;
				border-radius: 10rpx;
				padding: 3rpx 10rpx;
			}
			.way{
				text-align: center;
				padding: 3rpx 10rpx;
				background: #3399FF;
				border-radius: 10rpx;
			}
			.time{
				text-align: right;
			}
		}
	}
</style>
