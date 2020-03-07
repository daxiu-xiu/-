<template>
  <div>
    <div class="searchT">
      <div class="allTitle">商家宠物管理</div>
      <div style="margin-top: 15px">
        <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
          <el-select
            v-model="value"
            style="width:120px"
            ref="typeChange"
            slot="prepend"
            placeholder="搜索类型"
          >
            <el-option label="类型" value="type"></el-option>
            <el-option label="名字" value="name"></el-option>
            <el-option label="毛色" value="color"></el-option>
            <el-option label="店铺" value="shop"></el-option>
            <el-option label="年龄" value="age"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchPet"></el-button>
        </el-input>
      </div>
    </div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="名字" prop="name"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="毛色" prop="color"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="店铺" prop="shopsID">
        <template slot-scope="scope">
          <!--  -->
          <div v-for="(item, index) in tableData[scope.$index].shopsID" :key="index">
            <span v-if="item.length>0">{{item[0].name}}</span>
            <span v-else>{{item.name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="样图" prop="imageName">
        <!-- 获取数组里的图片信息 -->
        <template slot-scope="scope">
          <img
            class="petImage"
            v-for="(item, index) in tableData[scope.$index].imageName"
            :key="index"
            :src="`http://localhost:3000/upload/images/${item}`"
            alt
          />
        </template>
      </el-table-column>
      <el-table-column label="库存" prop="inventory"></el-table-column>
      <el-table-column align="right">
        <div slot="header" class="addSearch">
          <el-button
            type="success"
            round
            size="small"
            show-close="false"
            style="margin-right:5px"
            @click="openAdd"
          >新增宠物</el-button>
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </div>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- @size-change="handleSizeChange"
    @current-change="handleCurrentChange"-->
    <div class="block">
      <el-pagination
        :current-page="page.currentPage"
        :page-sizes="[1, 2, 3, 5]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalCount"
        @current-change="current_change"
        @size-change="size_change"
      ></el-pagination>
    </div>

    <!-- 新增弹窗 -->
    <el-dialog
      title="新增宠物"
      :visible.sync="addPets"
      width="30%"
      height="800px"
      center
      class="abow_dialog"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="宠物类型">
          <el-select v-model="form.type" placeholder="请选择宠物类型" ref="petType">
            <el-option label="猫" value="猫"></el-option>
            <el-option label="狗" value="狗"></el-option>
            <el-option label="仓鼠" value="仓鼠"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="宠物名字">
          <el-input v-model="form.name" ref="petName"></el-input>
        </el-form-item>

        <el-form-item label="添加数量">
          <el-input v-model="form.number" ref="petNumber"></el-input>
        </el-form-item>

        <el-form-item label="宠物毛色">
          <el-input v-model="form.color" ref="petColor"></el-input>
        </el-form-item>

        <el-form-item label="宠物性别">
          <el-radio-group v-model="form.gender" ref="petGender">
            <el-radio label="GG"></el-radio>
            <el-radio label="MM"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="宠物价格">
          <el-input v-model="form.price" ref="petPrice"></el-input>
        </el-form-item>

        <el-form-item label="宠物年龄">
          <el-input v-model="form.age" ref="petAge"></el-input>
        </el-form-item>

        <el-form-item label="所属店铺">
          <el-select v-model="shopDataId" multiple placeholder="请选择店铺">
            <el-option
              v-for="item in shopData"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="宠物样图">
          <el-upload
            class="upload-demo"
            action="/uploadPetImage/addImage"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :multiple="true"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addPets = false">取消新增</el-button>
        <el-button type="primary" @click="add">确定新增</el-button>
      </span>
    </el-dialog>

    <!-- 修改抽屉 -->

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      :before-close="updataSure"
      ref="drawer"
      size="50%"
      direction="ltr"
    >
      <el-scrollbar style="height:100%">
        <div class="changeTitle">修改</div>
        <el-form ref="formChange" :model="formChange" label-width="80px">
          <el-form-item label="宠物类型">
            <el-select v-model="formChange.type" placeholder="请选择宠物类型" ref="petTypeC">
              <el-option label="猫" value="猫"></el-option>
              <el-option label="狗" value="狗"></el-option>
              <el-option label="仓鼠" value="仓鼠"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="宠物名字">
            <el-input v-model="formChange.name" ref="petNameC"></el-input>
          </el-form-item>

          <el-form-item label="添加数量">
            <el-input v-model="formChange.number" ref="petNumberC"></el-input>
          </el-form-item>

          <el-form-item label="宠物毛色">
            <el-input v-model="formChange.color" ref="petColorC"></el-input>
          </el-form-item>

          <el-form-item label="宠物性别">
            <el-radio-group v-model="formChange.gender" ref="petGenderC">
              <el-radio label="GG"></el-radio>
              <el-radio label="MM"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="宠物价格">
            <el-input v-model="formChange.price" ref="petPriceC"></el-input>
          </el-form-item>

          <el-form-item label="所属店铺">
            <el-select v-model="shopDataC"  multiple placeholder="请选择店铺">
              <el-option
                v-for="item in shopData"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 隐藏，保存图片数据 -->
          <el-form-item label>
            <el-input v-model="formChange.imageName" style="display:none"></el-input>
          </el-form-item>

          <el-form-item label="宠物年龄">
            <el-input v-model="formChange.age" ref="petAgeC"></el-input>
          </el-form-item>

          <el-form-item label="原样图">
            <el-image
              style="width:50px;"
              v-for="(item,index) in imageChange"
              :key="index"
              :src="`http://localhost:3000/upload/images/${item}`"
            ></el-image>

            <!-- <el-input v-model="form.image" ref="petImageC"></el-input> -->
          </el-form-item>

          <el-form-item label="修改样图">
            <el-upload
              class="upload-demo"
              action="/uploadPetImage/changeImage"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :multiple="true"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
          >{{ loading ? '提交中 ...' : '确 定修改' }}</el-button>
        </div>
      </el-scrollbar>
    </el-drawer>
    <!-- <div @click="close">点击下架</div> -->
  </div>
</template>



      

<script>
import axios from "axios";
//引入修改的抽屉
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "commodityStore"
);

export default {
  data() {
    return {
      //搜索框
      searchData: "",
      value: "",
      drawer: false,
      //商家
      shopDataId: [],
      //修改的上架
      shopDataC: [],
      //打开增加弹窗的
      addPets: false,
      //修改渲染时，图片名字保存
      imageChange: [],
      //修改的加载
      loading: false,
      timer: null
    };
  },
  computed: {
    ...mapState([
      "form",
      "fileList",
      "formChange",
      "tableData",
      "search",
      "imageName",
      "page",
      "shopData",
      "adminID"
    ])
  },
  //初始渲染，获取所有的
  mounted() {
    //获取本地存储的管理员id
    const admin = localStorage.getItem("loginuserId");
    // console.log(admin);

    //将管理员id
    this.getAdminIDM(admin);
    this.getAllAsnyc();
    //测试店铺id查所有信息
    // axios
    //   .get("api/commodity/searchBy_shopId", {
    //     params: {
    //       currentPage: 1,
    //       pageSize: 100,
    //       shopID: "5df106d6a3ed7f517cb3435f"
    //     }
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //    //商品信息
    //    // res.data.petData
    //   });

    // //测试商品id查信息
    // axios
    //   .get("api/commodity/searchBy_peyId", {
    //     params: {
    //       currentPage: 1,
    //       pageSize: 100,
    //       petID: "5df1dc31a24a3c3e04953411"
    //     }
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //     // 商品信息
    //     res.data.petData
    //     //店铺信息
    //     res.data.petData
    //   });

    //测试下架商品
  },
  methods: {
    // // 测试下架功能
    // close() {
    //   console.log(123);
    //   axios
    //     .get("api/commodity/closePet", {
    //       params: {
    //         petID: "5df1f4d5c462cf52140f5954", //商品id
    //         shopID: "5df1d3ce55d3110ff8ba5daf" //店铺id
    //       }
    //     })
    //     .then(res => {
    //       console.log(res.data);
    //     });
    // },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    ...mapMutations([
      "addM",
      "searchPetM",
      "deletePet",
      "currentPageChange",
      "updatapage",
      "getShopId",
      "getAdminIDM",
      "change"
    ]),
    ...mapActions([
      "addAsnyc",
      "getAllAsnyc",
      "deletePetAsnyc",
      "updataSureAsnyc",
      "searchPetAsnyc",
      "getShopIdAsnyc"
    ]),

    //获取所有宠物
    //新增宠物
    //打开弹窗，并渲染店铺
    openAdd() {
      // 打开弹窗
      // console.log(this.adminID);
      this.addPets = true;
      //请求店铺
      this.getShopId(this.adminID);
      this.getShopIdAsnyc();
    },

    //点击新增，关闭弹窗并发请求
    add() {
      (this.addPets = false),
        this.addM({
          type: this.$refs.petType.value,
          age: this.$refs.petAge.value,
          name: this.$refs.petName.value,
          color: this.$refs.petColor.value,
          inventory: this.$refs.petNumber.value,
          price: this.$refs.petPrice.value,
          gender: this.$refs.petGender.value,
          shopsID: this.shopDataId,
          adminID: this.adminID
        });

      this.addAsnyc();
      //新增后重新获取
      this.getAllAsnyc();
    },

    openLabe() {},
    // 修改渲染
    handleEdit(index, row) {
      //打开
      //请求店铺
      this.getShopId(this.adminID);
      this.getShopIdAsnyc();
      this.drawer = true;
      //渲染
      console.log(row);
      // console.log( row.shopsID[0].name);
      
      this.formChange.name = row.name;
      this.formChange.age = row.age;
      this.formChange.number = row.inventory;
      this.formChange.color = row.color;
      this.formChange.gender = row.gender;
      this.formChange.price = row.price;
      this.formChange.type = row.type;
      this.formChange._id = row._id;
      // this.shopDataC =row.shopsID[0].name;
      // this.formChange.inventory = row.number;
      //将图片信息保存在一个v-model中，用分隔符，后面传修改，没有进行图片修改的初始值
      this.formChange.imageName = [...row.imageName].join("&*!##$%$#%#$");

      this.imageChange = [...row.imageName];
    },
    //点击确认修改
    updataSure(done) {
      //加载效果
      if (this.loading) {
        return;
      }
      this.$confirm("确定要进行修改吗？")
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
            this.change(this.shopDataC);
            this.updataSureAsnyc();
            this.getAllAsnyc();
          }, 800);
        })
        .catch(_ => {});

      //传入后台修改值
      // console.log(this.shopDataId);
    },
    //点击取消修改
    cancelForm() {
      this.loading = false;
      this.drawer = false;
      clearTimeout(this.timer);
    },

    //当前页改变
    current_change(val) {
      this.currentPageChange(val);
      this.getAllAsnyc();
    },
    //每页显示条数发生改变
    //每页显示页数改变
    size_change(val) {
      this.updatapage(val);
      this.getAllAsnyc();
    },
    // 搜索
    //获取搜索类型

    searchPet() {
      const type = this.value;
      const value = this.searchData;
      this.searchPetM({ type, value });
      this.searchPetAsnyc();
    },
    //删除
    handleDelete(index, row) {
      this.deletePet(row._id);
      this.deletePetAsnyc();
      this.getAllAsnyc();
      // console.log(index, row._id);
    }
  }
};
</script>

<style scoped>
.allTitle {
  font-size: 28px;
  color: rgb(14, 144, 210);
}
.el-scrollbar__wrap {
  overflow-y: auto;
  overflow-x: hidden;
}
.el-scrollbar__wrap * {
  margin-bottom: 1px;
}
element.style {
  width: 90% !important;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.petImage11 {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100px;
}
.petImage11 img {
  width: 140px;
}
.addSearch {
  /* width: 600px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.abow_dialog {
  height: 750px;
}
.abow_dialog .el-dialog {
  margin: 0 auto !important;
  height: 90%;
  overflow: hidden;
}
.abow_dialog .el-dialog__body {
  position: absolute;
  left: 0;
  top: 54px;
  bottom: 0;
  right: 0;
  padding: 0;
  z-index: 1;
  overflow: hidden;
  overflow-y: auto;
}
.petImage {
  width: 80px;
}
.changeTitle {
  font-size: 40px;
  text-align: center;
}
.searchT {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
</style>