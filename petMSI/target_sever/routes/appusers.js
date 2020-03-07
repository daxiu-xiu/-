var express = require('express');
var router = express.Router();
//小程序用户登录注册后台


const {
  isregister,
  register,
  login,
  // Oauthlogin
} = require('../service/appusersService')

//注册验证账号是否已经被注册
router.post('/isregister', async function (req, res, next) {
  res.send(await isregister(req.body));
});

//注册提交
router.post('/register', async function (req, res, next) {
  res.send(await register(req.body));
});

//商店登录验证
router.post('/login', async function (req, res, next) {
  // console.log(req.body)
  res.send(await login(req.body));
});

// router.post('/Oauthlogin', async function (req, res, next) {
//   console.log(req.body)
//   // res.send(await Oauthlogin(req.body));
// });



// router.get('/code', async function (req, res, next) {
//   console.log(req.query)
//   // res.send(await Oauthlogin(req.body));
// });
module.exports = router;
