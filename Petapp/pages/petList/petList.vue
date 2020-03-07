<template>
	<view>
		<view class="paixu">
			<text class="paixuText" @click="composite">综合排序</text>
			<text class="paixuText" @click="pricepaixu">价格排序</text>
		</view>
		<view class="petlistContent">
			<view v-for="(item, index) in pullupData.petDataall" :key="index">
				<Onepet :onepet="item"></Onepet>
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
export default {
	data() {
		return {
			pricetarget: false
		};
	},
	components: {
		Onepet
	},
	mounted() {
		this.getpetall();
	},
	methods: {
		//一进入页面就是请求所有宠物数据
		...mapActions(['getpetall']),
		//点击切换事件
		pricepaixu() {
			this.pricetarget = !this.pricetarget;
			//如果是true的话，就是价格从高到低（降序）
			if (this.pricetarget == true) {
				this.pullupData.target = 'descending';
				this.pullupData.start = 0;
				this.pullupData.count = 18;
				this.pullupData.total = 0;
				this.pullupData.petDataall = [];
				this.getpetall();
			}
			//如果是true的话，就是价格从低到高（升序）
			else {
				this.pullupData.start = 0;
				this.pullupData.count = 18;
				this.pullupData.total = 0;
				this.pullupData.petDataall = [];
				this.pullupData.target = 'ascending';
				this.getpetall();
			}
		},
		//点击综合排序事件
		composite() {
			this.pullupData.start = 0;
			this.pullupData.count = 18;
			this.pullupData.total = 0;
			this.pullupData.petDataall = [];
			this.pullupData.target = 'composite';
			this.getpetall();
		}
	},
	//上拉加载事件
	onReachBottom() {
		this.pullupData.start = this.pullupData.start - 0 + this.pullupData.count - 0;
		if (this.pullupData.petDataall.length < this.pullupData.total) {
			uni.showLoading({
				title: '加载中'
			});
			this.getpetall();
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
		} else {
			uni.showLoading({
				title: '没有更多了'
			});
			this.getpetall();
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
		}
	},
	computed: {
		...mapState(['pullupData'])
	}
};
</script>

<style scoped>
.paixu {
	display: flex;
}
.paixuText {
	width: 50%;
	text-align: center;
	background-color: #d5102c;
	color: #f5f8f9;
	text-decoration: underline;
}
.petlistContent {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style>
