<template>
	<div class="homePageContent">
		<view class="page-section-spacing">
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1500">
				<swiper-item v-for="(item, index) in homeSlide" :key="index">
					<image style="width:100%" :src="item" /></swiper-item>
			</swiper>
		</view>

		<navigator class="searchbtn" url='/pages/Search/Search'>
			<text>输入关键字搜索</text>
			<icon type="search" size="20" class="searchicon" />
		</navigator>

		<!-- 萌宠，医疗等分类导航 -->
		<div class="classifyNav">
			
			<navigator url="../../pages/petList/petList">
				<div class="smallNav" hover-class="none">
					<image style="width:30px;height:28px; margin-top: 3px;" src="../../static/chongwu-.png" />
					<text style="color:#d5102c">萌宠</text>
				</div>
			</navigator>
			<navigator url="">
				<div class="smallNav" hover-class="none">
					<image style="width:30px;height:28px; margin-top: 3px;" src="../../static/meirong.png" />
					<text style="color:#d5102c">美容</text>
				</div>
			</navigator>
			<navigator url="" hover-class="none">
				<div class="smallNav">
					<image style="width:30px;height:28px; margin-top: 3px;" src="../../static/yongpin-.png" />
					<text style="color:#d5102c">用品</text>
				</div>
			</navigator>
			<navigator url="" hover-class="none">
				<div class="smallNav">
					<image style="width:30px;height:28px; margin-top: 3px;" src="../../static/yiliao-.png" />
					<text style="color:#d5102c">医疗</text>
				</div>
			</navigator>
			<navigator url="/pages/ShopList/ShopList" hover-class="none">
				<div class="smallNav">
					<image style="width:30px;height:28px; margin-top: 3px;" src="../../static/dianpu.png" />
					<text style="color:#d5102c">宠店</text>
				</div>
			</navigator>
		</div>
		<!-- 热卖宠物 -->

		<div class="list">
			<petList title="宠物快抢"></petList>
			<petList title="火爆团购"></petList>
		</div>
		<!-- 热卖宠物店和店里的类标 -->
		<div>
			<div class="titel">
				<div class="titelleft">
					<image style="width: 30px;height: 30px;" src="../../static/timg-3.gif" mode=""></image>
					<text style="color: #D5102C;font-size: 20px;margin-right: 8px;">金牌宠物店</text>
				</div>
				<navigator url="/pages/ShopList/ShopList"><text style="font-size: 14px;color:#F0AD4E ;">更多好店></text></navigator>
			</div>
			<onepetShop :shopData='shopData'></onepetShop>
		</div>
		<!-- 首页的宠物列表 -->
		<div><morePetList1></morePetList1></div>
	</div>
</template>

<script>
//引入团购或者抢购的组件
import petList from '../../components/petList/petList.vue';
//引入商店组件
import onepetShop from '../../components/onepetShop/onepetShop.vue';
//引入宠物列表组件
import morePetList1 from '../../components/morePetList/morePetList1.vue';
//引入状态机仓库
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "pet"
);
export default {
	components: {
		petList,
		onepetShop,
		morePetList1
	},
	data() {
		return {
			homeSlide: [
				'../../static/u=3401716132,3295503208&fm=26&gp=0.jpg',
				'../../static/u=2381434214,3086830086&fm=26&gp=0.jpg',
				'../../static/u=1522715513,3152898002&fm=26&gp=0.jpg'
			],
			
		};
	},
	mounted() {
		this.getshop();
		this.getpet();
		this.getuser();
	},
	methods: {
		...mapActions(['getshop','getpet','getuser'])
	},
	computed:{
		...mapState(['shopData'])
	}
};
</script>

<style scoped>
.homePageContent {
	display: flex;
	flex-direction: column;
}

.searchbtn {
	position: absolute;
	z-index: 5;
	top: 18px;
	width: 100%;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.3);
	border-radius: 10px;
	color: #616066;
	font-size: 16px;
	height: 40px;
	line-height: 40px;
	text-align: center;
}

.searchicon {
	position: absolute;
	top: 10px;
	left: 100px;
}

.classifyNav {
	border: 1px solid white;
	padding: 30px 0px;
	display: flex;
	justify-content: space-evenly;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}

.smallNav {
	display: flex;
	flex-direction: column;
	justify-content: center;

	align-items: center;
	/* border: 1px solid black; */
	background-color: rgba(220, 20, 60, 0.2);
	border-radius: 30%;

	width: 55px;
}
/* 金牌宠物店 */
.titelleft {
	display: flex;
	align-items: center;
	padding: 0px 16px;
}
.titel {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 30rpx 0rpx;
}
</style>
