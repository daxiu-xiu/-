//平台管理状态机
import axios from "axios"
export default {
    namespaced: true,
    state: {
        addBtnTarget: false,
        // 商店信息
        addShopsData: {
            name: "",       // 名称
            address: "",    // 地址
            telephone: "",  // 电话
            desc: "",
            adminId: "",
            target: "",
            // 修改时候需要,修改与新增共用同一个弹窗页面
            _id: "",
            // 店铺照片
        },
        allShops: {
            // 页面显示条数
            pagesize: 2,
            // 总条数
            totalPages: 0,
            // 当前页
            currentPage: 1,
            ShopsData: []
        }
    },
    getters: {

    },
    mutations: {
        add(state, payload) {
            state.addShopsData.adminId = payload;
        },
        // 获取所有商铺信息
        getAll(state, payload) {
            // console.log(payload)
            state.allShops = payload;
        },
        // 修改店铺
        updateshops(state, payload) {
            console.log(payload);
            
            state.addShopsData = payload;
        }
    },
    actions: {
        addAsnyc(context) {
            axios
                .get("/uploadPetImage/addShopsImgs", {
                    params: {
                        ...context.state.addShopsData, target: "申请开店中",
                        adminId: context.state.addShopsData.adminId,
                    }
                })
                .then(res => {
                    if (res.status == "200") {
                        alert("新增成功");
                        context.dispatch("getAll_byId");
                    }
                });
        },
        asnycupdateShops(context) {
            console.log(context.state.addShopsData)
            axios.post("/uploadPetImage/updateShops", {
                ...context.state.addShopsData
            }).then(res => {
                context.dispatch("getAll_byId");
                context.state.addShopsData = {
                    name: "",       // 名称
                    address: "",    // 地址
                    telephone: "",  // 电话
                    desc: "",
                    adminId: "",
                    target: "",
                    // 修改时候需要,修改与新增共用同一个弹窗页面
                    _id: "",
                    // 店铺照片
                    imgName:"",
                }
            })
        },
        // 获取全部店铺
        getAll_shops(context) {
            axios.get("/api/shops/get_allshops").then(res => {
                context.commit('getAll', res.data)
                // console.log(context.state.allShops)
            })

        },
        getAll_byId(context) {
            axios.get("/api/shops/get_byId", {
                params: {
                    ...context.state.allShops,
                    _id: context.state.addShopsData.adminId,
                }
            }).then(res => {
                context.commit('getAll', res.data)
            })

        },
        deletebyId(context, payload) {
            // console.log(payload)
            axios.post("/api/shops/delete_byId", {
                _id: payload,
                newtarget: "申请删除中"
            }).then(res => {
                console.log(res)
                if (res.status == "200") {
                    alert("正在申请删除");
                    context.dispatch("getAll_byId");
                }
            })
        }
    }
}