
const {
    //注册
    registration, repeatedverification,
    //登录
    shoplogin,
    platformlogin,
    getLoginById
} = require("../dao/adminsDao")




//注册1验证
module.exports.repeatedverification = async function (user) {
    let data = await repeatedverification(user);
    if (data.length > 0) {
        return true;
    }
    return false;
}

//注册2提交
module.exports.registration = async function (user) {
    const data = await registration(user);
    if (data._id) {
        return true;
    }
    else {
        return false;
    }
}
//商店登录验证
module.exports.shoplogin = async function (user) {
    const data = await shoplogin(user);
    if (data.length > 0) {
        if (data[0].status == '已通过') {
            return data
        }
        else if (data[0].status === '申请中') {
            return data[0].status
        }
    }
    return false;
}
//平台登录验证
module.exports.platformlogin = async function (user) {
    const data = await platformlogin(user);
    if (data.length > 0) {
        if (data[0].status == '已通过') {
            return data
        }
        else if (data[0].status === '申请中') {
            return data[0].status
        }
    }
    return false;

}
////根据管理员用户的登录id拿用户数据
module.exports.getLoginById = async function (_id) {
    const data = await getLoginById(_id);
    if (data.length > 0) {
        return data;
    }
    return false;
}