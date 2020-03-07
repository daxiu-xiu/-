<template>
  <div>
    <el-container>
      <el-header>
        <el-row type="flex" justify="space-between">
          <el-col :span="2">
            <div class="grid-content bg-purple">爱宠帮</div>
          </el-col>
          <el-col :span="2" class="touxiang">
            <div class="grid-content bg-purple-light name">
              欢迎你{{loginuser.name}}
              <div class="block">
                <el-avatar :size="50"></el-avatar>
              </div>
              <div class="tuichu">
                <el-button @click="revLogin" type="warning" icon="el-icon-switch-button" circle>退出</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 左侧菜单栏 -->
        <el-aside width="130px">
          <div class="list_partent" v-if="loginuser.position=='controller'">
            <!-- 管理列表 -->
            <el-menu router >
              <!-- 修路由index-->
              <el-menu-item index="/system/administrator">
                <i class="el-icon-user-solid" ></i>管理员管理
              </el-menu-item>
              <el-menu-item index="/system/jurisdiction">
                <i class="el-icon-message-solid" ></i>申请处理
              </el-menu-item>
              <el-menu-item index="/system/usercontrol">
                <i class="el-icon-s-custom"></i>用户管理
              </el-menu-item>
              <el-menu-item index="/system/PlatformManagedStore">
                <i class="el-icon-s-management"></i>门店管理
              </el-menu-item>
              <el-menu-item index="1-5">
                <i class="el-icon-s-data"></i>统计功能
              </el-menu-item>
            </el-menu>
          </div>
          <!-- 商家 -->
          <div class="list_partent" v-else>
            <el-menu :router="true">
              <el-menu-item index="/system/persons">
                <i class="el-icon-info"></i>个人中心
              </el-menu-item>
              <el-menu-item index="/system/merchantstores/">
                <i class="el-icon-s-shop"></i>门店管理
              </el-menu-item>
              <el-menu-item index="/system/commodity">
                <i class="el-icon-s-goods"></i>商品管理
              </el-menu-item>
              <el-menu-item index="1-4">
                <i class="el-icon-s-management"></i>服务管理
              </el-menu-item>
              <el-menu-item index="1-5">
                <i class="el-icon-s-order"></i>订单管理
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <div class="system_content">
            <router-view ></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "system"
);
let time;
export default {

  data() {
    return {
      target: true
    };
  },
  mounted() {
    this.islogin();
    time = setInterval(this.islogin(), 80000);
  },

  methods: {
    ...mapActions(["islogin", "revlogin"]),
    revLogin() {
      this.revlogin();
      location.hash = "#/login";
      clearInterval(time);
    }
  },
  computed: {
    ...mapState(["loginuser"])
  }
};
</script>

<style lang="css" scoped>
.tuichu {
  /* margin-left: 20px; */
}
.name {
  /* margin-left: 20px; */
  display: flex;
  justify-content: space-between;
}
.touxiang {
  width: 300px;
}
.bg-purple-light {
  display: flex;
  align-items: center;
}
/* icon样式 */
.el-icon-user-solid {
  margin-right: 5px;
}
/* 列表样式 */
.el-menu {
  display: flex;
  height: 60vh;
  border: none;
  flex-direction: column !important;
  justify-content: space-around !important;
}
/* 左侧选择项目 */
.el-menu-item:focus,
.el-menu-item:hover {
  border-radius: 5px;
  color: white;
  background-color: rgb(156, 39, 179);
}
.el-menu-item,
.is-active {
  border-radius: 5px;
}
.el-menu-item.is-active {
  color: white;
}
.is-active {
  color: white;
  background-color: rgb(156, 39, 179);
}

.system_content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: rgb(255, 255, 255);
}
.el-aside {
  border-top: 2px solid rgb(232, 232, 232);
  /* background-color: #d3dce6; */
  color: #333;
  margin-right: 10px;
  height: 90vh;
}
.el-main {
  /* background-color: #e9eef3; */
  padding: 30px 15px;
  height: 90vh;
  overflow: hidden;
  background-color: rgb(222, 222, 222);
  color: #333;
}
body > .el-container {
  margin-bottom: 40px;
  height: 100vh;
}
.el-row {
  height: 100%;
  display: flex;
  align-items: center;
}
.el-col {
  background-color: #ffff;
}
.el-col:nth-child(2) {
  /* background-color: black; */
}
.el-col:nth-child(1) {
  text-align: center;
  font-size: 24px;
  color: rgb(78, 81, 92);
}
.el-col:last-child {
  text-align: right;
}
</style>
