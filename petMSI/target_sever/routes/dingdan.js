var express = require('express');
var router = express.Router();

const {getdingdans,getdingdans1} = require("../service/dingdan/dingdan.js")

//存订单数据
router.post('/getdingdan', async function (req, res, next) {
    // console.log(req.body.arr);
res.send(await getdingdans(req.body.arr));
});


//获取用户所有订单数据
router.post('/getdingdan1', async function (req, res, next) {
    // console.log(req.body.arr);
res.send(await getdingdans1(req.body));
});



module.exports = router;
