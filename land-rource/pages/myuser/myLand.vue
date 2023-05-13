<template>
	<view class="myland">
		<view class="navBar">
			<view :class="selectIndex=='' ? 'colorRed':''" @click="checkUserLand('')">全部</view>
			<view :class="selectIndex==2 ? 'colorRed':''" @click="checkUserLand('2')">已发布</view>
			<view :class="selectIndex==1 ? 'colorRed':''" @click="checkUserLand('1')">待审核</view>
			<view :class="selectIndex==3 ? 'colorRed':''" @click="checkUserLand('3')">未通过</view>
		</view>
		<!-- 搜索内容 -->
		<view class="allland">
			<view v-for="(item,index) in myLand" :key="index" :data-index="index" class="order-item"
				@touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd" :style="'right:'+item.right+'px'">
				<view class="box">
					<image id="landimg" :src="url+item.imgurl"></image>
					<view class="right">
						<view class="title">{{item.title}}</view>
						<view class="row">
							<view class="typebox">{{item.dictType}}</view>
							<view class="typebox">{{item.dictValue}}</view>
							<view class="typebox">{{item.fs}}</view>
						</view>
						<view class="row row2">
							<view class="money">{{item.price}}万元</view>
							<view class="year">{{item.year}}年</view>
						</view>
						<view class="row row2">
							<view class="address">
								<image src="../../static/landmu.png"></image>
								<view>{{item.area}}</view>
							</view>
							<view class="address">
								<image src="../../static/dw.png"></image>
								<view>{{item.address}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="remove" @click="delData(item,index)">删 除</view>
				<view class="edit" @click="editData(item)">修 改</view>
			</view>
			<view class="tips" v-if="myLand.length==0">
				<image src="../../static/nocontent.png"></image>
				<view>暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myLand: [],
				userinfo: {},
				url: ' ',
				//左滑默认宽度
				delBtnWidth: 160,
				selectIndex: "",
				pageNum: 10, //每次刷新显示数量
				pageSize: 0, //当前页码
				reachIndex: 1, //记录上拉加载是否显示完全部数据
				pulldown:false
			}
		},
		onLoad(e) {
			this.url = getApp().globalData.serviceIp
			this.userinfo = uni.getStorageSync('userinfo')
			if (this.userinfo.uid) {
				if (uni.getStorageSync("myLandCheckIndex")) {
					this.selectIndex = uni.getStorageSync("myLandCheckIndex")
				}
				this.getUserLandByUid(this.selectIndex)
			}
		},

		//上拉加载
		onReachBottom() {
			if (this.reachIndex && this.userinfo.uid) {
				this.pageSize = this.pageSize + this.pageNum
				this.getUserLandByUid()
			}
		},
		methods: {
			//根据土地状态查询
			checkUserLand(ispass) {
				this.selectIndex = ispass
				this.myLand = []
				this.getUserLandByUid(ispass)
			},
			//查询我的土地
			getUserLandByUid(ispass) {
				this.$ajax.land.checklandByUid({
					uid: this.userinfo.uid,
					ispass: ispass,
					status: "",
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}).then(res => {
					if(this.pulldown){
						this.myLand=res.data
					}else{
						this.myLand = this.myLand.concat(res.data)
						this.pulldown=false
					}
					for (let i = 0; i < this.myLand.length; i++) {
						this.$set(this.myLand[i], 'right', 0);
					}
					if (res.data.length == 0) {
						this.reachIndex = 0
					}
				})

				console.log("打印：", this.myLand);
			},
			//开始触摸滑动
			drawStart(e) {
				var touch = e.touches[0];
				this.startX = touch.clientX;
			},
			//触摸滑动
			drawMove(e) {
				for (var index in this.myLand) {
					this.$set(this.myLand[index], 'right', 0);
				}
				var touch = e.touches[0];
				var item = this.myLand[e.currentTarget.dataset.index];
				var disX = this.startX - touch.clientX;
				if (disX >= 20) {
					if (disX > this.delBtnWidth) {
						disX = this.delBtnWidth;
					}
					this.$set(this.myLand[e.currentTarget.dataset.index], 'right', disX);
				} else {
					this.$set(this.myLand[e.currentTarget.dataset.index], 'right', 0);
				}
			},
			//触摸滑动结束
			drawEnd(e) {
				var item = this.myLand[e.currentTarget.dataset.index];
				if (item.right >= this.delBtnWidth / 2) {
					this.$set(this.myLand[e.currentTarget.dataset.index], 'right', this.delBtnWidth);
				} else {
					this.$set(this.myLand[e.currentTarget.dataset.index], 'right', 0);
				}
			},
			//点击删除
			delData(item, index) {
				console.log("删除", item)
				uni.showModal({
					title: '提示',
					content: "确认删除该土地？",
					success: function(res) {
						let that = this
						if (res.confirm) {
							that.$ajax.land.deland({
								uid: item.uid,
								lid: item.lid
							}).then(res2 => {
								that.$set(this.myLand[index], 'right', 0);
								that.myLand = []
								that.getUserLandByUid(this.selectIndex)
								uni.showLoading({
									title: '已删除',
									icon: "none"
								});
								setTimeout(function() {
									uni.hideLoading();
								}, 1000);
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)
				});
			},
			//点击修改
			editData(item) {
				uni.setStorageSync("sys_update_land", "myLand")
				uni.setStorageSync("sys_landinfo", item)
				uni.setStorageSync("sys_landinfo_type", item.dictType)
				console.log("item传过去",item);
				uni.navigateTo({
					url: `/pages/issue/addland`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myland{
		position: relative;
		font-size: 36rpx;
	}
	.navBar {
		position: fixed;
		background: #FFCC33;
		left: 0;
		top: 0rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #9d9d9d;
		z-index: 10;

		view {
			height: 60rpx;
			line-height: 60rpx;
			width: 25%;
			text-align: center;
		}

		.colorRed {
			color: red;
		}
	}

	.allland {
		width: 90%;
		height: auto;
		margin: 30px auto;
		overflow: hidden
	}

	.order-item {
		width: 100%;
		display: flex;
		position: relative;
		margin: 10px auto;
		align-items: right;
		flex-direction: row;
	}

	.box {
		display: flex;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #eee;
		width: 100%;
		margin: 0 auto;

		#landimg {
			width: 220rpx;
			height: 200rpx;
			margin-right: 20rpx;
		}

		.right {
			width: 430rpx;
		}

		.title {
			font-size: 32rpx;
			height: 40rpx;
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.row {
			display: flex;
		}

		.typebox {
			background-color: #eee;
			font-size: 20rpx;
			padding: 4rpx 10rpx;
			color: #9d9d9d;
			border-radius: 6rpx;
			margin-right: 10rpx;
			margin-top: 10rpx;
		}

		.row2 {
			justify-content: space-between;
			align-items: center;
			margin-top: 16rpx;

			.money {
				color: orange;
				font-size: 36rpx;
			}

			.year {
				color: #9d9d9d;
				font-size: 24rpx;
			}
		}

		.address {
			display: flex;
			align-items: center;
			color: #9d9d9d;
			font-size: 24rpx;

			image {
				width: 18rpx;
				height: 18rpx;
				margin-right: 10rpx;
			}
		}
	}

	.tips {
		margin: 300rpx 0 auto;
		text-align: center;
		color: #9d9d9d;
		font-size: 24rpx;
	}

	.remove {
		margin-left: -5%;
		width: 80px;
		height: 100%;
		background-color: red;
		color: #FFFFFF;
		position: absolute;
		top: 0;
		right: -80px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}

	.edit {
		width: 80px;
		height: 100%;
		background-color: green;
		color: white;
		position: absolute;
		top: 0;
		right: -160px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}
</style>
