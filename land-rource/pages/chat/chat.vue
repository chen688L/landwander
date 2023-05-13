<template>
	<view class="chat">
		<view>
			<scroll-view class="top" scroll-y="true"  :style="{height:scrollViewH+'px'}"
				:scroll-top="scrollTop" :scroll-into-view="scrollToView">
				<view id="scroll-view-content" class="recond" v-for="(item,index) in list" :key="index"
					:id="'msg'+ (index+1)">
					<view class="box left" v-if="!(item.user1.username == username)">
						<view class="box-left-top">
							<view class="name">{{item.user1.username}}</view>
							<view class="time">{{item.createdAt | getTime}}</view>
						</view>
						<view class="box-left-bottom">
							<image :src="url+item.user1.avater"></image>
							<view class="content" v-html="item.chatMsg"></view>
						</view>
					</view>
					<view class="box right" v-if="item.user1.username == username">
						<view class="box-right-top">
							<view class="time">{{item.createdAt | getTime}}</view>
							<view class="name">{{item.user1.username}}</view>
						</view>
						<view class="box-right-bottom">
							<view class="content" v-html="item.chatMsg"></view>
							<image :src="url+item.user1.avater"></image>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="chat-bottom">
			<view class="bottom">
				<input placeholder="请输入内容" v-model="chatMsg" />
				<button @click="sendMsg()">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: "",
				url: " ",
				chatMsg: "",
				pageNum: 90,
				pageSize: 0,
				list: [],
				scrollToView: '',
				scrollViewH: 800, //滚动条视图范围
				scrollTop: 0, //滚动条位置
				uid1: "",
				uid2: "",
				username: "",
				unititlename:""
			}
		},
		onLoad(options) {
			console.log(options);
			this.unititlename = options.name
			this.userInfo = uni.getStorageSync("userinfo")
			this.username = this.userInfo.username
			this.uid2 = uni.getStorageSync("sys_usersend_uid")
			this.uid1 = uni.getStorageSync("userinfo").uid
			this.setIsRead()
			this.silde()
			this.scrollToBottom()
		},
		onShow() {
			this.url = getApp().globalData.serviceIp
			this.checkChat()
			this.silde()
			this.scrollToBottom()
		},
		created() {
			uni.setNavigationBarTitle({
				title:this.unititlename
			})
			
		},
		methods: {
			scrollToBottom() {
				setTimeout(() => {
					this.scrollTop = this.scrollTop + 999999;
				}, 100)
			},

			//滑动
			silde() {
				// 跳转到最后一条数据 与前面的:id进行对照
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.list.length - 1)
				})
			},
			checkChat() {
				this.$ajax.chat.check({
					uid1: this.uid1,
					uid2: this.uid2,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}).then(res => {
					this.list = res.data
					this.list = this.list.reverse()
					this.silde()
					this.scrollToBottom()
				})
			},
			setIsRead() {
				this.$ajax.chat.updateState({
					uid1: this.uid1,
					uid2: this.uid2,
				}).then(res => {})
			},
			sendMsg() {
				this.$ajax.chat.send({
					uid1: this.uid1,
					uid2: this.uid2,
					msg: this.chatMsg
				}).then(res => {
					this.checkChat()
					this.chatMsg = ""
				})
			},
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
		background-color: #eee;
	}

	.chat {
		height: 100%;
	}

	.top {
		height: 100%;
	}

	.recond {
		height: 170rpx;
	}

	.box {
		padding: 10rpx;

		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50rpx;
		}
	}

	.box-left-top {
		display: flex;

		.time {
			margin-left: 40rpx;
		}
	}

	.box-left-bottom {
		display: flex;
		align-items: center;

		.content {
			margin-left: 20rpx;
			background-color: #fff;
		}
	}

	.box-right-top {
		display: flex;
		justify-content: flex-end;

		.time {
			margin-right: 40rpx;
		}
	}

	.box-right-bottom {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.content {
			margin-right: 20rpx;
		}
	}

	.content {
		background-color: limegreen;
		border-radius: 10rpx;
		font-size: 28rpx;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		height: 40rpx;
		padding: 16rpx 20rpx;
	}

	.name {
		font-size: 28rpx;
	}

	.chat-bottom {
		height: 110rpx;
	}

	.bottom {
		position: fixed;
		width: 100%;
		bottom: 0;
		display: flex;
		background-color: #ffffff;
		padding: 20rpx 30rpx;
		bottom: env(safe-area-inset-bottom);

		input {
			padding: 0 10rpx;
			font-size: 28rpx;
			height: 70rpx;
			width: 65%;
			border: 1px solid #eee;
		}

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			height: 70rpx;
			width: 20%;
			background-color: blue;
			color: #ffffff;
		}
	}
</style>
