<template>
	<view class="adddemand">
		<view class="row">
			<label><text>*</text>标题：</label>
			<input placeholder="请输入需求土地的标题" v-model="demand.title" />
		</view>
		<view class=" row">
			<label><text>*</text>需求类型：</label>
			<picker @change="chooseType" :value="typeIndex" :range="typearray">
				<view class="row-fir">
					<input disabled placeholder="请选择类型" :value="typearray[typeIndex]" />
					<image src="../../static/enter.png"></image>
				</view>
			</picker>
		</view>
		<view class="row" style="margin-top: 30rpx;">
			<label><text>*</text>流转方式：</label>
			<picker @change="fsChange" :value="fsindex" :range="fsarray">
				<view class="row-fir">
					<input disabled placeholder="请选择流转方式" :value="fsarray[fsindex]" />
					<image src="../../static/enter.png"></image>
				</view>
			</picker>
		</view>
		<view class="row">
			<label><text>*</text>流转年限：</label>
			<input placeholder="请输入需求年限" v-model="demand.year" />
		</view>
		<view class="row">
			<label><text>*</text>需求面积：</label>
			<view class="row-fir">
				<input class="inputbor" type="number" placeholder="" v-model="demand.areaDown" />
				<text> - </text>
				<input class="inputbor" type="number" placeholder="" v-model="demand.areaUp" />
			</view>
			<view>{{this.demand.type=='住宅用地'?'平米':'亩'}}</view>
		</view>
		<view class="row">
			<label>价格：</label>
			<view class="row-fir">
				<input class="inputbor" type="number" placeholder="" v-model="demand.priceDown" />
				<text> - </text>
				<input class="inputbor" type="number" placeholder="" v-model="demand.priceUp" />
			</view>
			<view>{{unit}}</view>
		</view>
		<view class="row">
			<label><text>*</text>地址：</label>
			<input placeholder="请输入需求土地的地址" v-model="demand.address" />
		</view>
		<view class="row rowleft">
			<label>内容详情：</label>
			<textarea placeholder="请输入内容介绍" v-model="demand.content"></textarea>
		</view>

		<view class="row" style="margin-top: 30rpx;">
			<label><text>*</text>联系人：</label>
			<input placeholder="请输入联系人姓名" v-model="demand.name" />
		</view>
		<view class="row">
			<label><text>*</text>联系号码：</label>
			<input placeholder="请输入联系号码" v-model="demand.phone" />
		</view>
		<view class="tips">
			<checkbox-group @change="checkboxChange">
				<checkbox value="choose" color="#FFCC33" style="transform:scale(0.7)" />同意《土地委托流转协议》
			</checkbox-group>
		</view>
		<button @click="adddemand()">确认发布</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				typeIndex: -1,
				fsindex: -1,
				typearray: [],
				fsarray: ['求租', '求购'],
				unit: '元/亩/年',
				demand: {
					uid: '',
					title: '',
					type: '',
					fs: '',
					year: '',
					areaUp: '',
					areaDown: '',
					priceUp: '',
					priceDown: '',
					address: '',
					content: '',
					name: '',
					phone: '',
				},
				verifiy: false,
				checkbox: false
			}
		},
		onLoad() {
			this.getType()

		},
		onShow() {},
		methods: {
			getType() {
				this.$ajax.dict.checklandType().then(res => {
					this.typearray = res.data
					uni.setStorageSync('fenlei_land_type', res.data)
				})

			},
			chooseType(e) {
				this.typeIndex = e.detail.value
				this.demand.type = this.typearray[e.detail.value]
				this.unitchange()
			},
			unitchange() {
				if (this.demand.type == '住宅用地') {
					this.unit = '元/平米/年'
				} else {
					this.unit = '元/亩/年'
				}
			},
			fsChange(e) {
				this.fsindex = e.detail.value
				this.demand.fs = this.fsarray[e.detail.value]
			},
			checkboxChange(e) {
				console.log(e.detail.value[0]);
				if (e.detail.value[0] == 'choose') {
					this.checkbox = true
				} else {
					this.checkbox = false
				}
			},
			adddemand() {
				this.verifiydemand()
				if (this.verifiy) {
					this.$ajax.demand.add({
						...this.demand
					}).then(res => {
						this.tipsInfo("已发布需求")
						this.formReset()
					})
				}
			},
			verifiydemand() {
				this.demand.uid = uni.getStorageSync('userinfo').uid
				let rule = this.demand.title == '' || this.demand.type == '' || this.demand.fs == '' ||
					this.demand.year == '' || this.demand.areaup == '' || this.demand.areaDown == '' ||
					this.demand.address == '' || this.demand.name == '' || this.demand.phone == '';
				if (!this.checkbox) {
					this.tipsInfo("请先同意《土地委托流转协议》")
				} else {
					if (this.demand.uid == '') {
						this.verifiy = false
						this.tipsInfo("请先登录")
					} else {
						if (rule) {
							this.verifiy = false
							this.tipsInfo("请将信息填写完整")
						} else {
							this.verifiy = true
						}
					}
				}
			},
			formReset() {
				this.demand = {
					uid: '',
					title: '',
					type: '',
					fs: '',
					year: '',
					areaUp: '',
					areaDown: '',
					priceUp: '',
					priceDown: '',
					address: '',
					content: '',
					name: '',
					phone: '',
				}
			},
			tipsInfo(value) {
				uni.showLoading({
					title: value,
					icon: 'none'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.adddemand {
		padding: 20rpx 0;
		background-color: #eee;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
		font-size: 28rpx;
		background-color: #fff;

		image {
			width: 50rpx;
			height: 50rpx;
		}

		input {
			text-align: right;
			font-size: 28rpx;
			padding: 6rpx;
		}

		textarea {
			width: 520rpx;
			font-size: 28rpx;
			border: 2rpx solid #9d9d99;
			padding: 10rpx;
		}
	}

	label {
		text {
			color: red;
		}
	}

	.row-fir {
		display: flex;
		align-items: center;

		.inputbor {
			border: 2rpx solid #9d9d99;
			width: 160rpx;
		}
	}

	.rowleft {
		align-items: flex-start;
	}

	.tips {
		margin-top: 50rpx;
		margin-bottom: 10rpx;
		font-size: 24rpx;
	}

	button {
		background-color: orange;
		color: #fff;
	}
</style>
