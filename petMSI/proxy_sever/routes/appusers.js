var express = require('express');
var router = express.Router();


const rp = require("request-promise");


var { getEncAse192, getDecAse192 } = require("../utils/salt1.js");


//小程序用户注册提交
router.post('/register', async function (req, res, next) {
  let { password } = req.body;
  //用引入的md5 进行密码加密
  newPassword = getEncAse192(password, "love");
  const data = await rp({
    method: "post",
    url: "http://localhost:8080/appusers/register",
    body: { ...req.body, password: newPassword },
    json: true
  })
  res.send(data);
});

//小程序用户确认登录的提交
router.post('/login', async function (req, res, next) {
  // console.log(req.body);
  let { password } = req.body;
  newPassword = getEncAse192(password, "love");
  const data = await rp({
    method: 'post',
    url: "http://localhost:8080/appusers/login",
    body: { ...req.body, password: newPassword },
    json: true
  })
  res.send(data);
})

module.exports = router;