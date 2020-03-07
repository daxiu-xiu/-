

const {obtains,remove_S,looks} = require("../../dao/usercontrol/usercontrol")


module.exports.obtains = async function (xue) {
    const data = await obtains(xue);
    return data;
}



//删除
module.exports.remove_S = async function (xue) {   
    const data = await remove_S(xue)
    if (data.ok == 1) {
        return true;
    }
    return false;
}

//查看门店数据
module.exports.looks = async function (xue) {
    const data = await looks(xue);
    return data;
}