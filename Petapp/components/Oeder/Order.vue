<template>
	<view class="ordercontent">
		<view style="display: flex;justify-content: space-between;margin: 16rpx 0rpx;">
			<text style="font-size: 32rpx;color: #D5102C;">{{oneOrder.shopId.name}}</text>
			<text>交易成功</text>
		</view>
		<view class="ordercontentOne">
			<view style="display: flex;">
				<navigator :url="`../../pages/PetDetails/PetDetails?shop_id=${oneOrder.shopId._id}&pet_id=${oneOrder.petId}`">		
					<image style="width:160rpx;height: 160rpx;margin-right: 14rpx;"
					:src="`http://localhost:3000/upload/images/${oneOrder.img}`"  alt="" />		
				</navigator>
				
				<view class="ondertext">
					<text>{{oneOrder.name}}</text>
					<text></text>
					<text>数量{{oneOrder.count}}</text>
				</view>
			</view>
			<text class="">单价¥{{oneOrder.price}}</text>
		</view>
		<view style="display: flex;justify-content: space-between;margin-top: 16rpx;">
			<view style="display: flex;align-items: center;">
				<icon type="cancel" size="18" />
				<text style="color: #D5102C;" @click='revOneOrder'>删除订单</text>
			</view>

			<text style="color: #616066;">
				共{{oneOrder.count}}件商品，合计：
				<text style="color: #D5102C;">¥{{oneOrder.count*oneOrder.price}}</text>
				元
			</text>
		</view>
	</view>
</template>

<script>
	
	//引入状态机
	import { createNamespacedHelpers } from 'vuex';
	const { mapActions, mapState, mapMutations } = createNamespacedHelpers('pet');
	
	
export default {
	props: {
		oneOrder: {
			type:Object
		}
	},
	data() {
		return {};
	},
	methods:{
		...mapActions(['revOrder']),
		// 用户点击删除事件
		revOneOrder(){
			this.revOrder(this.oneOrder._id)
		}
	}
};
</script>

<style scoped>
.ordercontentOne {
	display: flex;
	justify-content: space-between;
}
.ordercontent {
	padding: 10rpx 30rpx;
	margin-bottom: 30rpx;
	background-color: rgba(220, 20, 60, 0.1);
	color: #616066;
	font-size: 28rpx;
	border-radius: 20rpx;
}
.ondertext {
	display: flex;
	flex-direction: column;
}
</style>
