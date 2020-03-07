var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//引入cook
const session = require('express-session');
const FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var appusersRouter = require('./routes/appusers');
//上传商品图片
var uploadPetImageRouter=require('./routes/uploadPetImage')
//上传头像
var headsRouter=require('./routes/heads')


// var uploadPetImageRouter = require('./routes/uploadPetImage')

//引入验证token
// var jwtAuth = require('./utils/jwt');


// 配置代理服务器的请求转发
const proxy = require("http-proxy-middleware");
const options = {
  target: 'http://localhost:8080',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/'
  }
}

var app = express();




app.use(session({
  name: 'identityKey',
  secret: 'chyingp', // ⽤用来对session id相关的cookie进⾏行行签名
  store: new FileStore(), // 本地存储session(⽂文本⽂文件，也可以选择其他store，⽐比如
  // redis的)
  saveUninitialized: false, // 是否⾃自动保存未初始化的会话，建议false resave: false, // 是否每次都重新保存会话，建议false
  resave: false,
  cookie: {
    maxAge: 10 * 333300// 有效期，单位是毫秒 
  }
}));



app.use('/api', proxy(options));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//启用jwtAuth
// app.use(jwtAuth);


app.use('/', indexRouter);
app.use('/appusers', appusersRouter);
app.use('/users', usersRouter);
//上传商品图片
app.use('/uploadPetImage',uploadPetImageRouter)
//上传头像
app.use('/heads',headsRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});






app.listen(3000, () => console.log("代理服务器 3000 端口启动成功！"));

