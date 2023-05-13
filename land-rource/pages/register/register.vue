<template>
	<view class="content" :style="'height:'+screenHeight+'px'">
		<view class="register  animate__animated animate__flipInY">
			<view class="tabs">
				<image src="../../static/user/logo.jpg"></image>
			</view>
			<view class="main">
				<view class="msg" v-if="msg!=''">{{msg}}</view>
				<form class="user">
					<input @input="getphone" focus placeholder="请输入手机号码" />
					<input @input="getpwd" password type="text" placeholder="请输入密码" />
					<view class="yzm">
						<input class="yzminput" @input="getyzm" type="text" placeholder="请输入验证码" />
						<view class="identity">
							<view class="canvas-img-code" @click="refresh()">
								<canvas :style="{width:width+'px',height:height+'px'}" canvas-id="imgcanvas"
									@error="canvasIdErrorCallback"></canvas>
							</view>
						</view>
					</view>
					<button form-type="submit" class="login" @click="reg()"><text>注&emsp;&emsp;&emsp;&emsp;册</text></button>
					<text class="toreg" @click="toreg()">已有账号，返回登录</text>
				</form>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: getApp().globalData.screenHeight - 120,
				phone: "",
				pwd: "",
				yzm: "",
				msg: "",
				imgcode: "", //验证码
				width: 120,
				height: 45
			}
		},
		onLoad() {
		this.init()	
		},
		onShow() {
			let _this = this;
			setTimeout(function() {
				_this.init();
			}, 500)
		},
		methods: {
			toreg() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			getphone(e) {
				this.phone = e.detail.value
				console.log(this.phone);
				this.msg = ""
			},
			getpwd(e) {
				this.pwd = e.detail.value
				this.msg = ""
			},
			getyzm(e) {
				this.yzm = e.detail.value
				this.msg = ""
			},
			reg() {
				let phone = this.phone
				let password = this.pwd
				var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				if (phone == "" || password == "") {
					this.msg = "手机号或密码不能为空！"
					this.init()
				} else if (phone.length != 11 || (!reg.test(this.phone))) {
					this.msg = "请输入正确的手机号！"
					this.init()
				} else if (password.length < 6 || password.length > 12) {
					this.msg = "密码长度为6~12！"
					this.init()
				} else {
					if (this.yzm != "") {
						if (this.yzm == this.imgcode) {
							this.$ajax.user.register({
								phone: phone,
								password: password,
								avater: "",
								rid: 2
							}).then(res => {
								console.log(res);
								if (res.state == 200) {
									uni.showToast({
										title: '注册成功',
										icon: 'none',
										duration: 2000
									});
									uni.setStorageSync("sys_user_phone", phone)
									uni.navigateTo({
										url: "/pages/login/login"
									})
								} else {
									uni.showToast({
										title: '服务器断开',
										icon: 'none',
										duration: 2000
									});
								}

							})
						} else {
							this.msg = "验证码输入错误！"
						}
					} else {
						this.msg = "验证码不能为空！"
					}
				}
			},
			// 初始化验证码
			init: function() {
				console.log('start');
				var context = uni.createCanvasContext('imgcanvas', this),
					w = this.width,
					h = this.height;
				context.setFillStyle("white");
				context.setLineWidth(5);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q",
						"R", "S",
						"T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
					],
					str = '';
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var deg = this.rn(-30, 30);
					context.setFontSize(18);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();
					context.translate(30 * i + 15, parseInt(h / 1.5));
					context.rotate(deg * Math.PI / 180);
					context.fillText(c, -15 + 5, -15);
					context.restore();
					str += c;
				}
				this.imgcode = str
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				console.log('end');
			},
			rc: function(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			rn: function(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},
			refresh: function() {
				this.init();
			},
			canvasIdErrorCallback: function(e) {
				console.error(e.detail.errMsg)
			}
		}
	}
</script>

<style lang="scss" scoped>
	$width : 604rpx;
	$form-item-height : 96rpx;

	.canvas-img-code {
		border: 1px solid #eee;
		border-radius: 10rpx;
	}

	/* 全部文字图片居中 */
	.content {
		// background: #FFCC33;
		display: flex;
		justify-content: center;
		padding-top: 240rpx;
	}

	// 白色区域内容
	.register {
		background: #FFFFFF;
		padding-top: 20rpx;
		padding-bottom: 40rpx;
		width: 90%;
		height: 800rpx;
		margin: 0 auto;
		border-radius: 20rpx;
	}

	// 图片logo
	.tabs {
		text-align: center;
		margin-bottom: 40rpx;

		image {
			width: 60px;
			height: 60px;
		}
	}

	/* 表单区域 */
	.main {
		margin: 0 auto;
		width: $width;
		position: relative;
	}

	input {
		background: #EEEEEE;
		width: $width - 40;
		height: $form-item-height;
		line-height: $form-item-height;
		margin: 20rpx auto;
		padding-left: 20rpx;
		border: 1px solid #EEEEEE;
		border-radius: 40rpx;
	}

	.yzm {
		width: $width - 40;
		margin-top: 0;
		position: absolute;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.yzminput {
		width: 200rpx;
		margin: 0;
		font-size: 28rpx;
	}

	// 发送验证码按钮
	// 注册按钮
	.login {
		width: $width;
		height: $form-item-height;
		line-height: $form-item-height;
		border-radius: 40rpx;
		margin-top: $form-item-height+60;
		background: #00CCCC;
		color: #ffffff;
	}

	/* 去注册提示 */
	.toreg {
		font-size: 28rpx;
		text-decoration: underline;
		float: right;
		line-height: $form-item-height;
		color: #666666;
	}

	.msg {
		position: absolute;
		top: -21px;
		font-size: 24rpx;
		color: red;
		margin-left: 20rpx;
	}
</style>
