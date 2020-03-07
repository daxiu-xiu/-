var express = require('express');
var router = express.Router();

const {obtains,remove_S,amend_S,amend_Ss} = require("../service/Administrator.js/Administrator.js")

//获取
router.get('/obtain', async function (req, res, next) {
    // console.log(req.query);
    
    res.send(await obtains(req.query));
  });


  //删除
  router.delete('/:_id', async function (req, res, next) {
      // console.log(req.param)
    res.send(await remove_S(req.params));
  });


  //修改1
  router.get("/amends",async function (req, res, next){
    res.send(await amend_S(req.query));
  })
  //修改2
  router.put('/', async function (req, res, next) {
    console.log(req.body);
    res.send(await amend_Ss(req.body.amendarr));
  });

module.exports = router;