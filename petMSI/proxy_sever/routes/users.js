var express = require('express');
var router = express.Router();


const rp = require("request-promise");

// 引入服务端认证，用于生成token
// const jwt = require("jsonwebtoken");


var { getEncAse192, getDecAse192 } = require("../utils/salt1.js");



//注册1验证
router.post('/repeatedverification', async function (req, res, next) {
  // console.log(1);
  let { account } = req.body;
  const data = await rp({
    method: "post",
    url: "http://localhost:8080/admins/repeatedverification",
    body: { account },
    json: true
  })
  res.send(data);
});


//注册2提交
router.post('/register', async function (req, res, next) {
  let { password } = req.body;
  //用引入的md5 进行密码加密
  newPassword = getEncAse192(password, "love");
  const data = await rp({
    method: "post",
    url: "http://localhost:8080/admins/register",
    body: { ...req.body, password: newPassword
     },
    json: true
  })
  // console.log(data)
  res.send(data);
});

//确认商店登录提交
router.post('/shoplogin', async function (req, res, next) {
  // console.log(req.body);
  let { password } = req.body;
  newPassword = getEncAse192(password, "love");
  const data = await rp({
    method: 'post',
    url: "http://localhost:8080/admins/shoplogin",
    body: { ...req.body, password: newPassword },
    json: true

  })

  if (data instanceof Array) {
    console.log(data)
    console.log(req.session)
    req.session.regenerate(function (err) {

      if (err) {
        console.log(err)
        return res.send({ code: 2, msg: '登录失败' });
      }
      // 将登录成功的id保存⾄至 session 中
      req.session.loginUser = data[0];
      res.send({ success: true });
    });
  }
  else if (data == '申请中') {
    res.send({
      success: '申请中'
    })
  }
  else {
    res.send({
      success: false
    })
  }
})
//确认平台登录提交
router.post('/platformlogin', async function (req, res, next) {
  // console.log(req.body);
  let { password } = req.body;
  newPassword = getEncAse192(password, "love");
  const data = await rp({
    method: 'post',
    url: "http://localhost:8080/admins/platformlogin",
    body: { ...req.body, password: newPassword },
    json: true

  })
  console.log(data)
  if (data instanceof Array) {
    req.session.regenerate(function (err) {
      if (err) {
        return res.send({ code: 2, msg: '登录失败' });
      }
      // 将登录成功⽤用户名保存⾄至 session 中
      req.session.loginUser = data[0];
      res.send({ success: true });
    });

  }
  else if (data == '申请中') {
    res.send({
      success: '申请中'
    })
  }
  else {
    res.send({
      success: false
    })
  }
})


//判断账号是否已经登录
router.get('/islogin', function (req, res, next) {
  var loginUser = req.session.loginUser;
  var isLogined = !!loginUser; // 转换为布尔值 
  res.send({
    isLogined: isLogined,
    name: loginUser || ''
  })
});

//退出登录
router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      res.send({ ret_code: 2, ret_msg: '退出登录失败' });
      return;
    }
    // req.session.loginUser = null;
    res.clearCookie('identityKey');
    res.send({ ret_code: 0, ret_msg: '退出登录成功' });
  });
});
module.exports = router;
