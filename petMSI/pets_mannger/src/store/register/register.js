import axios from "axios"


export default {
    namespaced:true,
    state: {
        // 标题
      title:["管理员注册","商家注册"],
      //切换状态
      status:true,
      //管理员数据
      administrator:{
        account: "",   // 账号
        password: "",  // 密码
        name: "",      // 姓名
        age: "",       // 年龄
        gender: "",    // 性别
        phone: "",     // 手机号
        position:"" ,  // 职位（平台管理员/门店管理员/超级管理员）
        imageUrl:"" ,  
        status:"" ,// 状态（申请中/已通过/未通过）
        superma:"",
      },
      //验证超级管理码是否正确
      superma1:"123456",
      //账户状态
      inputstate:false,
      //密码状态
      inputstate1:false,
      //确认密码
      inputstate2:false,
      password2:"",
      //手机号状态
      inputstate3:false,


      //提示框状态
    },
    getters:{
      
    },
    mutations: {
        switchstate(state){
            state.status=!state.status
        },
        // //验证超级管理员
        // superadmin(state){
        //     if(state.superma1==state.administrator.superma){
        //         state.administrator.status="已通过"
        //         console.log( state.administrator.status)
        //     }
        //     else{
        //       alert("内部码不对，请重新输入");
        //       state.administrator.superma="";
        //     }
        // },


        //验证账号
        verifyaccoun(state,payload){
            if(!/^[\w]{6,12}$/.test(state.administrator.account)){
                state.inputstate=true
            }
            else{
              state.inputstate=false
            }
        },
        //验证密码
        verifypassword(state){
          if(!/^[a-zA-Z][a-zA-Z0-9]{0,11}$/.test(state.administrator.password)){
            state.inputstate1=true
          }
          else{
            state.inputstate1=false
          }
        },
        //修改确认面膜
        alterpassword2(state,payload){
            state.password2=payload
        },
        //确认密码
        confirmpassword(state){
          console.log(state.password2)
            if(state.administrator.password==state.password2){
              state.inputstate2=false
            }
            else{
              state.inputstate2=true
            }
        },
        //手机号验证
        verifyphone(state){
          if(!/^1[3456789]\d{9}$/.test(state.administrator.phone)){
              state.inputstate3=true
          }
          else{
            state.inputstate3=false
          }
        }
    },
    actions: {
      //注册验证账户重复
      repetition(context){
        axios
        .post("/users/repeatedverification",{
          account: context.state.administrator.account,  
        })
        .then(res=>{
          if(res.data){
            alert("账户已存在，请重新输入");
            context.state.administrator.account=""
          }
        })
      },
      //注册提交
      async submits(context,b){
        // console.log(b)
                  if(!context.state.inputstate&&!context.state.inputstate1&&!context.state.inputstate2&&!context.state.inputstate3&&context.state.administrator.name!=""&&context.state.administrator.age!=""&&context.state.administrator.gender!=""){
            return  await axios
             .post("/users/register",{
               account:context.state.administrator.account,  
               password: context.state.administrator.password, 
               name: context.state.administrator.name,      
               age: context.state.administrator.age,       
               gender: context.state.administrator.gender,   
               phone:context.state.administrator.phone,   
               position:b.a,  
               // imageUrl:context.state.administrator.imageUrl
             })
           }
           else{
             return   false
           }
     
        // if(context.state.administrator.status=="已通过"){
        //   if(!context.state.inputstate&&!context.state.inputstate1&&!context.state.inputstate2&&!context.state.inputstate3&&context.state.administrator.name!=""&&context.state.administrator.age!=""&&context.state.administrator.gender!=""){
        //     return  await axios
        //      .post("/users/register",{
        //        account:context.state.administrator.account,  
        //        password: context.state.administrator.password, 
        //        name: context.state.administrator.name,      
        //        age: context.state.administrator.age,       
        //        gender: context.state.administrator.gender,   
        //        phone:context.state.administrator.phone,   
        //        position:"SuperAdmin",  
        //        status:"已通过"
        //        // imageUrl:context.state.administrator.imageUrl
        //      })
        //    }
        //    else{
        //      return   false
        //    }
        // }
        // else{
        //   if(!context.state.inputstate&&!context.state.inputstate1&&!context.state.inputstate2&&!context.state.inputstate3&&context.state.administrator.name!=""&&context.state.administrator.age!=""&&context.state.administrator.gender!=""){
        //     return  await axios
        //      .post("/users/register",{
        //        account:context.state.administrator.account,  
        //        password: context.state.administrator.password, 
        //        name: context.state.administrator.name,      
        //        age: context.state.administrator.age,       
        //        gender: context.state.administrator.gender,   
        //        phone:context.state.administrator.phone,   
        //        position:b.a,  
        //        // imageUrl:context.state.administrator.imageUrl
        //      })
        //    }
        //    else{
        //      return   false
        //    }
        // }
     
          //   .then(res=>{
          //       if(res.data){
          //         alert("新增成功！！")
          //       }
          //   })
          // }
          // else{
          //   alert("新增失败！！")
          // }
      }
    }
  }