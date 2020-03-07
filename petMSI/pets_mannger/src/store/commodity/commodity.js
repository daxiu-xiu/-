import axios from "axios";
export default {
  namespaced: true,
  state: {
    //表单
    form: {
      type: "",
      name: "",
      delivery: false,
      type: [],
      age: "",
      number: "",
      desc: "",
      color: "",
      price: "",
      image: ""
    },
    formChange: {
      type: "",
      name: "",
      delivery: false,
      type: [],
      age: "",
      number: "",
      desc: "",
      color: "",
      price: "",
      gender: "",
      imageName: [],
      shopDataC:"",
      // inventory:"",
      _id: ""
    },
    imageName: [],
    fileList: [],
    // 宠物数据
    tableData: [],
    // 分页数据
    page: {
      // 当前页
      currentPage: 1,
      // 每页显示条数
      pageSize: 3,
      // 总条数
      totalCount: 10,
      // 总页数
      totalPages: 0
    },
    search: "",
    //新增数据
    addPetData: "",
    //删除的id
    deleteId: "",
    //查询的
    searchD: "",
    //管理员id
    adminID: "",
    //店铺信息
    shopsID: "",
    shopData: "",
    changeData: ""
  },
  getters: {},
  mutations: {
    //获取管理员id
    getAdminIDM(state, payload) {
      state.adminID = payload;
      // console.log(state.adminID);
    },
    //新增时请求店铺
    getShopId(state, payload) {
      state.shopsID = payload;
      // console.log(payload);
      
    },
    //获取店铺信息
    getShopData(state, payload) {
      state.shopData = payload;
      console.log(state.shopData);
    },
    //新增
    addM(state, payload) {
      // console.log(payload);

      state.addPetData = payload;
    },
    //修改的id
    change(state, payload) {
      state.changeData = payload;
      // console.log(state.changeData);
    },
    //获取所有
    getAllM(state, payload) {
      //将表格数据替换为actions里传过来的值
      state.tableData = payload.petData;
      state.page.currentPage = payload.currentPage - 0;
      state.page.pageSize = payload.pageSize - 0;
      state.page.totalCount = payload.totalCount;
      state.page.totalPages = payload.totalPages;

      // console.log(state.tableData);
    },
    //删除
    deletePet(state, payload) {
      state.deleteId = payload;
    },
    //修改当前页
    currentPageChange(state, payload) {
      state.page.currentPage = payload;
    },
    //修改每页显示条数
    updatapage(state, payload) {
      state.page.pageSize = payload;
    },
    //搜索
    searchPetM(state, payload) {
      // console.log(payload);
      state.searchD = { ...payload };
      // console.log(state.searchD.type);
      // state.page.value = payload;
    }
  },
  actions: {
    //获取所有店铺信息
    getShopIdAsnyc(context) {  
      axios
        .get("api/shops/get_byId", {
          params: {
            _id: context.state.shopsID
          }
        })
        .then(res => {
          // console.log(res);
          const okShop = res.data.ShopsData.filter(
            item => item.target != "申请中"
          );
          context.commit("getShopData", okShop);
        });
    },
    //新增
    addAsnyc(context) {
      axios
        .get("/uploadPetImage/addImageTrue", {
          params: {
            type: context.state.addPetData.type,
            name: context.state.addPetData.name,
            age: context.state.addPetData.age,
            color: context.state.addPetData.color,
            inventory: context.state.addPetData.inventory,
            price: context.state.addPetData.price,
            gender: context.state.addPetData.gender,
            shopsID: context.state.addPetData.shopsID,
            adminID: context.state.addPetData.adminID
          }
        })
        .then(res => {
          console.log(res);
        });
    },

    //获取所有
    getAllAsnyc(context) {
      axios
        .get("api/commodity/getStart", {
          params: {
            currentPage: context.state.page.currentPage,
            pageSize: context.state.page.pageSize,
            adminID: context.state.adminID
          }
        })
        .then(res => {
          // console.log(res.data);
          context.commit("getAllM", res.data); //传将获取到的数据传给函数getAllM
        });
    },

    //修改
    updataSureAsnyc(context) {
      // console.log(context.state.changeData);
      axios
        .get("/uploadPetImage/updataPetTrue", {
          params: {
            ...context.state.formChange,
            inventory: context.state.formChange.number,
            imageName: context.state.formChange.imageName.split("&*!##$%$#%#$"),
            shopsID: context.state.changeData
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    //删除
    deletePetAsnyc(context) {
      axios
        .get("api/commodity/deletePet", {
          params: {
            _id: context.state.deleteId
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    //查询
    searchPetAsnyc(context) {
      axios
        .get("api/commodity/searchPet", {
          params: {
            ...context.state.searchD,
            currentPage: context.state.page.currentPage,
            pageSize: context.state.page.pageSize
          }
        })
        .then(res => {
          console.log(res.data);
          context.commit("getAllM", res.data);
        });
    }
  }
};
