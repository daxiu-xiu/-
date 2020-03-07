//系统页面管理状态机
import axios from "axios"
export default {
    namespaced: true,
    state: {
      arr:{},
    imageUrl_2:"",
    a:{aa:true}
    },
    getters: {  
        
    },
    mutations: {
        amend_s(state, payload){
            state.arr=payload[0]
            // console.log(payload[0]);
            state.imageUrl_2=payload[0].imageUrl
            console.log(state.arr);
        },
         //修改头像
         portraits(state, payload) {
             console.log(payload,"_++++++++++++");
             
             state.imageUrl_2 =payload[0]
        },
        //
        imageUrl_2s(state,payload){
              state.imageUrl_2 =payload
        },
        hh(state,payload){
            state.a={aa:false}
            console.log(11231233123);
            
        },
        //点击编译改变aa状态
        compiless(state){
            state.a={aa:true}
        }
    },
    actions: {
        //获取数据
        amends(context,_id){
           axios
           .get("/api/APPLICATION/obtain",{
             params:{
                 _id
             }
           })
           .then(res=>{
                context.commit("amend_s", res.data);
           })
        },
        //确认修改
              async amend_s(context) {
                  console.log(context.state.imageUrl_2);
                  console.log(context.state.arr);
                  
                return await axios
                    .post("/heads/tupian1", {
                        arr: {...context.state.arr,imageUrl:context.state.imageUrl_2},
                        aa:context.state.a.aa
                    })
            }
      
    }
}