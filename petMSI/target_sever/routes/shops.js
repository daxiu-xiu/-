var express = require('express');
var router = express.Router();
const { add_shops,get_allshops,get_byId,delete_byId} = require('../service/shops_serve.js')
/* GET home page. */
router.post('/add_shops', async function (req, res, next) {
    console.log(req.body)
    res.send(await add_shops(req.body))
});
router.get('/get_allshops', async function (req, res, next) {
    res.send(await get_allshops())
})
// 通过管理员ID找到所有名下店铺
router.get('/get_byId', async function (req, res, next) {
    res.send(await get_byId(req.query))
})
// 申请删除修改状态
router.post('/delete_byId', async function (req, res, next) {
    // console.log(req.query)
    res.send(await delete_byId(req.body))
})
module.exports = router;