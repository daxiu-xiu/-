//平台管理的门店后台请求
var express = require('express');
var router = express.Router();
// const { shopsByTarget ,delShopByid,agreeTarget,rejectTarget,getshops} = require('../service/PMS_service/PMS_service.js')
const { shopsByTarget, delShopByid, agreeTarget,
    rejectTarget, appPets, appshops,
    searchdata, getpetById,
    getpetBypetId, getshops
} = require('../service/PMS_service/PMS_service.js')

/* GET home page. */
//根据状态获取分页数据
router.get('/shopsByTarget', async function (req, res, next) {
    res.send(await shopsByTarget(req.query));

});
//删除事件。根据id
router.post('/delShopByid', async function (req, res, next) {
    console.log(req.body)
    res.send(await delShopByid(req.body));

});
//同意事件修改target
router.post('/agreeTarget', async function (req, res, next) {
    // console.log(req.body)
    res.send(await agreeTarget(req.body));

});
//拒绝事件
router.post('/rejectTarget', async function (req, res, next) {
    // console.log(req.body)
    res.send(await rejectTarget(req.body));
});



//小程序渲染宠物
router.get('/appPets', async function (req, res, next) {

    res.send(await appPets(req.query));

});
//小程序渲染宠物店
router.get('/appshops', async function (req, res, next) {
    res.send(await appshops(req.query));

});
//小程序的搜索页面事件
router.post('/searchdata', async function (req, res, next) {
    res.send(await searchdata(req.body));

});


//小程序通过一个店铺的id来获取所有的动物
router.get('/getpetById', async function (req, res, next) {
    res.send(await getpetById(req.query));

});
//小程序通过一个宠物的id来获取宠物的明细

router.get('/getpetBypetId', async function (req, res, next) {
    res.send(await getpetBypetId(req.query));

});


//获取店铺数据
router.get('/getshops', async function (req, res, next) {
    res.send(await getshops(req.query));
});



module.exports = router;
