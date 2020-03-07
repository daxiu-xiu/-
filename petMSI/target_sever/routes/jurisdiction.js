var express = require('express');
var router = express.Router();


const { application,application1,amends,refusess} = require("../service/jurisdiction/jurisdiction.js")

//获取数据
// router.get('/application', async function (req, res, next) {
//     res.send(await application());
//   });
  

  //获取数据2
router.get('/applications', async function (req, res, next) {
    console.log(req.query,"++++")
    res.send(await application1(req.query));
  });


//同意
router.post('/amend', async function (req, res, next) {
  console.log(111);
  
  res.send(await amends(req.body));
});

//拒绝
router.post('/refuses', async function (req, res, next) {
  res.send(await refusess(req.body));
});
  




module.exports = router;