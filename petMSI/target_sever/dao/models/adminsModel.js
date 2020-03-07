//管理员model
// /引入mongoose
const mongoose = require("mongoose");

//定义数据集合结构
const adminsSchema = new mongoose.Schema({
    account: String,   // 账号
    password: String,  // 密码
    name: String,      // 姓名
    age: String,       // 年龄
    gender: String,    // 性别
    phone: String,     // 手机号
    position: String,  // 职位（平台管理员/门店管理员）
    status: {
        type: String,
        default: '申请中' 
    },
    imageUrl: String   // 状态（申请中/已通过/未通过）

})

//定义数据模型
// adminsModel"：数据模型名称
// adminsSchema 数据结构
// "admins"：数据模型对应的数据库中的数据集合名称
mongoose.model("adminsModel", adminsSchema, "admins");