<template>
	<view>
		<view class="titel">
			<div class="titelleft">
				<image style="width: 40px;height: 40px;" src="../../static/timg.gif" mode=""></image>
				<text style="color: #D5102C;font-size: 20px;margin-right: 8px;">宠物列表</text>
			</div>
			 <navigator url="../../pages/petList/petList"><text style="font-size: 14px;color:#F0AD4E ;">更多宠物></text></navigator>
		</view>
		<view style="background-color: rgba(220, 20, 60, 0.1);">
			<view style="display: flex; flex-wrap: wrap;padding:4rpx 40rpx;">
				<view class="" v-for="(item,index) in petData" :key='index'>
					<Onepet :onepet='item'></Onepet>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import Onepet from '../onepet/Onepet.vue';
// 首页宠物列表组件

//引入状态机仓库
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('pet');
export default {
	components: {
		Onepet
	},
	data() {
		return {};
	},
	computed:{
		...mapState(['petData'])
	}
};
</script>

<style>
.titelleft {
	display: flex;
	align-items: center;
	padding: 0px 16px;
}
.titel {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 30rpx;
	margin-bottom: 10rpx;
}
</style>
