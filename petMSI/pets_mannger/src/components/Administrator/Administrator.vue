<template>
  <div>

    <!-- 搜索下拉 -->
     <el-select   v-model="arr.value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <!-- 搜索输入框 -->
  <el-input v-model="arr.text" @input="imports" class="searchinput" placeholder="请输入内容"></el-input>

    <el-table :data="arr.accounts" style="width: 100%" :row-class-name="tableRowClassName">
      <!-- 姓名 -->
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <!-- 年龄-->
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <!-- 性别-->
      <el-table-column prop="gender" label="性别" width="180"></el-table-column>
      <!-- 手机号 -->
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <!-- 状态 -->
      <el-table-column prop="status" label="状态" width="180"></el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-loading" type="primary" plain  @click="amend(scope.$index, scope.row)">修改</el-button>
          <el-button
            icon="el-icon-delete-solid"
            type="info"
            @click="remove(scope.$index, scope.row)"
            plain
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 翻页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="arr.currentPage-0"
      :page-sizes="[1,3, 5, 8]"
      :page-size="arr.pageSize-0"
      layout="total, sizes, prev, pager, next, jumper"
      :total="arr.totalCount-0"
    ></el-pagination>

    <!-- 抽屉 -->
         <el-drawer
  title="修改 !"
  :visible.sync="dialog"
  size="86%"
  direction="rtl"
  custom-class="demo-drawer"
   :with-header="false"
  ref="drawer"
  >


   <!-- 标题 -->
    <div class="titles">
        <span class="titlesfont">管理员管理</span>
    </div>
  <!-- 表单 -->
  <div class="demo-drawer__content">

        <!-- 头像上传 -->
        <div class="portrait">
          <el-upload
              class="avatar-uploader"
              action="/heads/addImage"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="amendarr.imageUrl" :src="url1+amendarr.imageUrl" class="avatar">
               <img  v-else src="../../assets/moren.jpg" class="avatar">
              <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </div>

    <el-form  :model="amendarr" :rules="rules" status-icon>
      <!-- 姓名 -->
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="amendarr.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 年龄 -->
       <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input v-model="amendarr.age" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item label="性别" :label-width="formLabelWidth">
      <el-radio label="男" v-model="amendarr.gender"></el-radio>
      <el-radio label="女" v-model="amendarr.gender"></el-radio>
      </el-form-item>
      <!-- 手机号 -->
       <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="amendarr.phone" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 状态 -->
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="amendarr.status" placeholder="哈喽">
          <el-option label="已通过" value="已通过"></el-option>
          <el-option label="申请中" value="申请中"></el-option>
           <el-option label="已拒绝" value="已拒绝"></el-option>
        </el-select>

      </el-form-item>
    </el-form>
    <div class="demo-drawer__footer">
    

       <el-button slot="reference" type="danger" @click="cancelForm" icon="el-icon-error" circle></el-button>
        <el-button class="xbtn" @click="affirms" icon="el-icon-ice-cream-round" type="warning">确认修改</el-button>
    </div>
  </div>
</el-drawer>

  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions,mapMutations } = createNamespacedHelpers("Administrator");
export default {
  data() {
    //验证手机号
       var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        }
        else if(!(/^1[3456789]\d{9}$/.test(value))){
           callback(new Error('请输入正确的手机号'));
        }
        else{
          callback();
        }
      }
    return {
      dialog: false,
      formLabelWidth: '80px',
      timer: null,
      url1:"",
   
       //表单验证
     rules: {
       //验证手机号
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ]
     }
    };
  },
  computed: {
    ...mapState(["arr","amendarr","options"])
  },
  methods: {
    //样式（类名）判断
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    ...mapActions(["gain", "removes","amends","amend_s"]),
    ...mapMutations(["portraits"]),

    //处理每页显示条数事件
    handleSizeChange(val) {
      //   console.log(val);
      this.arr.pageSize = val;
      this.gain();
    },
    //处理当前页数事件
    handleCurrentChange(val) {
      // console.log(val);
      this.arr.currentPage = val;
      this.gain();
    },

    //删除
    async remove(a, b) {
      const h = this.$createElement;
      const result = await this.removes(b._id);
      if (result) {
        //提示框
        this.$message({
          message: h("p", null, [h("i", { style: "color: red" }, "删除成功")])
        });
        this.gain();
      }
    },
    //修改
    amend(a,b) {
     this.dialog=!this.dialog;
     this.url1="http://localhost:3000/heads/tupian/"
     this.amends(b._id);
    },
  

    //抽屉确认修改
  async  affirms(){
     const xx = await  this.amend_s();
     if(xx){
         this.$message({
          message: '修改成功',
          type: 'success'
        });
              this.dialog = false;
              this.gain();
     }
    } , 
    //抽屉取消
    cancelForm() {
      this.dialog = false;
      clearTimeout(this.timer);
    },
    //搜索
    imports(){
      console.log(1)
      this.gain();
    },
           //头像上传
      handleAvatarSuccess(res, file) {
        console.log(res);
        this.portraits(res);
             this.url1="http://localhost:3000/heads/temp/"
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

    
  },

  mounted() {
    this.gain();
  }
};
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}


/* 抽屉样式 */
.demo-drawer__content{
  background-color: red  !important; 
}
.titles{
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
 padding: 30px;
 /* background-color: chartreuse */
}
.titlesfont{
  font-size: 30px;
  font-weight: bold
}
.demo-drawer__content{
  width: 600px;
  border: 1px solid;
  padding: 30px;
  margin: auto;
  margin-top: 30px;
}
.demo-drawer__footer{
  margin-left: 80px;
}
.xbtn{
  width: 167px;
}
/* 下拉 */
   .searchinput{
        width: 350px;
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