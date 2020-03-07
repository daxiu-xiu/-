//管理平台门店管理的状态机
import axios from "axios"
export default {
    namespaced: true,
    state: {
        pageData: {
            //数据库的总数据
            totalCount: 0,
            //当前页面是第几页
            currentPage: 1,
            //总共有多少页
            totalPage: 0,
            //当前页数是多少个数据
            pageSize: 3,
            //拿回的商店数据
            shops: [],
            value: 'name',
            text: '',
            target: "正在营业",
        },
        //店铺数据明细
        ShopsData: {
            name: "",       // 名称
            address: "",    // 地址
            telephone: "",  // 电话
            desc: "",
            // 店铺照片
        },

    },
    getters: {

    },
    mutations: {
        //根据请求回来的数据，修改状态机里面的pagedata
        changepagadata(state, payload) {
            state.pageData = payload
        },
        //修改的渲染数据
        changeShopsData(state, payload) {
            state.ShopsData = payload

        }
    },
    actions: {
        //根据用户点击的列表。用状态渲染不同的列表
        getshops(context) {
            axios.get('/api/PlatformManagedStore/shopsByTarget', {
                params: {
                    //输入查询框的值
                    text: context.state.pageData.text,
                    //下拉框的值
                    value: context.state.pageData.value,
                    //当前页
                    currentPage: context.state.pageData.currentPage,
                    //当前页的数据条数
                    pageSize: context.state.pageData.pageSize,
                    //查询的状态
                    target: context.state.pageData.target,
                }
            }).then(res => {
                console.log(res.data)
                context.commit('changepagadata', res.data)
            })
        },
        //删除事件
        async delShopByid(context, _id) {
            // console.log(_id)
            return await axios.post('/api/PlatformManagedStore/delShopByid', { _id })
        },
        //同意事件
        async agreeAsync(context, payload) {
            // console.log(payload)
            return await axios.post('/api/PlatformManagedStore/agreeTarget', payload)
        },
        //拒绝事件
        async rejectAsync(context, payload) {
            // console.log(payload)
            return await axios.post('/api/PlatformManagedStore/rejectTarget', payload)
        },
        //确认修改事件
        async  asnycupdateShops(context) {
            console.log(context.state.ShopsData)
            return await axios.post("/uploadPetImage/updateShops", {
                ...context.state.ShopsData
            })
        },
    }
}