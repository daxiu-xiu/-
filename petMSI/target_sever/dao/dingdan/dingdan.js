const mongoose = require("mongoose");




module.exports.getdingdans = async function (shuju) {

    let arr=[]
    // console.log(shuju);
      for(let i=0;i<shuju.length;i++){
            const data = await mongoose.model("dingdanModel").create(shuju[i])
            // console.log(shuju[i]);
            arr.push(data)
            const data1 = await mongoose.model("shoppingModel").deleteOne({_id:shuju[i]._id})
    }

    return arr
  };



  module.exports.getdingdans1 = async function (shuju) {
    // 获取数据
    const accounts = await mongoose.model("dingdanModel")
    .find({userid:shuju.id})
    return accounts
}