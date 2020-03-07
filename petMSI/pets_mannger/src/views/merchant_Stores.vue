<template>
  <div>
    <header class="shops_title">
      <h2>店铺管理</h2>
      <el-button type="primary" @click="dialogVisible=true,btnTarget=true,title='新增店铺'">新增店铺</el-button>
      <!-- <el-button type="primary" @click="test">新增店铺</el-button> -->
    </header>
    <el-table :data="(allShops.ShopsData)" style="width: 100%" @row-dblclick="row_click">
      <el-table-column prop="imageName" label="描述图片">
        <template slot-scope="scope">
          <img
            :src="`http://localhost:3000/upload/shops_imgs/${allShops.ShopsData[scope.$index].imageName[0]}`"
            class="shopsImg"
          />
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="电话" prop="telephone"></el-table-column>
      <el-table-column label="简介" prop="desc"></el-table-column>
      <el-table-column label="状态" prop="target"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改店铺</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">申请删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="shops_changePages">
      <span class="shops_total">共{{allShops.totalCount}}条数据</span>
      <el-pagination
        @current-change="handleCurrent"
        background
        layout="prev, pager, next"
        :total="allShops.totalPages*10"
      ></el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="addShopsData" label-width="80px">
        <el-form-item label="店铺名称">
          <el-input v-model="addShopsData.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺电话">
          <el-input v-model="addShopsData.telephone"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址">
          <el-input v-model="addShopsData.address"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介">
          <el-input type="textarea" v-model="addShopsData.desc"></el-input>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            action="/uploadPetImage/addImage"
            list-type="picture-card"
            ref="upload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <template v-if="btnTarget">
            <el-button type="primary" @click="addBtn">确认增加</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="updatebtn">确认修改</el-button>
            <el-button @click="giveUpUpdate">取消</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- <el-progress type="circle" :percentage="100" status="success"></el-progress> -->
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState, mapActions } = createNamespacedHelpers(
  "shops_store"
);
export default {
  data() {
    return {
      // 弹窗头
      title: "",
      dialogVisible: false,
      btnTarget: false,
      dialogImageUrl: ""
    };
  },
  computed: {
    ...mapState(["addShopsData", "allShops"])
    // ...mapnStateAdminId(["loginuser"])
  },
  mounted() {
    // 将管理员id给仓库
    const admin = localStorage.getItem("loginuserId");
    this.add(admin);
    this.getAll_byId();
  },
  methods: {
    ...mapMutations(["add", "updateshops"]),
    ...mapActions([
      "addAsnyc",
      "getAll_byId",
      "deletebyId",
      "asnycupdateShops"
    ]),
    // 增加按钮
    addBtn() {
      // this.addShopsData.imageName = "";
      // console.log(this.addShopsData)
      this.dialogVisible = false;
      this.addAsnyc();
      // this.getAll_byId();
    },
    // 翻页获取当前页
    handleCurrent(newCurrent) {
      this.allShops.currentPage = newCurrent;
      this.getAll_byId();
    },
    // 修改
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.btnTarget = false;
      this.title = "修改店铺";
      this.updateshops(row);
      // console.log(index, row);
    },
    // 确认修改
    updatebtn() {
      this.dialogVisible = false;
      this.$refs.upload.clearFiles();
      this.asnycupdateShops();
    },
    // 取消修改
    giveUpUpdate() {
      this.dialogVisible = false;
      this.updateshops({
        name: "", // 名称
        address: "", // 地址
        telephone: "", // 电话
        desc: "",
        adminId: "",
        target: "",
        // 修改时候需要,修改与新增共用同一个弹窗页面
        _id: ""
        // 店铺照片
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.deletebyId(row._id);
      // this.getAll_byId();
    },
    // 行被点击
    row_click(row, column, event) {
      console.log(row,column,event.target);
      // const id = row._id;
      this.$router.push({
        path: `/system/shopscommdity/${row._id}/${row.name}`
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="css">
/* 分页 */
.shops_changePages {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 30px;
  position: absolute;
  bottom: 10px;
}
.el-pager li {
  width: 40px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
}
.el-pagination {
  width: 560px;
}
/* 箭头 */
.btn-prev {
  height: 40px !important;
}
.btn-next {
  height: 40px !important;
}
/* 总条数 */
.shops_total {
  font-size: 20px;
}
/* 店铺图片 */
.shopsImg {
  width: 140px;
  /* height: 100px; */
}
.shops_title {
  height: 76px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgb(238, 238, 238);
}
.shops_title > h2 {
  margin: 0;
  font-size: 24px;
  color: rgb(14, 144, 210);
}
.shops_title > .el-button {
  padding: 0;
  width: 70px;
  height: 40px;
}
/* 店铺简介框 */
.el-textarea__inner {
  min-height: 100px !important;
}
</style>