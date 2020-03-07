const mongoose = require("mongoose");



//注册1验证
module.exports.repeatedverification = async function (user) {
    const data = await mongoose.model("adminsModel").find(user);
    return data;
}

module.exports.registration = async function (user) {
    // console.log(user)
    const data = await mongoose.model("adminsModel").create(user);
    return data;
}
//商店登录验证
module.exports.shoplogin = async function (user) {
    const data = await mongoose.model("adminsModel").find(user);
    return data
}
//平台登录验证
module.exports.platformlogin = async function (user) {

    const data = await mongoose.model("adminsModel").find(user);
    console.log(data)
    return data
}
//根据管理员用户的登录id拿用户数据
module.exports.getLoginById = async function (_id) {
    const data = await mongoose.model("adminsModel").find(_id);
    return data
}