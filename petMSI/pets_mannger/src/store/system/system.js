//系统页面管理状态机
import axios from "axios"
export default {
    namespaced: true,
    state: {
        //当前用户登录的个人信息
        loginuser: {}
    },
    getters: {

    },
    mutations: {
        changloginuser(state, payload) {
            state.loginuser = payload
            console.log(payload)
            //平台管理的本地储存id
            if (payload.position == 'controller') {
                localStorage.loginControllerId = payload._id
            } else {
                //商家的本地储存的id
                localStorage.loginuserId = payload._id
            }
            // console.log(state.loginuser)
        }
    },
    actions: {
        //判断用户是否登录，并且拿它的数据
        islogin(context) {
            axios.get('/users/islogin').then(res => {
                if (!res.data.isLogined) {
                    // alert("你还没有登录！！！")
                    location.hash = '#/login'
                } else {
                    context.commit("changloginuser", res.data.name);

                }
            })
        },
        //用户点击退出登录
        revlogin(context) {
            axios.get('/users/logout').then();
        }
    }
}