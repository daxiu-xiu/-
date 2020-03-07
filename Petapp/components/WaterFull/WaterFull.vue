<template>
	<view class="water-fill">
		<template v-if="waterList.length != 0">
			<view class="water-wrapper" @touchstart='handletouchstart' @touchmove='handletouchmove' @touchend='handletouchend'>
				<refreshView ref="refreshView" @giveState="getState" />
				<view class="water-box">
					<view class="water-sub" v-for="(items,index) in waterList" :key="index">
						<view class="water-item" v-for="(item,index) in items" :key="index">
							<view class="water-top">
								<image class="top-cover" :src="item.cover" :onerror="errorImg" mode="widthFix"></image>
								<h3 class="top-title">{{item.title}}</h3>
							</view>
							<view class="water-bottom">
								<view class="water-bottom-item">
									<text class="water-name">售价{{item.money}}</text>
								</view>
								<view class="water-bottom-item">
									<text class="water-num">加入购物车</text>
									<image class="bottom-good" :onerror="errorImg" src="/static/gouwuche1-copy-copy-2.png" mode="widthFix"></image>
									
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<view class="water-none" v-if="waterList.length == 0">
			<image class="no-data" src="/static/icon_nodatas.png" mode="widthFix"></image>
			<text class="no-word">暂无数据</text>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	import refreshView from '../Refresh/Refresh.vue'
	export default {
		components: {
			refreshView
		},
		name: 'waterFill',
		data() {
			return {
				waterList: [],
				errorImg: 'this.src="' + require('../../static/img_photo_default.png') + '"'
			}
		},
		methods: {
			// 将数组拆分成可使用状态,减少代码
			groupCut(array, subGroupLength) {
				let index = 0;
				let newArray = [];
				while (index < array.length) {
					newArray.push(array.slice(index, index += subGroupLength));
				}
				return newArray;
			},
			handleLoad(arr) {
				// 如果arr存在,即在父组件刷新的值  若不存在就是下拉请求刷新
				if (arr) {
					let length = arr.length;
					this.waterList = this.groupCut(arr, length / 2)
				} else {
					console.log('写请求数据接口，将数据赋值给waterList')
				}
				uni.showToast({
					title: '刷新啦'
				})
			},
			// 监听页面下拉刷新
			//触摸开始
			handletouchstart: function(e) {
				let that = this;
				that.$refs.refreshView.handletouchstart(e)
			},

			//触摸移动
			handletouchmove: function(e) {
				let that = this;
				that.$refs.refreshView.handletouchmove(e)
			},
			//触摸结束
			handletouchend: function(e) {
				let that = this;
				that.$refs.refreshView.handletouchend(e);
			},
			getState(state){
				console.log(state);
				let that=this;
				if(state == 0){
					that.handleLoad();
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	.water-fill {
		.water-wrapper {
			.water-box {
				display: flex;
				width: 100%;
				box-sizing: border-box;
				font-size: 0;
				justify-content: space-between;
				background-color: #f5f8f9;
				padding: 10px 5px;

				.water-sub {
					display: flex;
					width: 49%;
					overflow: hidden;
					flex-direction: column;

					.water-item {
						width: 100%;
						border-radius: 12upx;
						overflow: hidden;
						background-color: #FFFFFF;
						margin-bottom: 10upx;

						.water-top {
							.top-cover {
								width: 100%;
							}

							.top-title {
								font-family: PingFangHK-Medium;
								font-size: 28upx;
								font-weight: 600;
								line-height: 40upx;
								color: #333333;
								text-align: justify;
								margin: 20upx;
								.n-ellipsis(2);
							}
						}

						.water-bottom {
							display: flex;
							justify-content: space-between;
							// margin: 0 20upx 20upx 20upx;
							font-size: 24upx;

							.water-bottom-item {
								display: flex;
								align-items: center;

								.img-box {
									display: flex;
									align-items: center;
									justify-content: center;
									width: 50upx;
									height: 50upx;
									border-radius: 50%;
									overflow: hidden;

									.water-avatar {
										// width: 50upx;
									}
								}

								.water-name {
						
									padding-left: 20upx;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}

								.water-num {
									line-height: 32upx;
									font-size: 24upx;
									color: #333;
									margin-left: 14upx;
								}

								.bottom-good {
									width: 28upx;
									height: 28upx;
								}
							}
						}
					}
				}
			}
		}

		.water-none {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.no-data {
				width: 200upx;
				height: 200upx;
			}

			.no-word {
				padding-top: 40upx;
				font-size: 24upx;
				color: #999;
			}
		}
	}


	//多行文本省略
	.n-ellipsis(@n) {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: @n;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		word-break: break-all;
	}
</style>
