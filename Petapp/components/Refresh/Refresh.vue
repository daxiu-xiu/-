<template>
	<view class="refresh">
		<view :style="{height: dynamicHeight + 'rpx'}" :class="showTrans ? 'refresh-container show-load' : 'refresh-container'">
			<view class='refresh-layout' :style="{height: refreshHeight + 'rpx'}">
				<view class="refresh-loading" v-show="0 == pullState">
					<text class="refresh-tips flex-center" v-if="pullState==0">刷新成功,可自定义</text>
					<!-- <image src="../../static/images/img_avatar.png" v-if="pullState==0" style="width: 20px;" mode="widthFix"></image> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pullState: -1, // 刷新状态 -1:默认  1:开始下拉  2: 达到下拉最大距离  0: 正在刷新 
				dynamicHeight: 0, //刷新布局动态高度
				refreshHeight: 80, //触发刷新的最小高度
				scrollTop: 0,
				lastY: 0,
				showTrans: false
			};
		},
		props: {
			loadWord: {
				type: Number,
				value: 3
			},
			textColor: {
				type: String,
				value: "white"
			}
		},

		methods: {
			//自动刷新
			autoRefresh() {
				const PULL_REFRESHING = 0 //刷新中
				this._pullStateChange(PULL_REFRESHING, this.refreshHeight)
			},
			//停止刷新
			stopPullRefresh() {
				const PULL_DEFAULT = -1 //默认
				this._pullStateChange(PULL_DEFAULT, 0)
				this.pullState = PULL_DEFAULT;
				this.dynamicHeight = 0;
			},
			//是否正在刷新
			isRefreshing() {
				const PULL_REFRESHING = 0 //刷新中
				return PULL_REFRESHING == this.pullState
			},
			//是否下拉状态
			isPullState() {
				const PULL_DEFAULT = -1 //默认
				return PULL_DEFAULT != this.pullState
			},
			//页面触摸开始事件，必须在触摸开始方法中调用此方法
			handletouchstart: function(event) {
				this.lastY = event.touches[0].clientY
			},
			//页面触摸移动事件，必须在触摸开始方法中调用此方法
			handletouchmove: function(event) {
				const PULL_GT_HEIGHT = 2 //下拉大于高度
				const PULL_LT_HEIGHT = 1 //下拉小于高度
				let pageY = event.touches[0].pageY
				let clientY = event.touches[0].clientY
				let offsetY = clientY - this.lastY
				if (this.scrollTop > 0 || offsetY < 0) return
				let dynamicHeight = this.dynamicHeight + offsetY
				if (dynamicHeight > this.refreshHeight) {
					this._pullStateChange((0 == this.pullState) ? 0 : PULL_GT_HEIGHT, dynamicHeight)
				} else {
					dynamicHeight = dynamicHeight < 0 ? 0 : dynamicHeight //如果动态高度小于0处理
					this._pullStateChange((0 == this.pullState) ? 0 : PULL_LT_HEIGHT, dynamicHeight)
				}
				this.lastY = event.touches[0].clientY;
			},
			//页面触摸结束事件，必须在触摸开始方法中调用此方法
			handletouchend: function(event) {
				const PULL_REFRESHING = 0 //刷新中
				const PULL_DEFAULT = -1 //默认
				let refreshHeight = this.refreshHeight
				if (0 == this.pullState) {
					this._pullStateChange(PULL_REFRESHING, refreshHeight)
					return
				}
				let dynamicHeight = this.dynamicHeight
				if (this.scrollTop > 0 && PULL_DEFAULT != this.pullState) {
					//2 * this.scrollTop 两倍表示px转upx，  所以这里必须进行单位转换
					if (dynamicHeight - scale * this.scrollTop > refreshHeight) {
						this._pullStateChange(PULL_REFRESHING, refreshHeight)
					} else {
						this._pullStateChange(PULL_DEFAULT, 0)
					}
					return
				}
				if (dynamicHeight >= this.refreshHeight) {
					this._pullStateChange(PULL_REFRESHING, refreshHeight)
				} else {
					this._pullStateChange(PULL_DEFAULT, 0)
				}
				setTimeout(() => {
					this.stopPullRefresh();
				}, 1500)
			},
			//页面触摸取消事件，必须在触摸开始方法中调用此方法
			handletouchcancel: function(event) {
				const PULL_DEFAULT = 3 //默认
				this._pullStateChange(PULL_DEFAULT, 0)
			},
			//页面滚动
			onPageScroll: function(event) {
				const PULL_DEFAULT = -1 //默认
				const PULL_GT_HEIGHT = 2 //下拉大于高度
				const PULL_LT_HEIGHT = 1 //下拉小于高度
				if (event.scrollTop > 0 && PULL_DEFAULT != this.pullState) {
					//2 * this.scrollTop 两倍表示px转upx，  所以这里必须进行单位转换
					if (this.dynamicHeight - scale * event.scrollTop < this.refreshHeight) {
						this.pullState = PULL_LT_HEIGHT
					} else {
						this.pullState = PULL_GT_HEIGHT
					}
				}
				this.scrollTop = event.scrollTop
			},
			//下拉状态监听
			_pullStateChange(state, dynamicHeight) {
				this.pullState = state;
				this.dynamicHeight = dynamicHeight;
				console.log(state)
				if (state == 0 || state == -1) {
					this.showTrans = true;
					console.log('44');
				} else {
					this.showTrans = false;
				}
				this.$emit('giveState', state);
			}
		}
	}
</script>

<style scoped>
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100upx;
		letter-spacing: 0;
	}

	.refresh-container {
		box-sizing: border-box;
		font-size: 28upx;
		color: #999;
		background-color: #F5F8F9;
		display: flex;
		width: 100%;
	}

	.show-load {
		transition: height 0.4s ease-out;
	}

	.refresh-layout {
		vertical-align: center;
		width: 100%;
		text-align: center;
		align-self: flex-end;
		background-color: #f5f8f9;
	}

	.refresh-loading {
		width: 100%;
		height: 100%;
		display: inline-block;
		vertical-align: middle;
	}

	.refresh-tips {
		line-height: 30upx;
		font-size: 26upx;
		vertical-align: middle;
		margin: auto;
	}

	.flexbox {
		position: relative;
		height: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.border {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
		overflow: hidden;
		background-image: linear-gradient(#f5f8f9 0%, #f5f8f9 25%, #dd001b 100%);
	}

	.load {
		width: 40upx;
		height: 40upx;
		overflow: hidden;
		border-radius: 50%;
		background-color: #f5f8f9;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -20upx;
		margin-top: -20upx;
	}

	.load-img {
		width: 24upx !important;
		height: 28upx !important;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.8s ease-in-out;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
		transform: translateY(0px);
	}
</style>
