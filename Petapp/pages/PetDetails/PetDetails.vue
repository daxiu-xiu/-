<template>
	<view class="petdetalContent">
		<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1500">
			<swiper-item v-for="(item, index) in onepetData.imageName" :key="index">
				<image style="width:100%" :src="`http://localhost:3000/upload/images/${item}`" />
			</swiper-item>
		</swiper>
		<!-- :src="`http://localhost:3000/upload/images/${onepet.imageName[0]}`" -->
		<view style="padding: 0rpx 30rpx;">
			<view style="display: flex;align-items: center; margin-bottom: 16rpx;">
				<text class="price">¥{{ onepetData.price }}元</text>
				<text class="jifen">购买得积分</text>
				<text class="jifen">火热抢购中</text>
			</view>
			<view>
				<text class="jifen">金币抵扣</text>
				<text class="jifen">限购</text>
			</view>
			<view style="margin: 30rpx 0rpx;">
				<text class="hot">热卖中</text>
				<text>{{ onepetData.name }}{{ onepetData.age }}{{ onepetData.color }}{{ onepetData.gender }}</text>
			</view>
			<!-- 推荐 -->
			<view style="display: flex;">
				<view class="tuijian">
					<image src="../../static/tuijian.png" class="imgicon" mode=""></image>
					<text>338人推荐</text>
				</view>
				<view class="tuijian">
					<image src="../../static/qun.png" class="imgicon" mode=""></image>
					<text>帮我选</text>
				</view>
			</view>
			<!-- 发货 -->
			<view class="fahuo">
				<text>发货：</text>
				<image src="../../static/6.png" class="imgicon" mode=""></image>
				<text>浙江发货</text>
				<text>运费：00.00元</text>
			</view>
			<view class="fahuo">
				<text>保障：</text>
				<image src="../../static/baozhang.png" mode="" class="imgicon"></image>
				<text>假一赔四</text>
				<text>七天无理由退货</text>
			</view>
			<!-- 商品介绍 -->
			<view class="xaingqing">
				<text>
					详情：Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa consequatur ipsam libero corrupti dolores
					sapiente dolor aut cum corporis facere labore
					possimus perferendis repellendus unde vel vero similique in aperiam!
				</text>
			</view>
		</view>
		<!-- 底部固定 -->
		<view class="fotterAll">
			<!-- 底部弹窗 -->
			<view class="wgctc" v-if="target == true">
				<view style="margin-bottom: 20rpx;color: #F0AD4E;font-weight: bold;">{{ onepetData.name }}:</view>
				<text style="color: #F0AD4E;">选择商品数量</text>
				<view style="display: flex;justify-content: center;margin-top: 20rpx;margin-right: 20rpx;">
					<button class="btn" size="mini" @click="add">+</button>
					<text class="gwcinput">{{count}}</text>
					<!-- <input type="text" value="" class="gwcinput" v-model="count" /> -->
					<button class="btn" size="mini" @click="reduce">-</button>
				</view>
				<!-- 确认加入购物车事件 -->
				<view class="" style="width: auto;text-align: center;">
					<button class="optIn" size="mini" @click="optInBtn">确认</button>
				</view>

			</view>

			<!-- 底部图标 -->
			<view class="fotter">
				<view class="fotterleft">
					<view class="fotterleft_icon">
						<image class="imgicon" src="../../static/dianpu.png" mode=""></image>

						<text>店铺</text>
					</view>
					<view class="fotterleft_icon">
						<image class="imgicon" src="../../static/serve.png" mode=""></image>

						<text>客服</text>
					</view>
					<view class="fotterleft_icon">
						<image class="imgicon" src="../../static/shouchang.png" mode=""></image>
						<text>收藏</text>
					</view>
				</view>
				<view class="fotterright">
					<text class="gwc" @click="gwc">加入购物车</text>
					<text class="gwc gm" @click="buyImmediately">立即购买</text>
				</view>
			</view>
		</view>
	</view>
