<template>
	<div>
		<div class="onepetContent">
			<!-- :url="`/pages/oneShopDetail/oneShopDetail?_id=${shopData.shop._id}`" -->
			<!-- 跳转到宠物详情 -->
			<navigator :url="`../../pages/PetDetails/PetDetails?shop_id=${shopid}&pet_id=${onepet._id}`">
				<img class="onepetImg" :src="`http://localhost:3000/upload/images/${onepet.imageName[0]}`" alt />
			</navigator>
			<text class="title">{{ onepet.name }}</text>
			<text @click="call">
				售价：
				<text class="price">¥{{ onepet.price }}</text>
			</text>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		onepet: {
			type: Object
		},
		shopid: {
			type: String,
			default: ''
		}
	},
	methods: {
		call() {
			console.log(this.shopid);
		}
	}
};
</script>

<style scoped>
.onepetImg {
	width: 100px;
	height: 100px;
}

.onepetContent {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 110px;
	font-size: 22rpx;
}

.price {
	color: #d5102c;
}

.title {
	width: 100%;
	text-align: center;
	margin: 6px;
	color: #f0ad4e;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 26rpx;
}
</style>
