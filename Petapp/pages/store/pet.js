export default {
	namespaced: true,
	state: {
		//宠物数据，首页可以拿10条
		petData: [],
		//宠物店数据，首页拿一条
		shopData: {},
		//所有的店铺并且该店铺所对应的商品
		shopDataAndpet: [],
		// url: '/api/http://localhost:3000',
		url:'/api',
		//宠物全部列表和宠物店列表的每次上啦请求
		pullupData: {
			start: 0,
			count: 18,
			total: 0,
			petDataall: [],
			//默认是综合排序
			target: 'composite'
		},
		//搜索页面的数据
		searchData: [],
		//一个店铺里面的所有宠物和店铺的明细
		onshopPets: {},
		//详情页面一个宠物的数据
		onepetData: {},
		loginId: '',
		//所有的购物车数据
		list: [],
		//用户的总订单渲染数据
		userOrder: [],
		//分类数组
		// classifyData: []

	},
	getters: {

	},
	mutations: {
		//修改本地用户登录
		changeloginId(state, payload) {
			state.loginId = payload
		},
		//详情页面改变获取回来的一个宠物的明细
		changeonepetData(state, payload) {
			state.onepetData = payload
		},
		//改变拿回来一个店铺里面的所有宠物
		changeonshopPets(state, payload) {
			console.log(payload)
			state.onshopPets = payload
		},
		//改变搜索回来的数据
		changesearchData(state, payload) {
			state.searchData = payload
		},
		//首页一个宠物店数据
		changeshopData(state, payload) {
			state.shopData = payload
		},
		//改变宠物数据
		changepetData(state, payload) {
			state.petData = payload
		},
		//改变所有宠物店的数据
		changeshopDataAndpet(state, payload) {
			state.shopDataAndpet = payload
		},
		//改变请求回来的数据(所有宠物)
		changepullupData(state, payload) {
			state.pullupData = { ...state.pullupData,
				total: payload.total,
				petDataall: [...state.pullupData.petDataall, ...payload.data]
			}
		},
		//改变拿回来的所有的购物车数据
		changeshopCar(state, payload) {
			console.log(payload);
			state.list = payload
		},
		//改变拿回来的订单数据渲染
		changeuserOrder(state, payload) {
			state.userOrder = payload
		},
		//改变获取回来的分类数据
		// changeclassifyData(state, payload) {
		// 	state.classifyData = payload
		// },
		},
		actions: {
			//分类获取商品
		async	classGetpet(context) {
			return  await uni.request({
					url: `${context.state.url}/api/order/classGetpet`,
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					// success: res => {
					// 	//后台拿回来的宠物店修改元数据
					// 	console.log(res.data);
					// 	context.commit('changeclassifyData', res.data)

					// }
				});

			},


			//获取本地储存
			getuser(context) {
				uni.getStorage({
					key: 'loginId',
					success: function(res) {
						console.log(res.data)
						context.commit('changeloginId', res.data)
					}
				});
			},

			//获取商店
			getshop(context) {
				uni.request({
					url: `${context.state.url}/api/PlatformManagedStore/appshops`,
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: res => {
						//后台拿回来的宠物店修改元数据
						console.log(res.data.arr);
						context.commit('changeshopData', res.data.arr[0])
						context.commit('changeshopDataAndpet', res.data.arr)
					}
				});
			},
			//获取首页商品
			getpet(context) {
				uni.request({
					url: `${context.state.url}/api/PlatformManagedStore/appPets`,
					method: 'GET',
					//因为后台给了默认值是	start:0,count:10，所以这里可以不用传参数
					success: res => {
						console.log(res.data.data);
						context.commit('changepetData', res.data.data)
					}
				});
			},
			//获取所有商品
			getpetall(context) {
				console.log()
				uni.request({
					url: `${context.state.url}/api/PlatformManagedStore/appPets`,
					method: 'GET',
					data: {
						//起始数据
						start: context.state.pullupData.start,
						//请求条数
						count: context.state.pullupData.count,
						//请求数据的切换
						target: context.state.pullupData.target,

					},
					success: res => {
						// console.log(res.data)
						context.commit('changepullupData', res.data)
					}
				})
			},
			//搜索事件
			search(context, payload) {
				console.log(payload)
				uni.request({
					url: `${context.state.url}/api/PlatformManagedStore/searchdata`,
					method: 'POST',
					data: payload,
					success: res => {
						console.log(res.data)
						context.commit('changesearchData', res.data)
					}
				})
			},
			//通过一个店铺id去拿所在店铺的宠物
			getpetById(context, payload) {
				// console.log(payload)
				uni.request({
					url: `${context.state.url}/api/PlatformManagedStore/getpetById`,
					method: 'GET',
					data: {
						_id: payload
					},
					success: res => {
						console.log(res.data)
						context.commit('changeonshopPets', res.data)
					}
				})
			},
			//通过宠物的id去拿宠物的明细
			getpetBypetId(context, payload) {
				console.log(payload)
				uni.request({
					url: `${context.state.url}/api/PlatformManagedStore/getpetBypetId`,
					method: 'GET',
					data: {
						_id: payload
					},
					success: res => {
						// console.log(res.data);
						context.commit('changeonepetData', res.data[0])
					}
				})
			},
			//详情页面确认加入购物车事件
			async addShoppingAart(context, payload) {
				console.log(context.state.loginId, payload)
				return await uni.request({
					url: `${context.state.url}/api/shoppingcart/addShoppingAart`,
					method: 'POST',
					data: { ...payload,

						userId: context.state.loginId,
					}
				})
			},
			//根据用户的id获取它的购物车详情渲染页面
			getShopAartById(context, payload) {
				uni.request({
					url: `${context.state.url}/api/shoppingcart/getShopAartById`,
					method: 'GET',
					data: {
						userId: context.state.loginId,
					},
					success: res => {
						res.data.forEach(item => {
							item.check = false
						})
						context.commit('changeshopCar', res.data)
					}
				})
			},
			//购物车通过购物车的ID和去修改数量
			updateCount(context, payload) {
				uni.request({
					url: `${context.state.url}/api/shoppingcart/updateCount`,
					method: 'POST',
					data: payload,
					success: res => {}
				})

			},
			//购物车的删除事件
			revShoppingCar(context, payload) {
				console.log(payload)
				uni.request({
					url: `${context.state.url}/api/shoppingcart/revShoppingCar`,
					method: 'POST',
					data: {
						_id: payload
					},
					success: res => {
						console.log(res.data)
					}
				})
			},
			//订单生成事件
			createOrder(context, payload) {
				console.log(payload)
				uni.request({
					url: `${context.state.url}/api/order/createOrder`,
					method: 'POST',
					data: payload,
					success: res => {}
				})

			},
			//根据用户的登录获取订单信息
			getOrder(context, payload) {
				uni.request({
					url: `${context.state.url}/api/order/getOrder`,
					method: 'GET',
					data: {
						userId: context.state.loginId
					},
					success: res => {
						context.commit('changeuserOrder', res.data)
						console.log(res.data)
					}
				})
			},
			//订单的删除事件通过id
			revOrder(context, payload) {
				uni.request({
					url: `${context.state.url}/api/order/revOrderById`,
					method: 'POST',
					data: {
						_id: payload
					},
					success: res => {
						context.dispatch("getOrder");
						// console.log(res.data);
					}
				})

			}
		}
	}
