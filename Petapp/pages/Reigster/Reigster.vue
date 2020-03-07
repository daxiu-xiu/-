<template>
	<div>
		<div style="height:200px"><Nav /></div>
		<div class="content">
			<div class="contentTop">
				<div style="display:flex; align-items: center;">
					<text class="logintitle">注册爱宠屋</text>
					<image style="width:50px;height:50px" src="../../static/timg-1.gif" />
				</div>

				<div class="inp">
					<label for class="label">用户名：</label>
					<input class="userInput" type="text" v-model="username" name id placeholder="手机号" />
				</div>
				<div class="inp">
					<label for class="label">密码：</label>
					<input class="userInput" v-model="password" type="text" name id placeholder="密码" />
				</div>

				<button class="longinBtn" @click="reigsterUser">确认注册</button>
				<div class="wxlogin">
					<navigator>
						<div style="display:flex;">
							<image style="width:24px;height:24px" src="../../static/dianhua.png" />
							<span style="color:blue">海外手机号注册</span>
						</div>
					</navigator>
				</div>
			</div>
			<div style="margin-top:60px; display: flex;">
				<text>已有账号？</text>
				<navigator url="/pages/Login/Login"><span style="color:blue">去登录</span></navigator>
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
		reigsterUser() {
			uni.request({
				url:'/api/appusers/register',
				// url: 'http://localhost:3000/appusers/register',
			method:'POST',
				data: {
					username:this.username,
					password:this.password
				},
				header: {
					'custom-header': 'hello' //自定义请求头信息
				},
				success: res => {
					if(res.data){
						//注册成功跳转到登录
						uni.navigateTo({
							url: '/pages/Login/Login'
						});
					}
					
				}
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
