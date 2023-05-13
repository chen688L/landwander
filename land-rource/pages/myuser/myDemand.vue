<template>
	<view>
		<view class="demands">
			<view v-for="(item,index) in demand" :key="item.id" class="demandsbox">
				<label>
					<radio value="r1" :checked="item.checked" color="orange" @click="checkIsDelete(index)" />
				</label>
				<view class="box" @click="toDemandetails(item)">
					<view>{{item.title}}</view>
					<view class="flexbox">
						<text>
							<text class="money">{{item.areaDown}}~{{item.areaUp}}</text>
							<text>{{item.type=="住宅用地"?'元/平米/年':'元/亩/年'}}</text>
						</text>
						<text class="row">{{item.year}}年</text>
					</view>
					<view class="flexbox row">
						<view class="three">
							<image src="../../static/landmu.png"></image>
							<text>{{item.areaDown}}-{{item.areaUp}}{{item.type=="住宅用地"?'平米':'亩'}}</text>
						</view>
						<view class="three">
							<image src="../../static/dw.png"></image>
							{{item.address}}
						</view>
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
			<text>已选择 {{this.checkedList.length}} 项</text>
			<button @click="deleteDemands()">删 除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				demand: [], //需求列表
				pageNum: 10, //刷新获取数量
				pageSize: 0, //行号
				reachIndex: 1, //是否到底
				checkedList: [], //选择的列表
				allChexked: false, //是否全选
				demand2:[],
				userinfo:{}
			}
		},
		onLoad() {
			if(uni.getStorageSync('userinfo').uid){
				this.selectDemand(this.pageSize, this.pageNum)
			}
		},
		onReachBottom() {
			if (this.reachIndex) {
				this.pageSize = this.pageSize + this.pageNum
				this.selectDemand(this.pageSize, this.pageNum)
			}
			console.log(this.pageSize);
		},
		methods: {
			//分页查询需求
			selectDemand(pageSize, pageNum) {
				this.$ajax.demand.check({
					uid: uni.getStorageSync('userinfo').uid,
					pageSize: pageSize,
					pageNum: pageNum
				}).then(res => {
					if (res.data.length == 0) {
						this.reachIndex = 0
					}
					this.demand2 = res.data
					this.demand2.forEach((item, index) => {
						this.$set(this.demand2[index], 'checked', false);
					})
					if(this.demand2.length!=0){
						this.allChexked = false
					}
					this.demand = this.demand.concat(this.demand2)
				})
			},
			//添加checked进行判断
			addChecked(value) {
				this.demand.forEach((item, index) => {
					this.$set(this.demand[index], 'checked', value);
					if(value){
						this.checkedList.push(this.demand[index].demandid)
					}
				})
			},
			//全选单选框控制
			addAllChexked() {
				this.checkedList = []
				this.allChexked = !this.allChexked
				console.log(this.allChexked);
				if (this.allChexked) {
					this.addChecked(true)
				} else {
					this.addChecked(false)
				}
			},
			//单选控制
			checkIsDelete(index) {
				this.$set(this.demand[index], 'checked', !this.demand[index].checked);
				if (this.demand[index].checked) {
					this.checkedList.push(this.demand[index].demandid)
				} else {
					this.checkedList.splice(this.demand[index].demandid, 1)
				}
				console.log(this.checkedList);
			},
			deleteDemands() {
				let demandids = [];
				this.demand.forEach((item, index) => {
					if (this.demand[index].checked) {
						demandids.push(this.demand[index].demandid)
					}
				})
				console.log(demandids);
				this.$ajax.demand.deletes({
					uid: uni.getStorageSync("userinfo").uid,
					demandids: demandids
				}).then(res => {
					console.log(res.data);
					this.demand = []
					this.selectDemand(0, this.pageNum)
				})
			},
			toDemandetails(item){
				uni.setStorageSync("demandhome",item)
				uni.navigateTo({
					url:"/pages/demandetail/demandetail"
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.demandsbox {
		height: 180rpx;
		padding: 30rpx 30rpx 30rpx 30rpx;
		border-top: 1px solid #eee;
		background-color: #fff;
		display: flex;
		align-items: center;
	}

	.demandsbox:last-child {
		padding-bottom: 120rpx;
	}

	.box {
		width: 90%;
		margin-left: 20rpx;
	}

	.demands>.box:last-child {
		border-bottom: 1px solid #eee;
	}

	.demands>.box:first-child {
		border: 0;
	}

	.box>view:first-child {
		padding-bottom: 30rpx;
	}

	.flexbox>view {
		color: #9B9B9D;
		font-size: 28rpx;
	}

	.flexbox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.money {
		color: orange;
		font-size: 36rpx;
	}

	.row {
		image {
			padding-top: 6rpx;
			width: 28rpx;
			height: 28rpx;
		}
	}

	.footernav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		border-top: 2rpx solid #9d9d9d;
		background-color: #fff;
		position: fixed;
		bottom: 0;

		label {
			margin-left: 30rpx;
		}

		text {
			margin-left: 20rpx;
			color: #9d9d9d;
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
	.three{
		display: flex;
	}
</style>
