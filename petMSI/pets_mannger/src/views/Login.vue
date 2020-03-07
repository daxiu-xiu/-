<template>
  <div class="content">
    <el-header>宠物管理系统登录页面</el-header>
    <div class="contentcenter">
      <div class="change">
        <el-switch
          style="display: block;width:200px"
          v-model="value2"
          active-color="coral"
          inactive-color="#ff4949"
          active-text="门店登录"
          inactive-text="平台登录"
          @change="switchchange"
        ></el-switch>
      </div>
      <div v-if="target">
        <ShopLogin></ShopLogin>
      </div>
      <div v-else>
        <PlatformLogin></PlatformLogin>
      </div>
    </div>
  </div>
</template>

<script>
//引入店铺管理的登录组件
import ShopLogin from "../components/Login/ShopLogin";
//引入平台管理的登录组件
import PlatformLogin from "../components/Login/PlatformLogin";
export default {
  components: {
    ShopLogin,
    PlatformLogin
  },
  data() {
    return {
      value2: true,
      target: true
    };
  },
  methods: {
    switchchange(value) {
      // console.log(value);
      if (value) {
        this.target = true;
      } else {
        this.target = false;
      }
    }
  }
};
</script>

<style lang="css" scoped>
.content {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/d6ab05974f1d04aa7bc9f97fb2071f386ebacf16.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.el-header {
  background-color: white;
  color: coral;
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  font-weight: bold;
}
.contentcenter {
  width: 400px;
  margin: 30px auto;
  background-color: antiquewhite;
  padding: 30px;
}
.change {
  margin-bottom: 30px;
}
</style>