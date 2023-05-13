<template>
	<view>
		<view @click="detail_address">
			<text>详细地址</text>
		</view>
		<view>{{address}}</view>
		<map class="map" :longitude="longitude" :latitude="latitude" :scale="scale" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: '',
				longitude: 113.275773,
				latitude: 23.129684,
				scale: "16",
				markers: [{
					latitude: 39.909,
					longitude: 116.39742,
					width: 25,
					height: 28,
					iconPath: '../../static/dwred.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					width: 25,
					height: 28,
					iconPath: '../../static/dwred.png'
				}],
			}
		},
		onShow() {
			
		},
		methods: {
			ccc(){
			},
			// 详细地址
			detail_address() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
				uni.chooseLocation({
					success: res => {
						console.log(res);
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						this.address = res.address
					}
				});
			},
		}
	}
</script>
<style lang="scss" scoped>
	map {
		width: 100%;
		height: 1000rpx;
	}
</style>
