<template>
	<view>
		<view v-for="(item, index) in userOrder" :key="index"><Order :oneOrder='item'></Order></view>
	</view>
</template>

<script>
//引入一个订单的组件
import Order from '../../components/Oeder/Order.vue';
//引入状态机
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('pet');

export default {
	components: {
		Order
	},
	data() {
		return {};
	},
	mounted() {
		this.getOrder();
	},
	methods: {
		...mapActions(['getOrder','revOrder'])
	},
	computed: {
		...mapState(['userOrder'])
	}
};
</script>

<style></style>
