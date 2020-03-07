const {registers_s,repeatedverification,shoplogin,getids} = require('../../dao/appletuser.js/appletuser.js')


//小程序注册提交
module.exports.registers_s = async function (user) {
    const data = await registers_s(user);
    if (data._id) {
        return true;
    }
    else {
        return false;
    }
}


//注册1验证
module.exports.repeatedverification = async function (user) {
    let data = await repeatedverification(user);
    if (data.length > 0) {
        return true;
    }
    return false;
}


//登录
module.exports.shoplogin = async function (user) {
    
    const data = await shoplogin(user);
    // console.log(data);

    if (data.length > 0) {
        return data[0]._id
    }
    return false;
}



//通过id获取账户数据
module.exports.getids = async function (user) {
    let data = await getids(user);
     return data
}
