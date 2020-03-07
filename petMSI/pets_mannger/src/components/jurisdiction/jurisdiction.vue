<template>
    <div>

<!-- 搜索下拉 -->
  <el-select  @input="imports"  v-model="arr.value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

<!-- 搜索输入框 -->
<el-input v-model="arr.text" class="searchinput" placeholder="可以通过姓名，年龄，性别等等进行搜索"></el-input>


        <!-- 表格 -->
        <el-table 
    :data="arr.accounts"
    border
    style="width: 100%">
    <!-- 姓名 -->
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <!-- 年龄 -->
    <el-table-column
      prop="age"
      label="年龄"
      width="180">
    </el-table-column>
    <!-- 性别 -->
      <el-table-column
      prop="gender"
      label="性别"
      width="180">
    </el-table-column>
    <!-- 申请目标 -->
      <el-table-column
      prop="position"
      label="申请目标"
      width="180">
    </el-table-column>
    <!-- 手机号 -->
        <el-table-column
      prop="phone"
      label="手机号"
      width="180">
    </el-table-column>

    <!-- 操作 -->
    <el-table-column
      label="操作">
       <template slot-scope="scope">
        <el-button icon="el-icon-check" type="success" @click="agree(scope.$index, scope.row)" round>同意</el-button>
        <el-button icon="el-icon-close" type="danger" @click="refuse(scope.$index, scope.row)" round>拒绝</el-button>
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
        :total="arr.totalCount-0">
    </el-pagination>
  
    </div>
</template>

<script>
import {createNamespacedHelpers} from "vuex";
const {mapState,mapActions} = createNamespacedHelpers("jurisdiction")
     export default {
    data() {
      return {
      }
    },
    mounted(){
        this.gain()
    },
  
    watch:{
      "arr.text"(){
        console.log(this.arr.text)
        this.gain()
      }
    },

    methods:{
        ...mapActions(["gain","agrees","r_efuse"]),
        //处理每页显示条数事件
         handleSizeChange(val){
                //   console.log(val);
                  this.arr.pageSize=val
                   this.gain();    
                },
                //处理当前页数事件
        handleCurrentChange(val){
                    // console.log(val);
                    this.arr.currentPage=val;
                    this.gain()
                },
                //下拉列表切换事件
                imports(){
                    // console.log(111)   
                    this.gain()
                },
                //同意
               async agree(a,b){
                  const xx = await this.agrees(b._id)
                  if(xx.data){
                         this.$alert('成功同意！！！', '提示', {
                               confirmButtonText: '确定',
                         });
                           this.gain()
                  }
                },
                //拒绝
                         async refuse(a,b){
                      const xx = await this.r_efuse(b._id)
                        if(xx.data){
                         this.$alert('已拒绝！！！', '提示', {
                               confirmButtonText: '确定',
                         });
                           this.gain()
                  }
                }
    },
    computed:{
        ...mapState(["arr","options"])
    }
  }
</script>

<style scoped>
    .searchinput{
        width: 350px;
    }
</style>