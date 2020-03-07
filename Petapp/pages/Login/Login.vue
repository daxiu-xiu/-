<template>
	<div>
		<div style="height:200px"><Nav /></div>
		<div class="content">
			<div class="contentTop">
				<div style="display:flex; align-items: center;">
					<text class="logintitle">登录爱宠屋</text>
					<image style="width:50px;height:50px" src="../../static/timg-1.gif" />
				</div>

				<div class="inp">
					<label for class="label">用户名：</label>
					<input class="userInput" type="text" v-model="username" name id placeholder="手机号" />
				</div>
				<div class="inp">
					<label for class="label">密码：</label>
					<input class="userInput" type="text" v-model="password" name id placeholder="密码" />
				</div>

				<button class="longinBtn" @click="userlogin">确认登录</button>
				<div class="wxlogin">
					<!-- <navigator> -->
					<div style="display:flex;">
						<image style="width:24px;height:24px" src="../../static/weixin-2.png" />
						<text style="color:blue" @click="oauthlogin">微信一键登录</text>
					</div>
					<!-- </navigator> -->
				</div>
			</div>
			<div style="margin-top:60px;display: flex;">
				<text>没有账号？</text>
				<navigator url="/pages/Reigster/Reigster"><span style="color:blue">去注册</span></navigator>
			</div>
		</div>
	</div>
</template>

<script>
import Nav from '../../components/nav/Nav.vue';
export default {
	components: {
		Nav
	},
	data() {
		return {
			username: '',
			password: ''
		};
	},
	methods: {
		// 用户登录请求
		userlogin(e) {
			uni.request({
				method: 'POST',
					url:'/api/appusers/login',
				// url: 'http://localhost:3000/appusers/login',

				data: {
					username: this.username,
					password: this.password
				},
				header: {
					'custom-header': 'hello' //自定义请求头信息
				},
				success: res => {
					console.log(res.data);
					if (res.data.length != 0) {
						console.log(res.data);
						uni.setStorage({
							key: 'loginId',
							data: res.data[0]._id,
							success: function() {
								// console.log('success');
							}
						});
						// //登录成功跳转到首页（首页是脚步导航的页面。所以用switchTab）
						uni.switchTab({
							url: '/pages/HomePage/HomePage'
						});
					}
				}
			});
		},
		//一键登录
		oauthlogin() {
			uni.navigateTo({
				url: '/pages/Oauthlogin/Oauthlogin'
			});
		}
	}
};
</script>

<style scoped>
.content {
	padding-left: 30px;
	padding-right: 30px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
.contentTop {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.logintitle {
	font-size: 22px;
	font-weight: bold;
	color: coral;
	margin-top: 26px;
}
.userInput {
	border: 1px solid coral;
	width: 100%;
	border-radius: 10px;
	height: 40px;
	padding: 0px 10px;
}
.inp {
	display: flex;
	align-items: center;
	margin-top: 26px;
	width: 100%;
}
.label {
	width: 120px;
	font-size: 18px;
}
.longinBtn {
	margin-top: 26px;
	height: 40px;
	background-color: coral;
	color: white;
	margin-bottom: 30px;
}
.wxlogin {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}
</style>
