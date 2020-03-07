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
        //修改数据
        amendarr: {
            _id: "",
            name: "",
            age: "",
            gender: "",
            phone: "",
            status: "",
            imageUrl: '',
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
        ]

    },
    getters: {

    },
    mutations: {
        //获取
        gain1(state, payload) {
            state.arr = { ...payload, text: state.arr.text }
        },
        //修改1
        amends1(state, payload) {
            // console.log(payload)
            const { _id, name, age, gender, phone, status,imageUrl } = payload[0]
            state.amendarr = { _id, name, age, gender, phone, status ,imageUrl}
        },
        //修改头像
        portraits(state, payload) {
            state.amendarr = {... state.amendarr,imageUrl:payload }
            // console.log(state.amendarr.imageUrl);
        }
    },
    actions: {
        //获取
        gain(context) {
            axios
                .get("/api/Administrator/obtain", {
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
                .delete(`/api/Administrator/${_id}`)
        },
        //修改1
        amends(context, _id) {
            axios
                .get("/api/Administrator/amends", {
                    params: {
                        _id
                    }
                })
                .then(res => {
                    // console.log(res.data);

                    context.commit("amends1", res.data)
                })
        },
        //修改2
        async amend_s(context) {
            return await axios
                .post("/heads/tupian", {
                    amendarr: context.state.amendarr
                })
        }
    }
}