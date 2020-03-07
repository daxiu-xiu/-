<template>
    <div class="entirety">

     <!-- 标题 -->
     <div class="title">
         <span style="color:white;font-size:35px">{{title}}</span>
     </div>



      
      <!-- 注册的内容 -->
      <el-form>

      <div class="forms">
             <!-- 切换注册 -->
        <div class="switchover">
              <el-button type="success" :disabled="status">管理员注册</el-button>
                <el-button type="danger" @click="jump">商家注册</el-button>
        </div>
        
       <!-- 超级管理员
          <div class="package">
         <label for="super">超级管理员 : </label>   
             <el-input  class="inputbox"
                @blur="superadmin"
                 id="super"
                    placeholder="请填写公司内部码（非必填）"
                    v-model="administrator.superma"
                    clearable>
            </el-input>
          </div> -->

          <!-- 账号框 -->
          <div class="package">
         <label for="zhang">账号 : </label>   
             <el-input  :class="!inputstate?'inputbox':'inputbox1'"
                @input="verifyaccoun"
                @blur="repetition"
                 id="zhang"
                    placeholder="注册账号"
                    v-model="administrator.account"
                    clearable>
            </el-input>
            <div v-show="inputstate" class="hint">必须是在6~12位</div>
          </div>
          <!-- 密码框 -->
            <div  class="package">
                  <label for="mima">密码 : </label>   
                    <el-input
                    @input="verifypassword"
                    :class="!inputstate1?'inputbox':'inputbox1'"
                    id="mima"
                    placeholder="请输入密码" 
                    v-model="administrator.password" show-password>
                    </el-input>
             <div v-show="inputstate1" class="hint">首位必须是字母</div>
          </div>
          <!-- 确认密码 -->
              <div  class="package">
                  <label for="que">确认密码 : </label>   
                    <el-input
                     @input="confirmpassword"
                       :class="!inputstate2?'inputbox':'inputbox1'"
                    id="que"
                    placeholder="请输入密码" 
                    v-model="password2" show-password>
                    </el-input>
             <div v-show="inputstate2" class="hint">密码不一致！！！</div>
          </div>
          <!-- 姓名 -->
          <div  class="package">
              <label for="name">姓名 : </label>      
             <el-input class="inputbox" id="name"
                    placeholder="注册账号"
                    v-model="administrator.name"
                    clearable>
            </el-input>
          </div>
          <!-- 性别 -->
          <div  class="package">
             <label for="">性别 : </label>   
              <el-radio v-model="administrator.gender" label="男">男</el-radio>
              <el-radio v-model="administrator.gender" label="女">女</el-radio>
          </div>
          <!-- 年龄 -->
            <div  class="package">
               <label for="age">年龄 : </label>   
             <el-input class="inputbox" id="age"
                    placeholder="填写年龄"
                    v-model="administrator.age"
                    clearable>
            </el-input>
          </div>
           <!-- 手机号 -->
           <div class="package">
          <label for="shou">手机号 : </label>  
               <el-input
               @input="verifyphone"
                 id="shou"
                  :class="!inputstate3?'inputbox':'inputbox1'"
                    type="text"
                    placeholder="请输入手机号"
                    v-model="administrator.phone"
                    maxlength="11"
                    show-word-limit
                    >
                 </el-input>
                 <div v-show="inputstate3" class="hint">请输入正确的手机号</div>
           </div>
           
           <!-- 注册按钮 -->
           <div  class="signbutton">
                 <el-button type="primary" round  @click="affirm({a:'controller'})">确认注册</el-button>
           </div>

           <!-- 跳转登录 -->
           <div class="login_f">
             <router-link class="loginfont" to ="/login">登录</router-link>
           </div>
      </div>
      </el-form>
           
    </div>
</template>

<script>
import {createNamespacedHelpers} from "vuex"
const {mapMutations,mapState,mapActions} = createNamespacedHelpers("register")
// import hh from "../head/head"
    export default {
          props:["title","status"],
         data() {
           return {
       
      }    
      },
      components:{
        // hh
      },
           computed:{
             ...mapState(["administrator","inputstate","inputstate1","inputstate2","inputstate3"]),
             password2:{
               get:mapState(["password2"]).password2,
               set:mapMutations(['alterpassword2']).alterpassword2
             }
       },
      methods:{
          ...mapMutations(["switchstate","verifyaccoun","verifypassword","confirmpassword","verifyphone","superadmin"]),
           ...mapActions(["submits","repetition"]),
          jump(){
             this.switchstate();
             this.administrator.account="";
               this.administrator.password="";
               this.password2="";
               this.administrator.name="";
                this.administrator.gender="";
                this.administrator.age="";
                this.administrator.phone="";
          },
          //确认
          async affirm(b){
            const xx = await  this.submits(b)
              // console.log(xx)
              if(xx.data){
                    this.$message({
                      message: '恭喜你，注册成功！！',
                       type: 'success'
                  });
              }
              else{
                  this.$message.error('注册失败！！！');
              }
          },
   
      }
    }
</script>

<style scoped>
        .entirety{
            width: 100%;
            height: 100vh;
            background-color: red;
            background-image: url("../../assets/f3a4e6ecc591c22ffe3a0258f5a7966e.png");
            background-size: 100%;
            overflow: hidden;
        }
        .title{
            display: flex;
            justify-content: center;
            margin-top: 40px;
        }
        .forms{
            background-color:#2a2a2a;
            width: 500px;
            margin: auto;
            margin-top: 60px;
            padding: 20px;
            color:white;
                border-radius: 80px;
        }
        .switchover{
            display: flex;
            justify-content:center;
            margin-bottom: 30px;
        }
        .package{
            margin-bottom: 20px
        }
        .inputbox{
            width: 300px;
        }
        .inputbox1{
          width: 300px;
          border: 2px solid red;
        }
        label{
                display: inline-block;
                 width: 100px;
                 text-align: right;
                 margin-right: 10px;
        }
        .signbutton{
            display: flex;
            justify-content: center
        }



      /* 表单验证 */
      .hint{
        text-align: center;
        color: red;
        font-size: 12px;
        margin-top: 3px;
      }

      /* 登录 */
      .login_f{
        display: flex;
        justify-content:flex-end
      }
      .loginfont{
          color: wheat;
          margin-right: 38px;
      }

</style>