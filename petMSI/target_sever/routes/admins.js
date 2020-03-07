var express = require('express');
var router = express.Router();

// 店铺管理员和平台管理员的后台请求
const { //注册
  registration, repeatedverification,
  //登录
  shoplogin,
  platformlogin,
  getLoginById

} = require("../service/adminsService")


//注册验证
router.post('/repeatedverification', async function (req, res, next) {
  res.send(await repeatedverification(req.body));
});

//注册提交
router.post('/register', async function (req, res, next) {
  res.send(await registration(req.body));
});

//商店登录验证
router.post('/shoplogin', async function (req, res, next) {
  // console.log(req.body)
  res.send(await shoplogin(req.body));
});


//平台登录验证
router.post('/platformlogin', async function (req, res, next) {
  // console.log(req.body)
  res.send(await platformlogin(req.body));
});

//根据管理员用户的登录id拿用户数据

router.post('/getLoginById', async function (req, res, next) {
  // console.log(req.body)
  res.send(await getLoginById(req.body));
});


module.exports = router;
