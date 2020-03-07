var express = require('express');
var router = express.Router();

const {obtains,amend_Ss} = require("../service/APPLICATION/APPLICATION.js")

//获取
router.get('/obtain', async function (req, res, next) {
    console.log(req.query);
    res.send(await obtains(req.query));
  });



  
//修改
router.put('/', async function (req, res, next) {
    // console.log(req.body,"++++++++++++++");
    res.send(await amend_Ss(req.body.arr));
  });


module.exports = router;
