var express = require('express');
var router = express.Router();

const {shopping,getshopping ,adds,jians,deletes}  = require("../service/shopping/shopping.js")

//通过用户id获取购物车数据
router.post('/getshopping2', async function (req, res, next) {
    console.log(req.body);
res.send(await getshopping(req.body));
});



// 新增购物车数据
router.post('/shopping2', async function (req, res, next) {
    console.log(req.body);
res.send(await shopping(req.body));
});

//添加购物车数量
router.post('/add', async function (req, res, next) {
    // console.log(req.body);
res.send(await adds(req.body));
});

//减少数量
router.post('/jian', async function (req, res, next) {
    // console.log(req.body);
res.send(await jians(req.body));
});

//删除
router.post('/delete', async function (req, res, next) {
    // console.log(req.body);s
res.send(await deletes(req.body));
});

module.exports = router;