</template>
<!-- 宠物详情组件 -->
<script>
	//引入仓库，状态机
	import {
		createNamespacedHelpers
	} from 'vuex';
	const {
		mapActions,
		mapState,
		mapMutations
	} = createNamespacedHelpers('pet');
	export default {
		data() {
			return {
				shop_id: '',
				pet_id: '',
				target: false,
				count: 0
			};
		},
		//页面加载的时候就修改id值
		onLoad: function(option) {
			(this.shop_id = option.shop_id), (this.pet_id = option.pet_id);
		},
		mounted() {
			this.getuser();
			// console.log(this.shop_id, this.pet_id);
			//用一个宠物的id去拿明细渲染页面
			this.getpetBypetId(this.pet_id);
		},
		methods: {
			...mapActions(['getpetBypetId', 'getuser', 'addShoppingAart']),
			gwc() {
				this.target = !this.target;
				console.log(11111);
			},
			//减少事件
			reduce() {
				this.count = this.count - 1;
			},
			//增加事件
			add() {
				this.count = ~~this.count + 1;
			},
			//确认加入购物车事件
			async optInBtn() {
				this.target = false;
				if (this.shop_id == '') {
					this.shop_id = this.onepetData.shopsID[0];
				}
				const result = await this.addShoppingAart({
					//宠物id
					petId: this.pet_id,
					//商店id
					shopId: this.shop_id,
					//购买数量
					count: this.count,
					//宠物名字
					name: this.onepetData.name,
					//宠物价格
					price: this.onepetData.price,
					//宠物库存
					stock: this.onepetData.inventory,
					//宠物图片
					img: this.onepetData.imageName[0]
				});
				// console.log(result)
				if (result[1].data._id) {
					uni.showModal({
						title: '提示',
						content: '商品加入购物车成功'
					});
				}
			},
			//立即支付事件
			buyImmediately() {
				if (this.shop_id == '') {
					this.shop_id = this.onepetData.shopsID[0];
				}
				let arry = [{
					//宠物id
					petId: this.pet_id,
					//商店id
					shopId: this.shop_id,
					//购买数量
					count: 1,
					//宠物名字
					name: this.onepetData.name,
					//宠物价格
					price: this.onepetData.price,
					//宠物库存
					stock: this.onepetData.inventory,
					//宠物图片
					img: this.onepetData.imageName[0],
					chenck: true,
					//用户id
					userId: this.loginId,
				}];

				//点击立即购买吧立即购买的商品本地储存再跳转到订单支付页面
				try {
					uni.setStorageSync('arry', arry);
				} catch (e) {
					// error
				};

				uni.navigateTo({
					url: '/pages/PaymentOfAnOrder/PaymentOfAnOrder'
				});

			}
		},
		computed: {
			...mapState(['onepetData', 'loginId'])
		}
	};
</script>

<style>
	/* 底部加入购物车 */
	.gwcinput, {
		border: 1px solid #ff7f50;
		height: 60rpx;
		width: 150rpx;
		text-align: center;
		line-height: 60rpx;
	}
	.btn {
		border: 1px solid #ff7f50;
	}
	.fotterleft {
		display: flex;
	}
	.fotterAll {
		width: 100%;
		position: fixed;
		bottom: 0rpx;
	}

	.optIn {
		margin-top: 20rpx;
		background-color: #f0ad4e;
	}

	.fotter {
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: rgba(221, 82, 77, 0.2);

		border-radius: 30rpx;
	}

	.wgctc {
		height: 300rpx;
		background-color: #f1f1f1;
		border-radius: 30rpx;
	}

	.fotterleft_icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #8f8f94;
		font-size: 28rpx;
		margin: 32rpx;
	}

	.fotterright {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #ffffff;
		margin-right: 20rpx;
	}

	.gwc {
		padding: 20rpx;
		background-color: #f0ad4e;
	}

	.gm {
		background-color: #d5102c;
	}

	/* 详情 */
	.xaingqing {
		color: #8f8f94;
		margin-top: 30rpx;
		background-color: #fafafa;
	}

	.fahuo>* {
		margin-right: 10rpx;
	}

	/* 发货 */
	.fahuo {
		margin-top: 30rpx;
		color: #8f8f94;
		font-size: 32rpx;
		display: flex;
		align-items: center;
	}

	/* 图标统一大小 */
	.imgicon {
		width: 42rpx;
		height: 42rpx;
		margin-right: 16rpx;
	}

	/* 热卖 */
	.hot {
		background-color: #d5102c;
		padding: 10rpx;
		color: #f5f8f9;
		font-size: 32rpx;
		border-radius: 14rpx;
		margin-right: 16rpx;
	}

	/* 推荐 */
	.tuijian {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #8f8f94;
		font-size: 32rpx;
	}

	//价格
	.price {
		color: #d5102c;
		font-size: 44rpx;
		margin-right: 30rpx;
	}

	//积分
	.jifen {
		color: #ff4500;
		font-size: 24rpx;
		padding: 8rpx;
		border-radius: 6rpx;
		background-color: rgba(255, 165, 0, 0.4);
		margin-right: 16rpx;
	}
</style>
