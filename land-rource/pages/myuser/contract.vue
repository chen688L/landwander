<template>
	<view>
		<!-- HTML -->
		<view class="box" v-for="(item,index) in list">
			<view>{{item}}</view>
			<button @click='showPreview(item)'>下载</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reachIndex: 1,
				pageNum: 10,
				pageSize: 0,
				url: "",
				list: [],
			}
		},
		onShow() {
			this.url = getApp().globalData.serviceIp
		},
		onLoad() {
			this.$ajax.upload.checkfile({
				state: 2,
				pageCurrent: 0,
				pageSize: 10
			}).then(res => {
				let list = []
				for(let i=0;i<res.data.length;i++){
					list.push(res.data[i].path.replace("/file/", ""))
				}
				console.log(list);
				this.list = this.list.concat(list)
				// this.fileUrl = this.url+het.pdf
				if (res.data.length == 0) {
					this.reachIndex = 0
				}
			})
		},
		onReachBottom() {
			if (this.reachIndex) {
				this.pageSize = this.pageSize + this.pageNum
				this.getland()
			}
		},
		methods: {
			showPreview(item) {
				uni.downloadFile({
					url: 'http://192.168.118.77:8089/file/'+item,
					success: function(res) {
						var filePath = res.tempFilePath;
						uni.openDocument({
				 		filePath: filePath,
							showMenu: true,
							success: function(res) {
								console.log('打开文档成功');
							}
						});
					}
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.box{
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		border-bottom: 2rpx solid #8d8d8d;
		button{
			margin: 0;
			background-color: red;
			width: 180rpx;
			color: #fff;
		}
	}

</style>
