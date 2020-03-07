var express = require("express");
var router = express.Router();

const rq = require("request-promise");

const {
  uploadFiles,
  moveFiles,
  removeFiles
} = require("../utils/uploadFiles.js");

const m = uploadFiles({
  path: "./public/upload/temp",
  key: "file"
});
//上传新增
let imageName = []; //用来保存图片名字

//修改图片
let changeImage = [];

//新增宠物
router.post("/addImage", m, function (req, res, next) {
  imageName.push(...req.files.map(item => item.filename));
  res.send(true);
});

// 店铺图片确认新增
router.get("/addShopsImgs", async function (req, res, next) {
  const {
    name, // 名称
    address, // 地址
    telephone, // 电话
    desc,
    // 所属门店管理员 id      // 门店描述
    adminId,
    target } = req.query;
  // console.log(req.query);
  // console.log("~~~~~~~~~~~~~~~~~~~~~~", imageName);
  for (let item of imageName) {
    //如果为多张图片，图片的名字需单独保存，因此要遍历
    moveFiles({
      fromPath: "./public/upload/temp",
      toPath: "./public/upload/shops_imgs",
      filename: item //图片的名字
    });
  }
  const data = await rq({
    method: "post",
    url: "http://localhost:8080/shops/add_shops",
    body: {
      name, // 名称
      address, // 地址
      telephone, // 电话
      desc,
      // 所属门店管理员 id      // 门店描述
      adminId,
      imageName,
      target
    },
    json: true
  });
  removeFiles("./public/upload/temp");
  imageName = []; //将图片名字清空，可以多次上传
  res.send(data);
});
// 店铺图片确认修改
router.post("/updateShops", async function (req, res, next) {
  const {
    name, // 名称
    address, // 地址
    telephone, // 电话
    desc,
    // 所属门店管理员 id      // 门店描述
    adminId,
    _id,
    target } = req.body;
  // console.log(req.query);
  console.log("~~~~~~~~~~~~~~~~~~~~~~", imageName);
  for (let item of imageName) {
    //如果为多张图片，图片的名字需单独保存，因此要遍历
    moveFiles({
      fromPath: "./public/upload/temp",
      toPath: "./public/upload/shops_imgs",
      filename: item //图片的名字
    });
  }
  const data = await rq({
    method: "post",
    url: "http://localhost:8080/shops/add_shops",
    body: {
      name, // 名称
      address, // 地址
      telephone, // 电话
      desc,
      // 所属门店管理员 id      // 门店描述
      adminId,
      imageName,
      target,
      _id//店铺id
    },
    json: true
  });
  removeFiles("./public/upload/temp");
  imageName = []; //将图片名字清空，可以多次上传
  res.send(data);
});

router.get("/addImageTrue", async function (req, res, next) {
  const {
    type,
    name,
    age,
    color,
    inventory,
    price,
    gender,
    shopsID,
    adminID
  } = req.query;
  for (let item of imageName) {
    //如果为多张图片，图片的名字需单独保存，因此要遍历
    moveFiles({
      fromPath: "./public/upload/temp",
      toPath: "./public/upload/images",
      filename: item //图片的名字
    });
  }
  const data = await rq({
    method: "post",
    url: "http://localhost:8080/commodity/add",
    body: {
      type,
      name,
      age,
      color,
      inventory,
      price,
      gender,
      imageName,
      shopsID,
      adminID
    },
    json: true
  });
  removeFiles("./public/upload/temp");
  imageName = []; //将图片名字清空，可以多次上传
  res.send(data);
});

//修改宠物

//修改的路径

router.post("/changeImage", m, function (req, res, next) {
  // console.log("~~~~~~~~~~~~~~3213213");

  changeImage.push(...req.files.map(item => item.filename));

  
  res.send(req.files.map(item => item.filename));
});

router.get("/updataPetTrue", function(req, res, next) {
  const {
    _id,
    type,
    name,
    age,
    color,
    inventory,
    price,
    gender,
    shopsID
  } = req.query;
  // console.log("~~~~~~~~~~~~~~~~~~~~~~", req.query);
  // console.log();

  //如果没有修改图片，上传的图片就是原来的
  if (changeImage.length < 1) {
    changeImage = [...req.query.imageName];
    change(
      _id,
      type,
      name,
      age,
      color,
      inventory,
      price,
      gender,
      changeImage,
      shopsID
    );
  } else {
    for (let item of changeImage) {
      //如果为多张图片，图片的名字需单独保存，因此要遍历
      moveFiles({
        fromPath: "./public/upload/temp",
        toPath: "./public/upload/images",
        filename: item //图片的名字
      });
    }
    removeFiles("./public/upload/temp");
    change(
      _id,
      type,
      name,
      age,
      color,
      inventory,
      price,
      gender,
      changeImage,
      shopsID
    );
  }

  async function change(a, b, c, d, e, f, g, h, i, j) {
    // console.log("-------------------",a, b, c, d, e, f, g, h, i);

    const data = await rq({
      method: "get",
      url: "http://localhost:8080/commodity/updataPet",
      body: {
        _id: a,
        type: b,
        name: c,
        age: d,
        color: e,
        inventory: f,
        price: g,
        gender: h,
        imageName: i,
        a: 3213213,
        shopsID: j
      },
      json: true
    });
    changeImage = []; //将图片名字清空，可以多次上传
    // console.log("-------------------",a, b, c, d, e, f, g, h, i);
    // console.log("-------------------", a, b, c, d, e, f, g, h, i);

    res.send(data);
  }
});

module.exports = router;
