//商品model
// /引入mongoose
const mongoose = require("mongoose");

//定义数据集合结构
const commoditySchema = new mongoose.Schema({
  type: String,
  name: String,
  gender: String,
  color: String,
  age: String,
  price: String,
  image: String,
  inventory: String,
  imageName: Array,
  // 店铺id
  shopsID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shopsModel"
    }
  ],
  //管理员id
  adminID: String
});

//定义数据模型
// commodityModel"：数据模型名称
// commoditySchema 数据结构
// "commodity"：数据模型对应的数据库中的数据集合名称
mongoose.model("commodityModel", commoditySchema, "commodity");
