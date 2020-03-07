
const mongoose = require("mongoose");

//定义数据集合结构
const dingdan = new mongoose.Schema({
    //用户id
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appletuser'
      },
      //商品id
      commodityid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commodityModel'
      },
      //店铺id
      shopsid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shopsModel'
      },
      //数量
      num:String,
      //商品名字
      commodityname:String,
      //价格
      price:String,
      //商品图片
      cimageName:Array,  
      //店铺名字
      shopsname:String,
      //店铺电话
      shopstelephone:String,
      //收获人
      shouhuoren:String,
      //总价
    //   total:String,
    //   收获地址
    harvest:String,
    //收货人电话
      shouhuophone:String
});


mongoose.model("dingdanModel", dingdan, "dingdans");