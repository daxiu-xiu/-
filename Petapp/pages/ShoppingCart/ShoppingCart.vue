<template>
	<view class="">
		
	<text style="margin: 20rpx;color: #CC3347;font-weight: bold;">	我的购物车</text>
	<view class="shopCar">
		<view class="content">
			<uni-swipe-action @click="removeM" v-for="(obj, index) in list" :key="index" :options="obj._id">
				<view class="contBox">
					<view class="circleBox" @click.stop="inp(obj._id)">
						<image src="../../static/bbh-shopCar/icon/circleCachee.png" class="circle" v-if="!obj.check"></image>
						<image src="../../static/bbh-shopCar/icon/circleCacheef.png" class="circle" v-if="obj.check"></image>
					</view>
					<view class="goodBox">
						<view style="display: flex;align-items: center;">
							<image 
							:src="`http://localhost:3000/upload/images/${obj.img}`"
							style="width: 140rpx;height: 140rpx;" mode=""></image>
							<view style="width: 140rpx;margin-left: 20rpx;">
								<text class="shoptitle">{{obj.name}}</text>
								<view class="shopprice">{{ obj.price }}</view>
							</view>
						</view>
						<view class="countBox">
							<view class="sign" @click="signCount(obj._id)">
								<image src="../../static/bbh-shopCar/icon/signf.png" v-if="obj.count - 0 > 1"></image>
								<image src="../../static/bbh-shopCar/icon/signe.png" v-if="obj.count == 1"></image>
							</view>
							<view class="count">{{ obj.count }}</view>
							<view class="add" @click="addCount(obj._id)">
								<image src="../../static/bbh-shopCar/icon/addf.png" v-if="obj.stock - 0 > obj.count - 0"></image>
								<image src="../../static/bbh-shopCar/icon/adde.png" v-if="obj.stock == obj.count"></image>
							</view>
						</view>
					</view>
				</view>
			</uni-swipe-action>
			<view class="allBox">
				<view>
					<view @click="all()">
						<image src="../../static/bbh-shopCar/icon/circleCacheef.png" v-if="flag"></image>
						<image src="../../static/bbh-shopCar/icon/circleCachee.png" v-if="!flag"></image>
						<text>全选</text>
					</view>
					<text class="total">￥{{ money }}</text>
				</view>
				<view @click="goPay()">去结算</view>
			</view>
		</view>
	</view>
	</view>
</template>
<script>
//引入仓库，状态机
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('pet');

import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';

export default {
	data() {
		return {
			flag: false, //判断是否全选
			money: 0, //总金额
			num: 0 //删除数据后，用来判断是否全选
		};
	},
	computed: {
		...mapState(['list'])
	},
	mounted() {
		//进来渲染购物车页面
		this.getShopAartById();
	},
	onShow() {
		this.getShopAartById();
	},
	methods: {
		...mapActions(['getShopAartById', 'updateCount']),

		all(index) {
			//全选
			this.flag = !this.flag;
			if (this.flag) {
				for (var i = 0; i < this.list.length; i++) {
					this.list[i].check = true;
				}
				this.num = this.list.length;
				this.total();
			} else {
				for (var i = 0; i < this.list.length; i++) {
					this.list[i].check = false;
				}
				this.num = 0;
				this.money = 0;
			}
			this.$emit('getShopAartById', this.list);
		},
		signCount(id) {
			//减少商品
			for (var i = 0; i < this.list.length; i++) {
				var obj = this.list[i];
				if (obj._id == id) {
					if (obj.count - 0 > 1) {
						~~obj.count--;
						console.log(id, obj.count);
						this.updateCount({ _id: id, count: obj.count });
					}
					break;
				}
			}
			this.total();
		},
		addCount(id) {
			//增加商品
			for (var i = 0; i < this.list.length; i++) {
				var obj = this.list[i];
				if (obj._id == id) {
					if (obj.count - 0 < obj.stock - 0) {
						~~obj.count++;
						this.updateCount({ _id: id, count: obj.count });
						// this.$emit('getShopAartById', this.list);
					} else {
						uni.showToast({
							title: '当前库存不足'
						});
					}
					break;
				}
			}
			this.total();
		},
		inp(index) {
			//商品选择
			for (var i = 0; i < this.list.length; i++) {
				if (this.list[i]._id == index) {
					this.list[i].check = !this.list[i].check;
					if (this.list[i].check == false) {
						//如果有条数据没选择，就取消全选
						this.flag = false;
						this.num -= 1;
						this.money -= this.list[i].price * this.list[i].count;
						this.$emit('getShopAartById', this.list);
					} else {
						this.num += 1;
						this.money += this.list[i].price * this.list[i].count;
						if (this.num == this.list.length) {
							//如果全部选中了
							this.flag = true;
						}
						this.$emit('getShopAartById', this.list);
					}
				}
			}
		},
		removeM(id) {
			//商品删除
			var _this = this;
			for (var i = 0; i < this.list.length; i++) {
				var obj = this.list[i];
				if (obj._id == id) {
					uni.showModal({
						title: '',
						content: '确定删除,不再看看吗',
						confirmText: '确定',
						success: function(res) {
							if (res.confirm) {
								_this.list.splice(i, 1);
								_this.$emit('getShopAartById', _this.list);
								if (obj.check) {
									//如果选中状态下删除
									_this.num--;
									_this.total();
								}
								if (_this.num == 0) {
									//删除后还需要判断下当前的num是否跟当前的数据长度相同，是否显示全选
									_this.flag = false;
								} else {
									if (_this.num == _this.list.length) {
										_this.flag = true;
									}
								}
							}
						}
					});
					break;
				}
			}
		},
		total() {
			//计算总价---只计算选中的；
			this.money = 0;
			for (var i = 0; i < this.list.length; i++) {
				if (this.list[i].check == true) {
					this.money += this.list[i].price * this.list[i].count;
				}
			}
		},
		goPay() {
			//去结算
			const arry = this.list.filter(function(item) {
				//结算过虐选中的数据，arry这个数组就是最后你要提交的数据
				return item.check === true;
			});
			//点击去结算的时候，讲所选的数据保存在本地
			try {
			    uni.setStorageSync('arry', arry);
			} catch (e) {
			    // error
			}
			// console.log('arry: ' + JSON.stringify(arry));
			
			//点击结算跳到订单结算页面
			uni.navigateTo({
				url: '/pages/PaymentOfAnOrder/PaymentOfAnOrder'
			});
			
			if (arry.length == 0) {
				uni.showToast({
					title: '您还没有选中要结算的商品',
					icon: 'none'
				});
				return;
			}
		}
	},
	components: {
		uniSwipeAction
	}
};
</script>
<style scoped>
/*
		购物车---这里容器样式不要放组件里，不然侧滑官方自带的样式不会生效;
		侧滑按钮样式，高度跟容器保持一致就行这里是160,宽自己根据项目来
	*/

