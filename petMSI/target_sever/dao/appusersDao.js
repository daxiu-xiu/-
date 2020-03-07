const mongoose = require("mongoose");


//注册验证
module.exports.isregister = async function (user) {
    const data = await mongoose.model("appusersModel").find(user);
    return data;
}
//注册提交
module.exports.register = async function (user) {
    // console.log(user)
    const data = await mongoose.model("appusersModel").create(user);
    return data;
}
//登录验证
module.exports.login = async function (user) {

    const data = await mongoose.model("appusersModel").find(user);
    // console.log(data)
    return data
}