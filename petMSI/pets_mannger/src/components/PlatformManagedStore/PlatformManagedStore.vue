<template>
  <div>
    <header class="shops_title header">
      <!-- 查询搜索框 -->
      <div style="display: flex">
        <el-select v-model="pageData.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input v-model="pageData.text" placeholder="请输入内容" @change="search"></el-input>
      </div>

      <!-- 根据用户的点击切换列表 -->
      <div class="chose">
        <template v-for="(item,index) in state">
          <span v-if="item.target==pageData.target" :key="index">{{item.text}}</span>
          <a href="#" v-else :key="index" @click.prevent="changetarget(item.target)">{{item.text}}</a>
        </template>
      </div>
    </header>
    <!-- 表头 -->
    <el-table
      :data="pageData.shops"
      style="width: 100%"
      align="center"
      :cell-style="cellStyle"
      :header-cell-style="rowClass"
    >
      <el-table-column label="店面图片" prop="imageNam">
        <template slot-scope="scope">
          <img style="width:120px;heigth:120px"
            :src="`http://localhost:3000/upload/shops_imgs/${pageData.shops[scope.$index].imageName[0]}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="门店名称" prop="name"></el-table-column>
      <el-table-column label="门店地址" prop="address"></el-table-column>
      <el-table-column label="门店描述" prop="desc"></el-table-column>
      <el-table-column label="门店联系电话" prop="telephone"></el-table-column>
      <el-table-column label="门店管理员" prop="adminId.name"></el-table-column>
      <!-- 正在营业的操作 -->
      <el-table-column label="门店操作" v-if="pageData.target=='正在营业'">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-edit"
            @click="update(scope.$index, scope.row)"
            size="small"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete-solid"
            size="small"
            @click="delShop(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>

      <!-- 申请开店的操作 -->
      <el-table-column label="门店操作" v-else-if="pageData.target=='申请开店'">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-circle-check"
            size="small"
            @click="agree(scope.$index, scope.row)"
          >同意</el-button>
          <el-button
            type="danger"
            icon="el-icon-circle-close"
            size="small"
            @click="reject(scope.$index, scope.row)"
          >拒绝</el-button>
        </template>
      </el-table-column>

      <!-- 申请删除的操作 -->
      <el-table-column label="门店操作" v-else-if="pageData.target=='申请删除'">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-circle-check"
            size="small"
            @click="agree(scope.$index, scope.row)"
          >同意</el-button>
          <el-button
            type="danger"
            icon="el-icon-circle-close"
            size="small"
            @click="reject(scope.$index, scope.row)"
          >拒绝</el-button>
        </template>
      </el-table-column>
      <!-- 这只是个历史记录，不能够做修改了 -->
      <el-table-column label="门店操作" v-else-if="pageData.target=='拒绝删除'">
        <el-button type="warning" icon="el-icon-circle-close" size="small">已拒绝关店</el-button>
      </el-table-column>

      <el-table-column label="门店操作" v-else>
        <el-button type="warning" icon="el-icon-circle-close" size="small">已拒绝开店</el-button>
      </el-table-column>
    </el-table>

    <!-- 翻页 -->
    <el-pagination
      :page-sizes="[1,3, 5, 8]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.currentPage-0"
      :page-size="pageData.pageSize-0"
      :total="pageData.totalCount-0"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <!-- 修改事件弹窗 -->
    <el-drawer
      title="修改店铺"
      size="70%"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      :with-header="false"
      ref="drawer"
    >
      <div class="updatecontent">
        <!-- 弹窗里面的内容 -->
        <h2>修改店铺</h2>
        <el-form ref="form" label-width="120px" class="forem">
          <el-form-item label="门店名称:">
            <el-input v-model="ShopsData.name"></el-input>
          </el-form-item>
          <el-form-item label="门店电话:">
            <el-input v-model="ShopsData.telephone"></el-input>
          </el-form-item>
          <el-form-item label="门店地址:">
            <el-input v-model="ShopsData.address"></el-input>
          </el-form-item>
          <el-form-item label="门店描述:">
            <el-input v-model="ShopsData.desc" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="门店图片:">
            <el-upload
              list-type="picture-card"
              action="/uploadPetImage/addImage"
              ref="upload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateBtn">修改</el-button>
            <el-button @click="off">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
