<template>
	<div style="margin-bottom: 30rpx;">
		<view>
			<!-- <view class="title" style="background:url('../../static/u=1088924811,2439722784&fm=26&gp=0.jpg')"> -->
			<!-- 点击店铺的标题。则到该店铺的页面 -->
			<view class='title' style="background-color: #fff5ee;">
				<navigator :url="`/pages/oneShopDetail/oneShopDetail?_id=${shopData.shop._id}`">
				<text style="font-size: 40rpx;font-weight: bold;color: #FF9933;text-decoration: underline;">
				{{ shopData.shop.name }}旗舰店</text>
				</navigator>
				<image style="width: 70rpx;height: 70rpx;margin-bottom: 30rpx;" src="../../static/huangguan-copy.png" mode="" />
			</view>

			<view style="background-color: rgba(220, 20, 60, 0.1)">
				<scroll-view scroll-x="true" scroll-left="120">
					<view style="display: flex;">
						<view v-for="(item, index) in shopData.pet" :key="index" 
						style="background-color: rgba(255, 255, 255, 0.3);">
							<Onepet :onepet="item" :shopid='shopData.shop._id'></Onepet></view>
					</view>
				</scroll-view>
			</view>
		</view>
	</div>
</template>

<script>
// 一个店铺的列表
//引入状态机仓库
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('pet');
//引入一个宠物
import Onepet from '../onepet/Onepet.vue';
export default {
	props: {
		shopData: {
			type: Object
		}
	},
	components: {
		Onepet,
	},
	mounted() {},
	methods: {},
	computed: {
	}
};
</script>

<style scoped>
.title {
	display: flex;
	align-items: center;
}
.onepetShopContent {
}
</style>
