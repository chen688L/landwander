<template>
	<view class="helang-tab-bar">
		<view class="placeholder" v-if="fixedBottom"></view>
		<view class="bar" :class="{'fixed':fixedBottom}">
			<view class="bulgy" :style="bulgyMove"></view>
			<view class="h-flex-x h-flex-5">
				<view class="item h-flex-x h-flex-center"
					v-for="(item,index) in  tabList" 
					:key="index" 
					:class="{
						'active':current == index,
						'recover':prevIndex == index
					}"
					@tap="change(index)"
				>
					<view>
						<view class="h-flex-x h-flex-center">
							<view class="icon">
								<uni-icons :type="item.icon" size="48rpx" color="#6b6b68"></uni-icons>
							</view>
						</view>
						<view class="h-flex-x h-flex-center">
							{{item.text}}
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/uni_modules/helang-tabBar/components/uni-icons/uni-icons";
	
	export default {
		// 冒泡
		name:"helangTabBarBubble",
		components: {
			uniIcons
		},
		props:{
			// 固定底部
			fixedBottom:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				prevIndex:-1,
				current:1,
				tabList:[
					{
						"icon":"home-filled",
						"text":"首页"
					},
					{
						"icon":"chat-filled",
						"text":"消息"
					},
					{
						"icon":"cart-filled",
						"text":"购物"
					},
					{
						"icon":"gift-filled",
						"text":"福利"
					},
					{
						"icon":"person-filled",
						"text":"我的"
					},
				]
			};
		},
		computed:{
			bulgyMove(){
				let style = `left:${this.current/this.tabList.length*100}%`;
				return style;
			}
		},
		methods:{
			change(index){
				if(this.current == index)return;
				this.prevIndex = this.current;
				this.current = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "./helang-flex.scss";
@import "./tab-bar.scss";

.helang-tab-bar{
	.bar{
		background-color: #17191d;
	}
	
	// 凸起
	.bulgy{
		width: 20%;
		height: 60rpx;
		overflow: hidden;
		position: absolute;
		left: 0;
		top: -38rpx;
		transition: left 0.2s ease 0s;
		z-index: 0;
		
		&:before{
			content: '';
			display: block;
			width: 300rpx;
			height: 600rpx;
			border-radius: 50%;
			background-color: #17191d;
			position: absolute;
			top: 0;
			left: 50%;
			margin-left: -150rpx;
			z-index: 1;
		}
	}
	
	.item{
		height: 100rpx;
		position: relative;
		color: #6a6a6a;
		font-size: 22rpx;
		line-height: normal;
		
		
		&.active{
			animation:font 0.2s ease 0.1s 1 normal;
			animation-fill-mode:forwards;
			
			.icon{
				position: relative;
				animation:translate 0.2s ease 0.1s 1 normal;
				animation-fill-mode:forwards;
				
				/deep/ .uni-icons{
					color: #e8c439 !important;
				}
				
				&::before{
					content: '';
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: -1;
					opacity: 0;
					border-radius: 50%;
					
					
					animation:scale 0.3s ease 0.2s 1 normal;
					animation-fill-mode:forwards;
				}
			}
			
			
		}
		
		&.recover{
			.icon{
				animation:recover 0.3s ease 0s 1 normal;
			}
		}
	}
}

// 恢复默认
@keyframes recover
{
	from {
		transform:translateY(-20rpx) scale(1.1,1.1);
	}
	to {
		transform:translateY(0) scale(1,1);
	}
}
// 转换移动
@keyframes translate
{
	from {
		transform:translateY(0) scale(1,1);
	}
	to {
		transform:translateY(-20rpx) scale(1.1,1.1);
	}
}
// 圆圈缩放
@keyframes scale
{
	0% {
		transform:scale(1,1);
		opacity: 0;
		background-color: #e8c439;
	}
	100% {
		transform:scale(1.5,1.5);
		opacity: 0.13;
		background-color: #e8c439;
	}
}

// 淡入
@keyframes font
{
	from {
		color: #6a6a6a;
	}
	to {
		color: #aa9638;
	}
}
</style>