//平台管理的门店。管理组件
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "PlatformManagedStore"
);

export default {
  data() {
    return {
      state: [
        { text: "营业列表", target: "正在营业" },
        { text: "新增请求", target: "申请开店" },
        { text: "删除请求", target: "申请删除" },
        { text: "拒绝删除记录", target: "拒绝删除" },
        { text: "拒绝新增记录", target: "拒绝开店" }
      ],
      options: [
        {
          value: "name",
          label: "门店名称"
        },
        {
          value: "address",
          label: "门店地址"
        },
        {
          value: "desc",
          label: "门店描述"
        },
        {
          value: "telephone",
          label: "门店联系电话"
        },
        {
          value: "adminId",
          label: "门店管理员"
        }
      ],
      value: "",
      drawer: false,
      direction: "rtl",
      dialog: false,
      dialogImageUrl: ""
    };
  },
  mounted() {
    //已进入页面。这个生命周期函数，就让它请求数据）（默认请求的是已通过的数据）
    this.getshops();
  },
  methods: {
    //点击取消事件
    off() {},
    //修改的弹窗事件
    update(index, row) {
      console.log(row);
      this.dialog = !this.dialog;
      this.changeShopsData(row);
    },
    //确认修改事件
    async updateBtn() {
      this.$refs.upload.clearFiles();
      // this.asnycupdateShops();
      const result = await this.asnycupdateShops();
      console.log(result);
      if (result.data.ok == 1) {
        this.$alert("修改成功！！！", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            (this.dialog = false), this.getshops();
          }
        });
      }
    },
    //图片事件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    //当前页显示多少条的页面改变
    handleSizeChange(val) {
      console.log(val);
      this.pageData.pageSize = val;
      this.getshops();
    },
    //当前页发生改变
    handleCurrentChange(val) {
      console.log(val);
      this.pageData.currentPage = val;
      this.getshops();
    },
    ...mapMutations(["changeShopsData"]),
    ...mapActions([
      "getshops",
      "asnycupdateShops",
      "delShopByid",
      "agreeAsync",
      "rejectAsync"
    ]),
    //删除事件,通过id去删除一个门店
    async delShop(index, row) {
      // 可以拿到该行的所有数据,在把id传到仓库删除
      const result = await this.delShopByid(row._id);
      console.log(result);
      if (result.data) {
        this.$alert("删除成功！！！", "删除", {
          confirmButtonText: "确定",
          callback: action => {
            this.getshops();
          }
        });
      }
    },

    //同意事件
    async agree(index, row) {
      let { _id, target } = row;
      const result = await this.agreeAsync({ _id, target });
      // console.log(result);
      if (result.data.ok == 1) {
        this.$alert("同意操作成功！！！", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.getshops();
          }
        });
      }
      // if()
    },
    //拒绝事件
    async reject(index, row) {
      let { _id, target } = row;
      const result = await this.rejectAsync({ _id, target });
      // console.log(result);
      if (result.data.ok == 1) {
        this.$alert("拒绝操作成功！！！", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.getshops();
          }
        });
      }
    },
    //搜索事件input输入框的失焦
    search() {
      this.getshops();
      // console.log(this.pageData.value, this.pageData.text);
    },

    //设置表格的样式，让表头和表格的文字都居中
    cellStyle({ row, colum, rowIndex, columIndex }) {
      return "text-align: center";
    },
    rowClass({ row, rowIndex }) {
      return "text-align: center";
    },

    changetarget(e) {
      //点击上面的a标签。然后改变状态值，重新获取渲染页面
      this.pageData.target = e;
      this.getshops();
    }
  },
  computed: {
    ...mapState(["pageData", "ShopsData"])
  }
};
</script>

<style lang="css" scoped>
.forem {
  width: 60%;
}
.header {
  display: flex;
  border-bottom: 1px solid rgb(222, 222, 222);
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
.chose > * {
  margin-right: 20px;
}
.updatecontent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img {
  width: 240px;
}
</style>