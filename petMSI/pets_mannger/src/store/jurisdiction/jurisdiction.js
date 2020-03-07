
import axios from "axios"

export default({
    namespaced:true,
    state: {
        // arr:[],
        arr:{
            // 当前页
            currentPage: 1,
            // 每页显示条数
            pageSize: 5,
            // 总条数
            totalCount: 0,
            // 总页数
            totalPages: 0,
            // 学生数据
            accounts: [],
            value:"",
            text:""
    },
    //下拉列表数据
    options:[
        {
            value: 'shops',
            label: '商家'
        },
        {
            value: 'controller',
            label: '管理员'
        },
        {
            value: '全部',
            label: '全部'
        },
    ]
    },
    getters:{
  
    },
    mutations: {
        gain1(state,payload){
            for(let i =0;i<payload.accounts.length;i++){
             if(payload.accounts[i].position=="shops"){
                payload.accounts[i].position="商家"
                // state.arr=payload
                state.arr={...payload,text:state.arr.text}
                // console.log( state.arr)
            }
            else if (payload.accounts[i].position=="controller"){
                payload.accounts[i].position="管理员"
                // state.arr=payload
                state.arr={...payload,text:state.arr.text}

            }
            } 
        }
    },
    // actinos不支持修改state里的数据，所有如果要修改的话要调用mtations里的方法，然后传值修改
    actions: {   
        // 获取
        gain(context){
            console.log(context.state.arr.text);  
            axios
            .get("/api/jurisdiction/applications",{
               params:{
                currentPage:context.state.arr.currentPage,
                pageSize:context.state.arr.pageSize,
                value:context.state.arr.value,
                text:context.state.arr.text
               }
            })
            .then(res=>{
                context.commit("gain1",res.data)
            })
        },
        //同意
        async agrees(context,_id){
           return await axios
           .post("/api/jurisdiction/amend",{
                _id
           })
        },
        //拒绝
        async r_efuse(context,_id){
            return await axios
            .post("/api/jurisdiction/refuses",{
                 _id
            })
         }
    }
  })