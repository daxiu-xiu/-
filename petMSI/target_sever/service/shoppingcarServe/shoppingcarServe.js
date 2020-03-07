
const {addShoppingAart,getShopAartById,updateCount,revShoppingCar}=require('../../dao/shoppingcarDao/shoppingcarDao')

//增加购物车
module.exports.addShoppingAart = async function (addshopart) {
    const data = await addShoppingAart(addshopart);
    return data;
}
//根据用户的id获取购物车的明细
module.exports.getShopAartById = async function (userId) {
    const data = await getShopAartById(userId);
    return data;
}
//购物车里面用户点击数量改变，也相对应改变购物车的后台数据
module.exports.updateCount = async function (Idcount) {
    const data = await updateCount(Idcount);
    return data;
}
//删除购物车事件
module.exports.revShoppingCar = async function (_id) {
    const data = await revShoppingCar(_id);
    return data;
}