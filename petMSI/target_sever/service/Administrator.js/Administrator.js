
const {obtains,remove_S,amend_S,amend_Ss} = require("../../dao/Administrator.js/Administrator.js")

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

//修改1
module.exports.amend_S = async function (xue) {
    const data = await amend_S(xue);
    return data;
}

//修改2
module.exports.amend_Ss = async function (xue) {       
    const data = await amend_Ss(xue)
    if(data.ok==1){
        return true;
    }
    else{
        return false
    }
}