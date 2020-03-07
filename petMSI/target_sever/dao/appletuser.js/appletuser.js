const mongoose = require("mongoose");



module.exports.registers_s = async function (user) {
    console.log(user)
    const data = await mongoose.model("Appletuser").create(user);
    return data;
}

//注册1验证
module.exports.repeatedverification = async function (user) {
    const data = await mongoose.model("Appletuser").find(user);
    return data;
}

//登录
module.exports.shoplogin = async function (user) {
    console.log(user);
    
    const data = await mongoose.model("Appletuser").find(user);
    return data
}


module.exports.getids = async function (user) {
    console.log(user);
    
    const data = await mongoose.model("Appletuser").find({_id:user.id});
    return data
}