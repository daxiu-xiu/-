const{createOrder,getOrder,revOrderById,classGetpet}=require('../../dao/orderDao/orderDao')

//生成订单
module.exports.createOrder = async function (order) {
    const data = await createOrder(order);
    return data;
}
//获取所有订单
module.exports.getOrder = async function (order) {
    const data = await getOrder(order);
    return data;
}
//通过订单的id删除一个订单
module.exports.revOrderById = async function (_id) {
    const data = await revOrderById(_id);
    return data;
}
//分类获取宠物
module.exports.classGetpet = async function () {
    const data = await classGetpet();
    return data;
}