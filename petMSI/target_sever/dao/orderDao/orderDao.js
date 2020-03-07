
const mongoose = require("mongoose");

//增加订单
module.exports.createOrder = async function (order) {
    let arr = []
    let data;
    for (let i = 0; i < order.length; i++) {
        //新增订单
        data = await mongoose.model("orderModel").create(order[i]);
        arr.push(data)
    }
    for (let j = 0; j < order.length; j++) {
        //删除购物车shoppingcartModel
        // console.log(order[j]._id)
        if (order[j]._id != 'undefined') {
            // console.log(11111111)
            data1 = await mongoose.model("shoppingcartModel").deleteOne({ _id: order[j]._id });

        }
    }
    return arr;
}
//getOrder获取所有订单

module.exports.getOrder = async function (userId) {
    const data = await mongoose.model("orderModel").find(userId)
        .populate('shopId');
    return data;
}
//通过订单的id删除一个订单
module.exports.revOrderById = async function (_id) {
    const data = await mongoose.model("orderModel").deleteOne(_id);
    return data;
}
//分类获取

module.exports.classGetpet = async function () {
    const data = await mongoose.model("commodityModel").find({ type: '猫' })

    const data1 = await mongoose.model("commodityModel").find({ type: '狗' })
    const data2 = await mongoose.model("commodityModel").find({ type: '仓鼠' })

    const arr = [{ name: '猫', pets: data },
    { name: '狗', pets: data1 },
    { name: '仓鼠', pets: data2 }]

    return arr;
}