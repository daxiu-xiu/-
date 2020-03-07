

//购物车模版
// /引入mongoose
const mongoose = require("mongoose");

//定义数据集合结构
const shoppingcartSchema = new mongoose.Schema({
    count: String,//数量
    //关联门店
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shopsModel'   // 关联的模型
    },
    //关联用户
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appusersModel'
    },
    //关联商品
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commodityModel'
    },
    //宠物名字
    name:String,
    //宠物单价
    price:String,
    //宠物库存
    stock:String,
    //宠物图片
    img:String
})

//定义数据模型
// adminsModel"：数据模型名称
// adminsSchema 数据结构
// "admins"：数据模型对应的数据库中的数据集合名称

mongoose.model("shoppingcartModel", shoppingcartSchema, "shoppingcart");