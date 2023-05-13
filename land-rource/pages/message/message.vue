<template>
	<view class="message">
		<view v-if="userId">
			<view class="box" @click="toChat(item)" v-for="(item,index) in chats">
				<image class="icon"
					:src="userinfo.avater==item.user2.avater?url+item.user1.avater:url+item.user2.avater"></image>
				<view class="content">
					<view class="top">
						<text>{{userinfo.username==item.user2.username?item.user1.username:item.user2.username}}</text>
						<view>{{item.createdAt | getTime}}</view>
					</view>
					<view class="bottom">{{item.chatMsg}}</view>
					<view class="redot" v-if="item.chatState==0"></view>
				</view>
			</view>
			<view v-show="chats.length==0" class="tologin">空消息</view>
		</view>
		<view v-else class="tologin" @click="tologin()">请先登录 ...</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: " ",
				img_list: [],
				userId: "",
				pageNum: 10000,
				pageSize: 0,
				chats: [],
				userinfo: {},
			}
		},
		onLoad() {
			this.url = getApp().globalData.serviceIp
			this.userinfo = uni.getStorageSync("userinfo")
		},
		onShow() {
			let userinfo = uni.getStorageSync('userinfo');
			console.log("userinfo",userinfo);
			if (userinfo) {
				this.checkChat()
				this.userId = userinfo.uid
				this.chats.find(function(value) {
					// if (!value.chatState) {
					// 	console.log("有");
					// 	uni.showTabBarRedDot({
					// 		index: 3
					// 	})
					// } else {
					// 	uni.hideTabBarRedDot({
					// 		index: 3
					// 	})
					// }
				})
			}else{
				this.userId=""
			}
		},
		methods: {
			checkChat() {
				let uid1 = uni.getStorageSync("userinfo").uid
				this.$ajax.chat.check({
					uid1: uid1,
					uid2: "",
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}).then(res => {
					this.chats = res.data
					let list = [].concat(this.chats)
					let list2 = []
					let listuid = []
					for (let i = 0; i < list.length; i++) {
						let uidA = this.userinfo.uid == list[i].uid2 ? list[i].uid1 : list[i].uid2
						if (!listuid.includes(uidA)) {
							listuid.push(uidA)
							list2.push(list[i])
						}
					}
					this.chats = list2
				})
			},
			toChat(item) {
				let uid2 = (this.userinfo.uid == item.uid2 ? item.uid1 : item.uid2)
				uni.setStorageSync("sys_usersend_uid", uid2)
				let name = (this.userinfo.username==item.user2.username?item.user1.username:item.user2.username)
				uni.navigateTo({
					url: '/pages/chat/chat?name='+name
				})
			},
			tologin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		},
		filters: {
			getTime(oldDate) {
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
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.message {
		height: 100%;
	}

	.box {
		position: relative;
		width: 100%;
		border-bottom: 1px solid #eee;
		display: flex;
		padding: 20rpx 20rpx;
	}

	.icontip {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
	}

	.icon {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 500rpx;
		padding: 0 20rpx;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;

		text {
			font-size: 36rpx;
			font-weight: bold;
		}

		view {
			font-size: 24rpx;
		}
	}

	.bottom {
		font-size: 28rpx;
	}

	.redot {
		width: 20rpx;
		height: 20rpx;
		background-color: red;
		border-radius: 20rpx;
		position: absolute;
		right: 50rpx;
		top: 30rpx;
		color: #ffffff;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tologin {
		margin-top: 500rpx;
		font-size: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #9d9d9d;
	}
</style>
