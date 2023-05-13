<template>
	<view>
		<view class="title">
			您举报该土地的原因是
		</view>
		<view class="col" v-for="item in complain" :key="item.id" @click="chooseI(item.id)">
			<view class="item">{{item.content}}</view>
			<image v-show="chooseItem===item.id" src="../../static/gou.png"></image>
		</view>
		
		<view class="title">请输入您的举报理由</view>
		<view class="textarea_box">
			<textarea maxlength="300" placeholder-style="font-size:28rpx" placeholder="点击输入举报理由,限300字" v-model="desc"></textarea>
			<view class="num">{{desc.length}}/300</view>
		</view>
		<button @click="commit()"> 提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				complain:[
					{
						id:0,
						content:"土地信息不存在或已交易",
					},
					{
						id:1,
						content:"土地信息不真实",
					},
					{
						id:2,
						content:"土地价格不真实",
					},
					{
						id:3,
						content:"土地图片不真实",
					},
					{
						id:4,
						content:"其他",
					},
				],
				chooseItem:-1,
				desc:""
			}
		},
		methods: {
			chooseI(id){
				this.chooseItem=id
			},
			commit(){
				if(this.chooseItem!=-1){
					console.log(this.complain[this.chooseItem].content);
				}
				console.log(this.desc);
				this.$ajax.report.add({
					reportid:1,
					uid:uni.getStorageSync("userinfo").uid,
					landid:uni.getStorageSync("land").lid,
					state:1,
					reason:this.chooseItem!=-1?this.complain[this.chooseItem].content+this.desc:this.desc,
					createdAt:new Date(),
					updatedAt:new Date()
				}).then(res=>{
					uni.showLoading({
						title: "已提交",
						icon:'none'
					});
					
					setTimeout(function () {
						uni.hideLoading();
					}, 2000);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$padding-left : 20rpx;
	page{
		background: #F0EFF4;
	}
	.title{
		padding: $padding-left;
		color: #9D9D9D;
	}
	.col{
		padding-left: $padding-left;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		background: #fff;
		border-bottom: 1px solid #eee;
	}
	image{
		padding-right: 50rpx;
		width: 40rpx;
		height: 30rpx;
	}
	.textarea_box{
		padding: 20rpx;
		background: #ffffff;
		/deep/ .uni-textarea-textarea{
			font-size: 28rpx;
			line-height: 45rpx;
		}
		.num{
			text-align: right;
			color: gray;
		}
	}
	button{
		margin: 20rpx;
	}
</style>
