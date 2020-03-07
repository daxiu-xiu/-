<template>
  <view class="content">
    <Login />
  </view>
</template>

<script>
// import Onepet from "../../common/onepet/Onepet.vue";
import Login from "../Login/Login";
export default {
  components: {
    Login
  },
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {},
  methods: {}
};
</script>

<style>
.content {
  text-align: center;
  height: 400upx;
}

.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
