var express = require('express');
var router = express.Router();

const {obtains,remove_S,looks} = require("../service/usercontrol/usercontrol.js")

router.get('/obtain', async function (req, res, next) {
        // console.log(req.query);
        
    res.send(await obtains(req.query));
  });


    //删除
    router.delete('/:_id', async function (req, res, next) {
        // console.log(req.param)
      res.send(await remove_S(req.params));
    });


    //查看门店数据
    router.post('/looks', async function (req, res, next) {
      // console.log(req.param)
    res.send(await looks(req.body));
  });
  

module.exports = router;