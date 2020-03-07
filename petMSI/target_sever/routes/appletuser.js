var express = require('express');
var router = express.Router();

const {registers_s,repeatedverification,shoplogin,getids} = require("../service/appletuser.js/appletuser.js")

//注册
router.post('/registers', async function (req, res, next) {
    console.log(req.body);
res.send(await registers_s(req.body));
});


//注册验证
router.post('/repeatedverification', async function (req, res, next) {
    res.send(await repeatedverification(req.body));
  });


  //登录
  router.post('/shoplogin', async function (req, res, next) {
    // console.log(req.body)
    res.send(await shoplogin(req.body));
  });

  //通过id获取账户数据
  router.post('/getid', async function (req, res, next) {
    // console.log(req.body)
    res.send(await getids(req.body));
  });
  

module.exports = router;
