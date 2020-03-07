var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/petsMannger';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', function () {
    console.log('连接到数据库' + dbURI);
});
// 引入模型
//引入管理员Model
require('../models/adminsModel.js')
// 引入门店集合
require('../models/shopsModel.js')
require('../models/appusersModel.js')
require('../models/commodity.js')
//引入用户
require('../models/appletuser.js')
//购物车 强
require("../models/shoppingM.js")
//订单 强
require("../models/dingdanM.js")
//引入购物车  秀
require('../models/shoppingcartModel.js')
//引入订单集合 秀
require('../models/order.js')
