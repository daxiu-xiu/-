//管理员model
// /引入mongoose
const mongoose = require("mongoose");

//定义数据集合结构
const appusersSchema = new mongoose.Schema({


    username: {
        type: String,
        default: '' // 真实姓名
    },
    password: {
        type: String,
        default: ''  // 联系电话
    },
    name: {
        type: String,
        default: '' // 真实姓名
    },
    phone: {
        type: String,
        default: ''  // 联系电话
    },
    image: {
        type: String,
        default: ''  // 头像
    },


    appKey: {
        type: String,
        default: '' // 真实姓名
    },
    customerId: {
        type: String,
        default: ''  // 联系电话
    },
    nickName: {
        type: String,
        default: ''  // 头像
    },
    headUrl: {
        type: String,
        default: ''  // 头像
    },

})

//定义数据模型
// appusersModel"：数据模型名称
// appusersSchema 数据结构
// "appusers"：数据模型对应的数据库中的数据集合名称
mongoose.model("appusersModel", appusersSchema, "appusers");