//登录管理状态机
import axios from "axios"
export default {
    namespaced: true,
    state: {

    },
    getters: {

    },
    mutations: {
    },
    actions: {
        //店铺登录请求  
        async shoplogin(context, payload) {
            // let _this = this;
            let { shopInputName,
                shopInputPsd } = payload
            console.log(shopInputName, shopInputPsd)
            if (!/^1[3456789]\d{9}$/.test(shopInputName)) {
                alert('登录失败，请手机号登录')
            } else {
                return await axios
                    .post("/users/shoplogin", {
                        //密码
                        password: shopInputPsd,
                        //手机号
                        phone: shopInputName,
                        //商家管理
                        position: "shops",
                    })

            }
        },
        //平台管理员登录请求
        async   platformlogin(context, payload) {
    
            let { platformInputName,
                platformInputPsd } = payload
            console.log(platformInputName, platformInputPsd)
            if (!/^1[3456789]\d{9}$/.test(platformInputName)) {
                alert('登录失败！请手机号登录')
            } else {
                return axios
                    .post("/users/platformlogin", {
                        //密码
                        password: platformInputPsd,
                        //手机号
                        phone: platformInputName,
                        //商家管理
                        position: "controller",
                    })
            }
        },

    },
}