
const {obtains,amend_Ss} = require("../../dao/APPLICATION/APPLICATION.js")

module.exports.obtains = async function (xue) {
    const data = await obtains(xue);
    return data;
}

module.exports.amend_Ss = async function (xue) {       
    const data = await amend_Ss(xue)
    if(data.ok==1){
        return true;
    }
    else{
        return false
    }
}