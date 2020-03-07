var express = require('express');
var router = express.Router();
const { createOrder,getOrder,revOrderById ,classGetpet} = require('../service/orderService/orderService')
//新增订单
router.post('/createOrder', async function (req, res, next) {
    // console.log(req.body)
    res.send(await createOrder(req.body));

});
//获取所有订单
router.get('/getOrder', async function (req, res, next) {
    res.send(await getOrder(req.query));
});
//通过订单的id删除一个订单
router.post('/revOrderById', async function (req, res, next) {
    res.send(await revOrderById(req.query));
});

//分类获取宠物
router.get('/classGetpet', async function (req, res, next) {
    res.send(await classGetpet());
});
module.exports = router;
