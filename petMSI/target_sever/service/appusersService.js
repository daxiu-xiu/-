const {
    isregister,
    register,
    login,
    // Oauthlogin
} = require('../dao/appusersDao')
//小程序注册验证
module.exports.isregister = async function (user) {
    let data = await isregister(user);
    if (data.length > 0) {
        return true;
    }
    return false;
}
//小程序注册提交
module.exports.register = async function (user) {
    const data = await register(user);
    if (data._id) {
        return true;
    }
    else {
        return false;
    }
}
//小程序登录验证
module.exports.login = async function (user) {
    const data = await login(user);
    if (data.length > 0) {
        return data
    }
    return false;
}


// module.exports.Oauthlogin = async function (user) {
//     const data = await Oauthlogin(user);
//     if (data.length > 0) {
//         return data
//     }
//     return false;
// }
