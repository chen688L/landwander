<template>
	<view>
		<!-- 搜索内容 -->
		<view class="box" v-for="(item,index) in lands" :key="index">
			<label>
				<radio value="r1" :checked="item.checked" color="orange" @click="checkIsDelete(index)" />
			</label>
			<image id="landimg" :src="url+item.imgurl"></image>
			<view class="right" @click="tohomeDetail(item)">
				<view class="title">{{item.title}}</view>
				<view class="row">
					<view class="typebox">{{item.dictType}}</view>
					<view class="typebox">{{item.dictValue}}</view>
					<view class="typebox">{{item.fs}}</view>
				</view>
				<view class="row row2">
					<view class="money">{{item.price}}</view>
					<view class="year">{{item.year}}年</view>
				</view>
				<view class="row row2">
					<view class="address">
						<view>{{item.area}}</view>
					</view>
					<view class="address">
						<image src="../../static/dw.png"></image>
						<view>{{item.address}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下导航 -->
		<view class="footernav">
			<label>
				<radio value="r1" :checked="allChexked" color="orange" @click="addAllChexked()" />
				全选
			</label>
			<button @click="deleteCollects()">取 消 收 藏</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectList: [],
				lands: [],
				url: ' ',
				checkedList: [],
				allChexked: false,
			}
		},
		onShow() {
			this.url = getApp().globalData.serviceIp
			if (uni.getStorageSync('userinfo').uid) {
				this.getCollect()
			}
		},
		methods: {
			getCollect() {
				let collectList = []
				this.$ajax.collect.check({
					uid: uni.getStorageSync("userinfo").uid
				}).then(res => {
					let collectList = res.data
					collectList.forEach((item, index) => {
						collectList[index] = item.lid
					})
					console.log(collectList);
					this.$ajax.land.checkByLid({
						lids: collectList
					}).then(res => {
						this.lands = res.data
						this.addChecked(false)
					})
				})
			},
			//添加checked进行判断
			addChecked(value) {
				this.checkedList = []
				this.lands.forEach((item, index) => {
					this.$set(this.lands[index], 'checked', value);
					if (value) {
						this.checkedList.push(this.lands[index].lid)
					}
				})
			},
			// 跳转详情
			tohomeDetail(item) {
				uni.setStorageSync('land', item)
				uni.navigateTo({
					url: '/pages/homeDetail/homeDetail'
				})
			},
			//全选单选框控制
			addAllChexked() {
				this.allChexked = !this.allChexked
				if (this.allChexked) {
					this.addChecked(true)
				} else {
					this.addChecked(false)
				}
			},
			//单选控制
			checkIsDelete(index) {
				this.$set(this.lands[index], 'checked', !this.lands[index].checked);
				if (this.lands[index].checked) {
					this.checkedList.push(this.lands[index].lid)
				} else {
					this.checkedList.splice(this.lands[index].lid, 1)
				}
				if (this.checkedList.length == this.lands.length) {
					this.challChexked = true
				} else {
					this.allChexked = false
				}
				console.log(this.checkedList);
			},
			//删除按钮
			deleteCollects() {
				let lids = [];
				this.lands.forEach((item, index) => {
					if (this.lands[index].checked) {
						lids.push(this.lands[index].lid)
					}
				})
				this.$ajax.collect.deletes({
					uid: uni.getStorageSync("userinfo").uid,
					lids: lids
				}).then(res => {
					console.log(res.data);
					this.getCollect()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
	}

	label {
		color: #9d9d9d;
		display: flex;
		align-items: center;
	}

	radio {
		border-color: #9d9d9d;
	}

	#landimg {
		width: 220rpx;
		height: 200rpx;
	}

	.right {
		width: 380rpx;
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

	.footernav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		border-top: 2rpx solid #9d9d9d;
		position: fixed;
		bottom: 0;

		label {
			margin-left: 30rpx;
		}

		button {
			height: 100rpx;
			background-color: red;
			width: 300rpx;
			margin: 0;
			padding: 0;
			border-radius: 0;
			color: #fff;
		}
	}
</style>
