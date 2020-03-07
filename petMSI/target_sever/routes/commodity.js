// 商品
var express = require("express");
var router = express.Router();
const {
  addService,
  getStartService,
  deletePetService,
  updataPetService,
  searchPettService,
  searchBy_shopIdService,
  searchBy_petIdService,
  closePetService,
  tens,
  searchcommdity,
  commoditys,
  tens1,
  searchs
} = require("../service/commodityService/commodityService.js");

//新增
router.post("/add", async function(req, res, next) {
  // console.log(req.body);
  const data = await addService(req.body);
  res.send(data);
});

//渲染初始界面
router.get("/getStart", async function(req, res, next) {
  // console.log(req.query);

  const data = await getStartService(req.query);
  res.send(data);
});
module.exports = router;

//删除
router.get("/deletePet", async function(req, res, next) {
  const data = await deletePetService(req.query);
  res.send(data);
});

//修改
router.get("/updataPet", async function(req, res, next) {
  console.log("-----------------------",req.body);
  const data = await updataPetService(req.body);
  res.send(data);
});

//查询
router.get("/searchPet", async function(req, res, next) {
  // console.log(req.query);

  const data = await searchPettService(req.query);
  res.send(data);
});
router.get("/searchcommdity", async function(req, res, next) {
  // console.log(req.query);

  const data = await searchcommdity(req.query);
  res.send(data);
});

//通过店铺id，获取所有商品

router.get("/searchBy_shopId", async function(req, res, next) {
  // console.log(req.query);

  const data = await searchBy_shopIdService(req.query);
  res.send(data);
});

//通过商品id获取该商品
router.get("/searchBy_peyId", async function(req, res, next) {
  // console.log(req.query);

  const data = await searchBy_petIdService(req.query);
  res.send(data);
});

//店铺下架商品，商品信息改动
router.get("/closePet", async function(req, res, next) {
  const data = await closePetService(req.query);
  res.send(data);
});



//获取lol个商品
router.post("/six", async function(req, res, next) {
  const data = await tens(req.body);
  res.send(data);
});

//通过id获取商品
router.get("/commoditys", async function(req, res, next) {
  const data = await commoditys(req.query);
  res.send(data);
});

//分类找数据
router.post("/six1", async function(req, res, next) {
  const data = await tens1(req.body);
  res.send(data);
});


//搜索拿数据
router.post("/searchs", async function(req, res, next) {
  const data = await searchs(req.body);
  res.send(data);
});
