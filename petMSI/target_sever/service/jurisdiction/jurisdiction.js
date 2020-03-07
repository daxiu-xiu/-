
const {application,application1,amends,refusess} = require("../../dao/jurisdiction/jurisdiction.js")


module.exports.application = async function () {
    let data = await application();
    return data
}

//获取2
module.exports.application1 = async function (user) {
    let data = await application1(user);
    return data
}

//同意
module.exports.amends = async function (argument) {   
    const data = await amends(argument)
    if(data.ok==1){
        return true;
    }
    else{
        return false
    }
}
//拒绝
module.exports.refusess = async function (argument) {   
    const data = await refusess(argument)
    if(data.ok==1){
        return true;
    }
    else{
        return false
    }
}
