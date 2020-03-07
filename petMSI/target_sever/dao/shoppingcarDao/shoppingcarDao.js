
const mongoose = require("mongoose");



//增加购物车
module.exports.addShoppingAart = async function (addshopart) {
    const data = await mongoose.model("shoppingcartModel").create(addshopart);
    return data;
}
//根据用户的id获取它购物车明细
module.exports.getShopAartById = async function (userId) {
    // console.log(userId)
    const data = await mongoose.model("shoppingcartModel").find(userId)
    return data;
}

//购物车里面用户点击数量改变，也相对应改变购物车的后台数据

module.exports.updateCount = async function (Idcount) {
    let { _id, count } = Idcount
    // console.log(_id, count)
    return await mongoose.model("shoppingcartModel").update(
        { _id },
        { count })
}

//删除购物车事件
module.exports.revShoppingCar = async function (_id) {
    // console.log(_id)
    const data = await mongoose.model("shoppingcartModel").deleteOne(_id);
    return data;
}