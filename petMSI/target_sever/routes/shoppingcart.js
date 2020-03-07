var express = require('express');
var router = express.Router();
const {addShoppingAart,getShopAartById,updateCount,revShoppingCar}=require('../service/shoppingcarServe/shoppingcarServe')
//购物车后台
/* GET home page. */

//生成购物车（增加购物车）
router.post('/addShoppingAart', async function (req, res, next) {
    // console.log(req.body)
    res.send(await addShoppingAart(req.body));

});
//根据用户的id获取购物车的明细
router.get('/getShopAartById', async function (req, res, next) {
    // console.log(req.body)
    res.send(await getShopAartById(req.query));

});
//购物车里面用户点击数量改变，也相对应改变购物车的后台数据
router.post('/updateCount', async function (req, res, next) {
    // console.log(req.body)
    res.send(await updateCount(req.body));

});
//删除购物车事件
router.post('/revShoppingCar', async function (req, res, next) {
    // console.log(req.body)
    res.send(await revShoppingCar(req.body));

});
module.exports = router;