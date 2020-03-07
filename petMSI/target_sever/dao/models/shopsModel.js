//门店model
// /引入mongoose
const mongoose = require("mongoose");

//定义数据集合结构
const shopsSchema = new mongoose.Schema({
    name: String,       // 名称
    address: String,    // 地址
    telephone: String,  // 电话
    desc: String,
    // 所属门店管理员 id      // 门店描述
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminsModel'   // 关联的模型
    },
    // 店铺照片
    imageName: Array,
    target:String,
})

//定义数据模型
// adminsModel"：数据模型名称
// adminsSchema 数据结构
// "admins"：数据模型对应的数据库中的数据集合名称
mongoose.model("shopsModel", shopsSchema, "shops");