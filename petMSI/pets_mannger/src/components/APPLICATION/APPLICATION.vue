<template>
  <div class="box-card_f">
    <el-card class="box-card">
        <!-- 头像 -->
        <div class="default_f">
            <img v-if="arr.imageUrl" class="default" :src="`http://localhost:3000/heads/tupian/${arr.imageUrl}`" alt="">
             <img v-else class="default" src="../../assets/moren.jpg" alt="">
        </div>
        <!-- 内容 -->
        <div class="character_f">
             <h2>姓名 : {{arr.name}}</h2>
             <h2>年龄 : {{arr.age}}</h2>
             <h2>手机号 : {{arr.phone}}</h2>
             <h2>状态 : {{arr.status}}</h2>
             <h2>性别 : {{arr.gender}}</h2> 
        </div>
        <!-- 按钮 -->
        <div class="button_f">
              <el-button class="btn" type="danger" round @click="compiles">编辑</el-button>
        </div>
    </el-card>

        <!-- 弹窗 -->
           <!--弹窗 -->
        <el-dialog
            title="修改学生"
            :visible.sync="dialogVisible"
            width="36%"
            :before-close="handleClose">


<!-- 头像上传 -->
     <div class="portrait">
          <el-upload
              class="avatar-uploader"
              action="/heads/addImage"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl_2" :src="url1+imageUrl_2" class="avatar">
               <img  v-else src="../../assets/moren.jpg" class="avatar">
              <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </div>


<!-- form表单  此内容都在弹窗内 -->
<el-form ref="form"  label-width="80px">

  <el-form-item label="姓名">
    <el-input v-model="arr.name"></el-input>
  </el-form-item>


  <el-form-item label="年龄">
    <el-input v-model="arr.age"></el-input>
  </el-form-item>


   <el-form-item label="性别">
      <el-radio label="男" v-model="arr.gender"></el-radio>
      <el-radio label="女" v-model="arr.gender"></el-radio>
  </el-form-item>

 <el-form-item label="手机号">
    <el-input v-model="arr.phone"></el-input>
  </el-form-item>

</el-form>

            <!-- 弹窗的按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="affirms">确 定 修 改</el-button>
            </span>
            
        </el-dialog>

  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions,mapMutations,mapGetters } = createNamespacedHelpers("APPLICATION");
export default {
    data(){
        return{
            loginuserId:"",
            //弹窗
            dialogVisible: false,
            url1:"",
            //状态
            a:true
        }
    },
  mounted() {
      //获取到存在本地得账户得ID  
         this.loginuserId = localStorage.getItem("loginuserId");
         this.amends(this.loginuserId)
  },
  computed:{
   ...mapState(["arr"]),
    // ...mapGetters(["hh"])
        imageUrl_2:{
               get:mapState(["imageUrl_2"]).imageUrl_2,
               set:mapMutations(['imageUrl_2s']).imageUrl_2s
             }
  },
  methods:{
        ...mapMutations(["portraits","hh","compiless"]),
       ...mapActions(["amends","amend_s"]),
       //编译
       compiles(){
           this.dialogVisible=true;
           this.url1="http://localhost:3000/heads/tupian/"
           this.compiless()
       },
          //弹窗
                 handleClose(done){
                     this.$confirm('确认关闭？')
                       .then(_ => {
                             done();
                         })
                         //点击叉叉在点取消触发
                         .catch(_ => {
                             console.log(1);   
                         });
                 },

   //头像上传
      handleAvatarSuccess(res, file) {
        // console.log(1);
        // this.a=false;
        // console.log(this.a);
        this.hh()
        this.portraits(res);
            this.url1="http://localhost:3000/heads/temp/"
            console.log(  this.url1);
      },
      beforeAvatarUpload(file) {
        //  console.log(file)
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },

        //弹窗确认修改
        async  affirms(){
     const xx = await  this.amend_s();
     if(xx){
         this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.dialogVisible= false,
            this.amends(this.loginuserId)
     }
    // console.log(xx);
    
    }

  },
};
</script>

<style scoped>
.box-card_f{
    
   
}
 .box-card {
    margin: auto;
    width: 680px;
    height: 600px;
    display: flex;
    justify-content:center;
    background-color: #282828;
    color: wheat
  }
  .default_f{
      display: flex;
      justify-content: center
  }
  .default{
   width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .character_f{
      text-align: center;
          padding: 40px;
  }
  .button_f{
      display: flex;
      justify-content: center;
  }
  .btn{
      width: 200px;
  }

      /* 头像上传 */
     .avatar-uploader  {
     width: 150px;
    border: 1px dashed  #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
    border-radius: 50%;

  }

  .portrait{
   display: flex;
   justify-content: center;
   margin-bottom: 30px;
  }
</style>