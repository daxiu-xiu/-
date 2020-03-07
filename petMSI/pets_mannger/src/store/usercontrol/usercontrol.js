import axios from "axios"


export default {
    namespaced: true,
    state: {
        arr: {
            // 当前页
            currentPage: 1,
            // 每页显示条数
            pageSize: 5,
            // 总条数
            totalCount: 0,
            // 总页数
            totalPages: 0,
            // 数据
            accounts: [],
            value: "name",
            text: ""
        },
        //下拉列表数据
        options: [
            {
                value: 'name',
                label: '姓名'
            },
            {
                value: 'age',
                label: '年龄'
            },
            {
                value: 'gender',
                label: '性别'
            },
            {
                value: 'phone',
                label: '手机号'
            },
            {
                value: 'status',
                label: '状态'
            },
        ],
        //们店数据
        lokkarr:[]

    },
    getters: {

    },
    mutations: {
        //获取
        gain1(state, payload) {
            state.arr = { ...payload, text: state.arr.text }
        },
        //获取们店数据
        gain2(state,payload){
            state.lokkarr=payload
            console.log( state.lokkarr);
            
        }
    },
    actions: {
        //获取
        gain(context) {
            axios
                .get("/api/usercontrol/obtain", {
                    params: {
                        currentPage: context.state.arr.currentPage,
                        pageSize: context.state.arr.pageSize,
                        value: context.state.arr.value,
                        text: context.state.arr.text
                    }
                })
                .then(res => {
                    context.commit("gain1", res.data)
                })
        },
        //删除
        async   removes(context, _id) {
            return await axios
                .delete(`/api/usercontrol/${_id}`)
        },
        //查看
        examines(context,_id){
            axios
            .post("/api/usercontrol/looks",{
                _id
            })
            .then(res=>{
                context.commit("gain2", res.data)
            })
        }
    }
}