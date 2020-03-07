

import Vue from "vue";
import Vuex from "vuex";
//注册状态机
import register from "../store/register/register";
import platformStore from "../store/system/platformStore";
import shopStore from "../store/system/shopStore";
import shops_store from '../store/shops/shops_store'
import commodityStore from "../store/commodity/commodity";
import login from "../store/login/login";
import system from "../store/system/system";
//引入平台管理的门店管理的状态机
import PlatformManagedStore from "../store/PlatformManagedStore/PlatformManagedStore";
//权限申请状态机
import jurisdiction from "../store/jurisdiction/jurisdiction"
//管理员管理状态机
import Administrator from "../store/Administrator/Administrator"
//用户管理
import usercontrol from "../store/usercontrol/usercontrol"
import shops_commodity from '../store/shops_commodity/shops_commodity'
//个人中心
import APPLICATION from "../store/APPLICATION/APPLICATION"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    register: register,
    jurisdiction: jurisdiction,
    Administrator: Administrator,
    shops_store,
    platformStore,
    commodityStore,
    shopStore,
    login,
    system,
    PlatformManagedStore,
    usercontrol: usercontrol,
    shops_commodity,
    usercontrol:usercontrol,
    APPLICATION:APPLICATION
  }
});
