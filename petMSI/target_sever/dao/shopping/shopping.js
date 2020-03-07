
const mongoose = require("mongoose");



module.exports.shopping = async function (shuju) {
    const data = await mongoose.model("shoppingModel").create(shuju);
    return data;
  };





  module.exports.getshopping = async function (shuju) {
    // 获取数据
    const accounts = await mongoose.model("shoppingModel")
    .find({userid:shuju.userid})
    return accounts
}


module.exports.adds = async function (shuju) {
    console.log(shuju);
    const data = await mongoose.model("shoppingModel").update({_id:shuju.commodityid},{ num:shuju.num})
    return data;
  };

  module.exports.jians = async function (shuju) {
    console.log(shuju);
    const data = await mongoose.model("shoppingModel").update({_id:shuju._id},{ num:shuju.num})
    return data;
  };


  module.exports.deletes = async function (shuju) {
    console.log(shuju);
    const data = await mongoose.model("shoppingModel").deleteOne({_id:shuju.id})
    return data;
  };

