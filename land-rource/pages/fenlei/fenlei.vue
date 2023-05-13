<template>
	<view style="background-color: #FFFFFF;">
		<!-- 头部搜索区域 -->
		<view class="navBar">
			<view class="navBar-search"  @click="tohomeSearch()">
				<image src="../../static/search.png" mode="widthFix" style="width: 34rpx;"></image>
				<input type="text" v-model="search" confirm-type="search" @confirm="toSearch()" placeholder="园林"
					placeholder-style="font-size:30rpx;color:#B5B9BF" />
			</view>
		</view>
		<!-- 滚动区域 -->
		<view class="flex-content">
			<!-- 左边标题 -->
			<view class="end-title">
				<view v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @tap="change(index)">
					{{item}}
				</view>
			</view>
			<!-- 右边内容 -->
			<view class="end-cont">
				<!-- 内容区头部图片 -->
				<image src="../../static/lb/3.png" mode="widthFix"></image>
				<!-- 标题 -->
				<view class="title">{{goodsList.titleOne}}</view>
				<view class="goods">
					<view class="goods-item" v-for="(item,index) in goodsList.goods" :key="index" @click="toSelectLand(item)">
						<text>{{item}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				btnnum: 0,
				items: ["耕地", "林地", "园林", "草地", "养殖用地", "住宅用地", "其他用地"],
				count: "",
				search: "",
				list: [{
						titleOne: '耕地',
						goods: [
							'水田',
							'水浇地'
						]
					},
					{
						titleOne: '林地',
						goods: [
							'灌木林地',
							'其他林地'
						]
					}, {
						titleOne: '园地',
						goods: [
							'果园',
							'茶园',
							'菜园'
						]
					}, {
						titleOne: "草地",
						goods: ['草地']
					},
					{
						titleOne: "养殖用地",
						goods: ['畜牧', '水产', '综合养殖']
					},
					{
						titleOne: "住宅用地",
						goods: ['城镇住宅', '农村宅基地']
					},
					{
						titleOne: "其他用地",
						goods: ['交通运输', '沙地', '荒地', '空闲用地']
					}

				],
				goodsList: {}

			};
		},
		onLoad() {
			if (uni.getStorageSync('fenlei_land_type_value')) {
				this.list = uni.getStorageSync('fenlei_land_type_value')
			} else {
				this.$ajax.dict.checklandValue().then(res => {
					console.log(res.data);
					this.list = res.data
					uni.setStorageSync('fenlei_land_type_value', res.data)
				})
			}
			if (uni.getStorageSync('fenlei_land_type')) {
				this.items = uni.getStorageSync('fenlei_land_type')
			} else {
				this.$ajax.dict.checklandType().then(res => {
					this.items = res.data
					uni.setStorageSync('fenlei_land_type', res.data)
				})
			}
			this.goodsList = this.list[0]
		},
		methods: {
			tohomeSearch(){
				uni.navigateTo({
					url:"/pages/homeDetail/searchBox"
				})
			},
			getlandByType(dict_value){
				uni.setStorageSync("sys_land_selectcontent",dict_value);
			},
			change(e) {
				this.count = e
				this.btnnum = e
				this.goodsList = this.list[e] //这里data是获取到的右侧商品数据
			},
			scroll() {},
			toSearch() {
				uni.navigateTo({
					url:"/pages/homeDetail/searchBox"
				})
			},
			toSelectLand(item){
				this.getlandByType(item)
				uni.navigateTo({
					url:'/pages/homeDetail/searchLand'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navBar {
		padding: 5rpx 32rpx 6rpx 28rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		background-color: #fff;

		&-search {
			margin: 0 auto;
			width: 690rpx;
			height: 58rpx;
			background-color: #F8F9FA;
			border-radius: 30rpx;
			padding-left: 16rpx;
			// margin-right: 32rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			input {
				margin-left: 20rpx;
			}
		}
	}

	.flex-content {
		display: flex;
	}

	.end-title {
		display: flex;
		flex-direction: column;
		width: 180rpx;
		background-color: #F3F5F7;

		view {
			height: 185rpx;
			line-height: 185rpx;
			text-align: center;
			font-size: 26rpx;
			font-weight: bold;
			color: #4E5152;
			border-bottom: 1rpx solid #ECEDEE;
			border-left: 8rpx solid #F3F5F7;
		}

		.btna {
			color: #FF6C5C;
			background-color: #FFFFFF;
			border-left: 8rpx solid #FFCC33;
		}
	}

	.end-cont {
		width: 550rpx;

		.title {
			font-size: 30rpx;
			font-weight: bold;
			text-align: center;
			color: #4E5152;
		}

		.goods {
			width: 100%;

			&-item {
				background: #FFD75E;
				box-shadow: 4rpx 8rpx 8rpx #EEEEEE;
				padding: 20rpx 40rpx;
				margin-left: 20rpx;
				margin-top: 20rpx;

				text {
					font-size: 20rpx;
					width: 90rpx;
				}
			}
		}

		image {
			margin: 20rpx 0 60rpx 20rpx;
			width: 530rpx;
		}
	}

	.dis {
		display: block;
	}
</style>
