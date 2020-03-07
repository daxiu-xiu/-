<template>
	<view>
		<image style="width: 100%;height: 320rpx;" src="../../static/20160818212935_QnXrW.jpeg" mode=""></image>
		<view class="shopcontent">
			<view class="titel_img">
				<image style="width: 50rpx;height: 50rpx;" src="../../static/dianpu.png" mode=""></image>
				<text class="OSDtitle">{{onshopPets.shop[0].name}}</text>
			</view>

			<text class="shopReferral">店铺地址:{{onshopPets.shop[0].address}}</text>
			<text class="shopReferral">
				店铺介绍：{{onshopPets.shop[0].desc}} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste reiciendis sed neque alias hic vero labore quisquam asperiores beatae nulla natus cumque
				eum unde non adipisci odio nostrum distinctio temporibus.
			</text>
			<view class="list">
				<text class="listTitle">商品列表</text>
				
			</view>
			<view class="oneShopList">
				<view v-for="(item, index) in onshopPets.data" :key="index"  style="margin-bottom: 30rpx;">
					<Onepet :onepet="item" :shopid='id'></Onepet>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
//引入状态机仓库
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('pet');
//引入一个宠物
import Onepet from '../../components/onepet/Onepet.vue';

// 一个店铺的明细
export default {
	data() {
		return {
			id: '',
		};
	},
	components:{
		Onepet
	},
	onLoad: function(option) {
		console.log(option._id);
		this.id = option._id;
	},
	mounted() {
		this.getpetById(this.id)
	},
	methods: {
		...mapActions(['getpetById'])
	},
	computed: {
		...mapState(['onshopPets'])
	}
};
</script>

<style scoped>
.shopcontent {
	padding: 30rpx;
}
.OSDtitle {
	color: #d5102c;
	font-size: 36rpx;
	text-decoration: underline;
	padding-bottom: 6rpx;
	text-underline-color: #4cd964;
}
.titel_img {
	margin-bottom: 20rpx;
}
.list {
	margin: 20rpx 0rpx;
	padding-left: 20rpx;
	border-left: 8rpx solid #ff4500;
}
.shopReferral {
	color: #999999;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: 30rpx;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
.oneShopList{
	display: flex;
	flex-wrap: wrap;
}
</style>
