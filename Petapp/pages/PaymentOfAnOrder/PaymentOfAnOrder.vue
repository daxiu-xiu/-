<template>
	<view>
		<view class="oneOrder" v-for="(item, index) in order" :key="index">
			<view class="" style="color: #0081FF;margin-bottom: 30rpx;">
				宠可爱旗舰店
			</view>
			<view style="display: flex;">
				<image :src="`http://localhost:3000/upload/images/${item.img}`" style="width: 130rpx;height: 130rpx;margin-right: 30rpx;" mode=""></image>
				<view style="display: flex;flex-direction: column;">
					<text>{{ item.name }}</text>
					<text>x{{ item.count }}</text>
				</view>
			</view>
			<view style="display: flex;justify-content: flex-end;">
				<text>
					金额小计:
					<text style="color: #CC3347;">¥{{ item.count * item.price }}</text>
				</text>
			</view>
		</view>
		<view
			style="color: #D5102C;width: 100%;
		text-align: right;font-size: 36rpx;margin-bottom: 20rpx;"
		>
			合计金额：¥{{ allmoney }}元
		</view>
		<view style="display: flex;width: 100%;text-align: right;"><button @click="btn" class="btn">填写收货信息结算</button></view>
		<view v-if="target == true" class="POO_fotter">
			<view class="">
				<text class='xinxi'>收货人：</text>
				<input type="text" value="" class="siteIup" v-model="consignee" />
			</view>
			<view class="">
				<text class='xinxi'>收货地址：</text>
				<input type="text" value="" class="siteIup" v-model="profile" />
			</view>
			<view class="">
				<text class='xinxi'>收货电话：</text>
				<input type="text" value="" class="siteIup" v-model="phone" />
			</view>
			<view  style="text-align: right;width: 100%;margin-top: 30rpx;">
				<button class='orderRefer' @click="offorder">确认提交</button>
				<button class='orderRefer' @click='indent'>取消</button>
			</view>
			
		</view>
	</view>
</template>

<script>
//引入仓库，状态机
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('pet');
export default {
	data() {
		return {
			order: [],
			target: false,
			//总金额
			allmoney: 0,
			//收货电话
			phone: '',
			//收货地址
			profile: '',
			//收货人
			consignee: ''
		};
	},
	onLoad() {
		try {
			this.order = uni.getStorageSync('arry');
		} catch (e) {}
		//总金额
		for (var i = 0; i < this.order.length; i++) {
			this.allmoney += this.order[i].price * this.order[i].count;
		}
	},
	computed: {},
	mounted() {},
	methods: {
		...mapActions(['createOrder']),
		//点击结算出现地址兰
		btn() {
			this.target = true;
		},
		//订单提交事件
		indent(){
			this.order.forEach(item => {
				//电话号码
				item.phone=this.phone,
				//收货地址
				item.profile=this.profile,
				//收货人
				item.consignee=this.consignee
			})
			this.createOrder(this.order)
			uni.showModal({
			    title: '成功',
			    content: '支付成功！！谢谢',
			})
			uni.switchTab({
				url: '/pages/ShoppingCart/ShoppingCart'
			});
			
		},
		//点击取消事件回到购物车
		offorder(){
			uni.switchTab({
				url: '/pages/ShoppingCart/ShoppingCart'
			});
		}
		
		
	}
};
</script>

<style scoped>
	.xinxi{
		color: #999999;
	}
	.orderRefer{
		background-color: #f37b1d;
		color: #ffffff;
		width: 260rpx;
		height: 60rpx;
		font-size: 26rpx;
		/* background-color: #F37B1D; */
		/* padding: 6rpx; */
		/* margin: 10rpx; */
		/* color: #F8F8F8; */
		margin-top: 30rpx;
		/* border-radius: 6rpx; */
	}
.POO_fotter {
	padding: 40rpx;
	position: fixed;
	width: 100%;
	bottom: 0;
	border-radius: 30rpx;
	background-color: #fafafa;
	box-sizing: border-box;
	
}
.oneOrder {
	padding: 20rpx;
	background-color: #fafafa;
	margin: 20rpx 0rpx;
}
.siteIup {
	border: 1px solid #F37B1D;
	height: 60rpx;
}
.btn {
	background-color: #f37b1d;
	color: #ffffff;
	width: 260rpx;
	height: 60rpx;
	font-size: 26rpx;
}
</style>
