<template>
	<div>
		<view class="content"><WaterFull ref="waterFull" /></view>
	</div>
</template>

<script>
import WaterFull from '../../components/WaterFull/WaterFull.vue';
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	components: {
		WaterFull
	},
	methods: {
		giveData(arr) {
			let that = this;
			that.$refs.waterFull.handleLoad(arr);
		}
	},
	mounted() {
		let that = this;
		let arr = [
			{
				cover: '../../static/timg.jpeg',
				id: '1084',
				isLiked: '0',
				likeCount: 0,
				title: '拉布拉多',
				money: '999'
			},
			{
				cover: '../../static/timg.jpeg',
				id: '1084',
				isLiked: '0',
				likeCount: 0,
				title: '拉布拉多',
				money: '999'
			},
			{
				cover: '../../static/timg.jpeg',
				id: '1084',
				isLiked: '0',
				likeCount: 0,
				money: '999',
				title: '拉布拉多'
			},
			{
				cover: '../../static/timg.jpeg',
				id: '1084',
				isLiked: '0',
				likeCount: 0,
				title: '拉布拉多',
				money: '999'
			},
			{
				cover: '../../static/timg.jpeg',
				id: '1084',
				isLiked: '0',
				likeCount: 0,
				title: '拉布拉多',
				money: '999'
			},
			{
				cover: '../../static/timg.jpeg',
				id: '1084',
				isLiked: '0',
				likeCount: 0,
				title: '拉布拉多',
				money: '999'
			}
		];
		that.giveData(arr);
	}
};
</script>

<style></style>
