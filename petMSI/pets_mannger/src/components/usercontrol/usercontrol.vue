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
             <el-button type="primary"  @click="examine(scope.$index, scope.row)">{{deng?"隐藏门店":"查看门店"}}</el-button>
          <el-button
            icon="el-icon-delete-solid"
            type="danger"
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


        <!-- 走马灯 -->
        <div v-if="deng">
  <el-carousel :interval="4000" type="card" >
    <el-carousel-item v-for="(item,index) in lokkarr" :key="index">
      <!-- <h3 class="medium">{{ item }}</h3> -->
      <!-- <h2>{{}}</h2> -->
   <div class="carousel_f">
         <div class="carouselimg" >
               <img
            class="imageNames"
            :src="`http://localhost:3000/upload/shops_imgs/${item.imageName[0]}`"
          />
         </div>
         <div class="carousel_FF">
             <!-- <i class="el-icon-delete"></i> -->
              <h2  class="el-icon-s-home">店铺名称 : {{item.name}}</h2>
              <h2 class="el-icon-mouse">状态 : {{item.target}}</h2>
              <h2 class="el-icon-phone-outline">手机号 : {{item.telephone}}</h2>
              <h2 class="el-icon-map-location">地址 : {{item.address}}</h2>
              <h2 class="el-icon-toilet-paper xx">简介 : {{item.desc}}</h2>
         </div>
   </div>
    </el-carousel-item>
  </el-carousel>
        </div>
   
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions,mapMutations } = createNamespacedHelpers("usercontrol");
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
      //走马丁状态
        deng:false,
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
    ...mapState(["arr","options","lokkarr"])
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
    ...mapActions(["gain", "removes","examines"]),
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
    //查看
    examine(a,b){
        this.deng=!this.deng
        this.examines(b._id)
            console.log(b._id);
    },
  

    //搜索
    imports(){
      console.log(1)
      this.gain();
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

  /* 走马丁样式 */
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    /* line-height: 200px; */
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .carousel_f{
      display: flex;
  }
  .imageNames{
      width: 300px;
      height: 300px;
  }
  .carousel_FF{
      display: flex;
      flex-direction: column;
  }
  .carouselimg{
      margin-right: 30px
  }
  .xx{
     white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
</style>