.shopCar >>> .uni-swipe-action__container {
	position: relative;
	background-color: #fff;
	width: 200%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	transition: transform 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
	height: 160rpx !important;
	margin-top: 40rpx !important;
}

/* 删除按钮的样式 */
.shopCar >>> .uni-swipe-action--btn {
	padding: 0 32upx;
	color: #fff;
	display: inline-flex;
	text-align: center;
	flex-direction: row;
	align-items: center;
	width: 200rpx !important;
	height: 160rpx !important;
	background: rgba(233, 82, 66, 1) !important;
	border-radius: 32rpx 0px 0px 32rpx;
	padding: 0rpx !important;
	font-weight: bold !important;
	font-size: 32rpx !important;
	padding-left: 48rpx !important;
	box-sizing: border-box;
}

.contBox {
	width: 100%;
	height: 160rpx;
	position: relative;
	z-index: 1;
	box-sizing: border-box;
	background: rgba(255, 255, 255, 1);
	border-radius: 16rpx;
}
/* input选项 */
.circleBox {
	width: 88rpx;
	height: 100%;
	display: flex;
	align-items: center;
	position: absolute;
	top: 0rpx;
	left: 80rpx;
	z-index: 2;
}
.circle {
	width: 48rpx;
	height: 48rpx;
}
/* 主体内容 */
.goodBox {
	width: 670rpx;
	height: 160rpx;
	padding-left: 112rpx;
	box-sizing: border-box;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #f5f5f5;
	margin: 0 auto;
	border-radius: 16rpx;
}

/* 加减模块 */
.countBox {
	width: 200rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	margin-right: 32rpx;
}
.countBox image {
	width: 48rpx;
	height: 48rpx;
}
.sign{
	margin-right: 20rpx;
}
.sign,
.add {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.count {
	width: 40px;
	text-align: center;
	font-size: 28rpx;
}
/* 加减模块结束 */
/* 主体内容结束 */

/* 底部样式 */
.allBox {
	width: 100%;
	height: 98upx;
	position: fixed;
	bottom: 0upx;
	left: 0upx;
	display: flex;
	z-index: 1001;
	border: 1rpx solid #e0e0e0;
}
.shopprice{
		font-size: 12rpx;
		color: #999999;
}
.shoptitle {
	width: 160upx;
	
	/* border: 1px solid #007aff; */
	text-overflow: ellipsis;
	overflow: hidden;
	font-size: 12rpx;
	white-space: nowrap;
}
.allBox image {
	width: 44upx;
	height: 44upx;
	margin-right: 12upx;
	vertical-align: middle;
	margin-top: -8upx;
}
.allBox > view:nth-of-type(1) {
	flex-grow: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 32upx;
	font-weight: 300;
	color: rgba(20, 23, 30, 1);
	padding: 0upx 46upx 0upx 42upx;
	background: white;
}
.allBox > view:nth-of-type(2) {
	width: 260upx;
	height: 100%;
	line-height: 98upx;
	text-align: center;
	color: white;
	font-size: 32upx;
	font-weight: bold;
	background: #cc3347;
}
.total {
	font-weight: bold !important;
	color: #cc3374 !important;
}
</style>
