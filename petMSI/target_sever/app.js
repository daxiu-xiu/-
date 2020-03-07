var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./dao/data_base/data_base.js")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminsRouter = require('./routes/admins')
var jurisdictionRouter = require("./routes/jurisdiction")
var AdministratorRoute = require("./routes/Administrator")
//用户管理
var usercontrolRoute = require("./routes/usercontrol")
//个人中心
var APPLICATIONRoute = require("./routes/APPLICATION")
//引入订单
var orderRouter = require("./routes/order")
var appusersRouter = require('./routes/appusers')
var commodityRouter = require("./routes/commodity");
// 店铺
var shopsRouter = require("./routes/shops");

//平台管理的门店
var PlatformManagedStoreRouter = require("./routes/PlatformManagedStore");

//小程序用户
var appletuserRouter =require("./routes/appletuser.js")
//购物车
var shoppingRouter = require("./routes/shopping")
//订单
var dingdanRouter = require("./routes/dingdan")


//引入购物车
var shoppingcartRouter =require("./routes/shoppingcart")


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jurisdiction', jurisdictionRouter);
app.use('/Administrator', AdministratorRoute);
//用户管理
app.use('/usercontrol', usercontrolRoute);
//个人中心
app.use('/APPLICATION', APPLICATIONRoute);
//小程序用户
app.use('/appletuser', appletuserRouter);
//购物车
app.use('/shopping', shoppingRouter);
//订单
app.use('/dingdan', dingdanRouter);





//购物车
app.use('/shoppingcart', shoppingcartRouter);

//引入订单
app.use('/order', orderRouter);

//引入平台管理门店集合
app.use('/PlatformManagedStore', PlatformManagedStoreRouter);
app.use("/", indexRouter);


//引入用户管理员
app.use("/admins", adminsRouter);
// catch 404 and forward to error handler
//引入商品管理
app.use("/commodity", commodityRouter);
//引入app用户
app.use("/appusers", appusersRouter);

app.use("/shops", shopsRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8080, () => {
  console.log("8080端口启动成功");
});
