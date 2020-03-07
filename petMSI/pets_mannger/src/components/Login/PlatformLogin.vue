<template>
  <div>
    <div class="loginInput">
      <label for class='lable'>手机号:</label>
      <el-input
        maxlength="11"
        show-word-limit
        placeholder="平台登录/手机号登录"
        v-model="user.platformInputName"
      ></el-input>
    </div>
    <div class="loginInput">
      <label for class='lable'>密码:</label>
      <el-input placeholder="输入密码" v-model="user.platformInputPsd"></el-input>
    </div>
    <div style="text-align: center;  margin-bottom: 20px;">
      <el-button type="warning" plain @click="btn" router="true">确认登录</el-button>
    </div>
    <div style=" display: flex; justify-content: flex-end">
      <span class='goRegister' @click='goregister'>没有账号，去注册</span>
    </div>
  </div>
</template>

<script>
// 门店登录组件

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("login");
export default {
  data() {
    return {
      user: {
        platformInputName: "",
        platformInputPsd: ""
      }
    };
  },
  methods: {

goregister(){
  this.$router.push({path:'/register'})

},
    ...mapActions(["platformlogin"]),
    async btn() {
      const platformdata = await this.platformlogin(this.user);
      // console.log(platformdata);
      if (platformdata.data.success) {
        // localStorage.usertoken = platformdata.data.token;
        this.$router.push({ path: "/system" });
      } else if (platformdata.data.success === "申请中") {
        this.$alert("您的账号正在审核中", "登录失败", {
          confirmButtonText: "确定"
        });
      } else {
        this.$alert("账号密码不匹配", "登录失败", {
          confirmButtonText: "确定"
        });
      }
      this.user = {
        platformInputName: "",
        platformInputPsd: ""
      };
    }
  }
};
</script>

<style lang="css" scoped>
.loginInput {
  margin-bottom: 20px;
}

.lable{
  margin-bottom: 16px;
  display: inline-block
}
.goRegister{
  color: blue
}
</style>
