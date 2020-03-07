<template>
	<div class="petlistContent">
		<div class="titel">
			<div class="titelleft">
				<image style="width: 30px;height: 30px;" src="../../static/timg-1.gif" mode=""></image>
				<text style="color: #D5102C;font-size: 20px;margin-right: 8px;">{{ title }}</text>

				<!-- 倒计时 -->
				<!-- 不显示天数 -->
				<uni-countdown :show-day="false" :hour="12" :minute="12" :second="12" color="#FFFFFF" background-color="#00B26A" border-color="#00B26A"></uni-countdown>
			</div>
			<navigator url="/pages/petList/petList"><text style="font-size: 14px;color:#F0AD4E ;">更多宠物抢购中></text></navigator>
		</div>
		<view style="background-color: rgba(220, 20, 60, 0.1);margin-left: 26rpx;padding: 6rpx;">
		<scroll-view scroll-x="true" scroll-left="120">
			<div style="display: flex;">
				<view v-for="(item,index) in  petData" :key='index' class="">
					<Onepet :onepet='item'></Onepet>
				</view>
			</div>
		</scroll-view>
		</view>
	</div>
</template>

<script>
	//引入一个动物组件
import Onepet from '../onepet/Onepet.vue';
//引入倒计时
import uniCountdown from '../uni-countdown/uni-countdown.vue';
//引入状态机仓库
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('pet');
export default {
	components: {
		Onepet,
		uniCountdown
	},
	props: {
		title: {
			type: String
		}
	},
	computed:{
		...mapState(['petData'])
	}
};
</script>

<style scoped>
.titelleft {
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	padding: 0px 16px;
}
.titel {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.petlistContent {
	margin: 14px 0px;
	
}
</style>
