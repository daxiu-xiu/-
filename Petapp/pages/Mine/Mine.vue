<template>
	<view class="center">
		<view class="center_top"><view class="mask"></view></view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header"></view>
					<text>昵称：南生</text>
					<image src="../../static/setting.png" mode=""></image>
				</view>
				<view class="order_status">
					<view class="status">
						<image class="icon" src="../../static/one.png" mode="aspectFill"></image>
						<text>待发货</text>
					</view>

					<view class="status">
						<image class="icon" src="../../static/2.png" mode="aspectFill"></image>
						<text>待收货</text>
					</view>
					<view class="status">
						<image class="icon" src="../../static/3.png" mode="aspectFill"></image>
						<text>待评价</text>
					</view>
					<view class="status">
						<navigator url="../MineOrder/MineOrder"><image class="icon" src="../../static/4.png" mode="aspectFill"></image></navigator>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<view class="baiban"></view>
			<view class="center_menu">
				<view class="menu_item" v-for="(item, index) in menus" :key="index">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menus: [
				{
					name: '我的收藏',
					icon: '../../static/5.png',
					key: 1
				},
				{
					name: '地址管理',
					icon: '../../static/6.png',
					key: 2
				},
				{
					name: '尺码对照表',
					icon: '../../static/7.png',
					key: 3
				},
				{
					name: '帮助中心',
					icon: '../../static/8.png',
					key: 4
				},
				{
					name: '意见反馈',
					icon: '../../static/9.png',
					key: 5
				},
				{
					name: '关于我们',
					icon: '../../static/10.png',
					key: 6
				}
			]
		};
	},
	methods: {},
	computed: {}
};
</script>

<style lang="scss">
page {
	height: 100%;
}

.profily,
.profily_header {
	border-radius: 8px;
}

.center {
	height: 100%;

	&_top {
		height: 18%;
		background: url('../../static/1533304071-cCJYXrkAQq.jpg') no-repeat 0% 50%;
		background-size: cover;

		// background: #E6E6E6;
		.mask {
			background: rgba(0, 0, 0, 0.4);
			height: 100%;
		}
	}

	&_box_bg {
		background: #f9f9f9;
		position: relative;

		.profily {
			position: absolute;
			width: 90%;
			// border:1px solid #F7F7F7;
			margin: 0 auto;
			top: -100upx;
			left: 5%;
			background: #fefefe;
			padding: 35upx;
			box-sizing: border-box;
			box-shadow: 0px 2px 5px #ededed;
		}
	}
}

.base {
	display: flex;
	align-items: center;
	border-bottom: 2px solid #f6f6f6;
	padding-bottom: 35upx;
	position: relative;
	.profily_header {
		height: 120upx;
		width: 120upx;
		background-image: url(../../static/1533304071-cCJYXrkAQq.jpg);
		// background-image: url('../../static/header.jpg');
		background-size: 100%;
	}

	text {
		margin-left: 20px;
		font-size: 30upx;
	}

	image {
		position: absolute;
		height: 40upx;
		width: 40upx;
		right: 0px;
		top: 0px;
	}
}

.order_status {
	display: flex;
	justify-content: space-between;
	margin-top: 35upx;

	.status {
		width: 140upx;
		font-size: 24upx;
		text-align: center;
		letter-spacing: 0.5px;
		display: flex;
		flex-direction: column;
		.icon {
			width: 50upx;
			height: 50upx;
			margin: 0 auto;
			margin-bottom: 5px;
		}
	}
}

.baiban {
	background: #fefefe;
	height: 300upx;
}

.center_menu {
	width: 100%;
	display: inline-block;

	.menu_item {
		font-size: 28upx;
		letter-spacing: 1px;
		padding: 14px 5%;
		background: #fefefe;
		overflow: hidden;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		border-bottom: 1px solid #efefef;

		&:hover {
			background: #f6f6f6 !important;
		}

		&::after {
			content: '';
			width: 30upx;
			height: 30upx;
			position: absolute;
			right: 5%;
			background: url('../../static/right.png') no-repeat;
			background-size: 100%;
		}

		text:nth-of-type(1) {
			margin-left: 10px;
		}

		image {
			width: 40upx;
			height: 40upx;
		}

		&:nth-of-type(4) {
			margin-top: 10px;
		}
	}
}
</style>
