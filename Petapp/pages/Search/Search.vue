<template>
	<view>
		<view class="searchTopBox">
			<view class="searchBoxRadius">
				<view class="grace-search-icon searchBoxIcon"></view>
				<input class="searchBoxIpt" type="search" placeholder="搜索内容" v-model="value" />
			</view>
			<!-- 选择搜索 -->
			<view class="searchChoose">
				<text class="searchText" @click="searchpet">搜索萌宠</text>
				<text class="searchText" @click="searchshop">搜索萌店</text>
			</view>
			<!-- 渲染宠物 -->
			<view v-if="target == 'pets'" class="">
				<view v-for="(item, index) in searchData" :key="index">
				<text></text>
					<Onepet :onepet='item'>{{item.age}}</Onepet>
				</view>
		  </view>
		  <!-- 渲染列表 -->
		  <view class="" v-else>
		  	<view class="" v-for="(item, index) in searchData" :key="index" >
		  		<onepetShop :shopData='item'></onepetShop>
		  	</view>
		  </view>
		</view>
	</view>
</template>
<!-- 搜索 -->
<script>
//引入状态机仓库
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('pet');
//引入一个宠物
import Onepet from '../../components/onepet/Onepet.vue';
//引入商店组件
import onepetShop from '../../components/onepetShop/onepetShop.vue';
export default {
	data() {
		return {
			value: '',
			target: 'pets'
		};
	},
	components: {
		Onepet,
		onepetShop
	},
	methods: {
		//点击搜索萌宠事件
		searchpet() {
			this.target = 'pets';
			this.search({ value: this.value, target: this.target });
			// console.log(this.searchData)
		},
		//点击搜索店铺事件
		searchshop() {
			this.target = 'shops';
			this.search({ value: this.value, target: this.target });
			// console.log(this.searchData)
		},
		...mapActions(['search'])
	},
	computed: {
		...mapState(['searchData'])
	}
};
</script>
<style>
.searchChoose {
	display: flex;
	background-color: #d5102c;
	padding: 20rpx 0rpx;
}
.searchText {
	width: 50%;
	text-align: center;
	color: #fafafa;
	text-decoration: underline;
}
.swiper {
	display: flex;
	justify-content: space-between;
}
.searchTopBox {
	width: 100%;
	background-color: #d5102c;
	height: 100upx;
	box-sizing: border-box;
	padding-top: 15upx;
}
.searchBoxIcon {
	font-size: 40upx;
	margin-top: 20upx;
	margin-left: 20upx;
	float: left;
}
.searchBoxIpt {
	height: 70upx;
	line-height: 70upx;
	margin-left: 20upx;
	float: left;
}

.searchBoxRadius {
	width: 90%;
	height: 70upx;
	background-color: #fff;
	margin-left: 5%;
	overflow: hidden;
	border-radius: 35upx;
}
</style>
