<template>
	<view>
		<view v-for="(item,index) in shopDataAndpet" :key="index">
			<onepetShop :shopData='item'></onepetShop>
		</view>
	</view>
</template>

<script>
//商店列表
//	引入一个店铺的列表
import onepetShop from '../../components/onepetShop/onepetShop.vue';

//引入状态机仓库
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('pet');
export default {
	components: {
		onepetShop
	},
	data() {
		return {};
	},
	methods: {},
	computed:{
		...mapState(['shopDataAndpet'])
	}
};
</script>

<style></style>
