<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.getSystemInfo({ //设置屏幕高度
				success: res => {
					//减去tabbar的高度，默认为50px
					this.globalData.screenHeight = res.screenHeight - 50
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			serviceIp: "http://172.16.205.110:8089"
		},
		

	}
</script>

<style lang="scss">
	/*每个页面公共css */
</style>
