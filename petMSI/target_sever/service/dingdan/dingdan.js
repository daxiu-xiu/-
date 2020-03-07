


const {getdingdans,getdingdans1} = require("../../dao/dingdan/dingdan.js")




module.exports.getdingdans = async function(shuju) {
    let data = await getdingdans(shuju);
    console.log(data);
    const result=data.every(item=>item._id)
    if(result){
        return true
    }
    else{
        return false
    }
    // if (data._id) {
    //   return true;
    // } else {
    //   return false;
    // }
  };


  module.exports.getdingdans1 = async function(shuju) {
    let data = await getdingdans1(shuju);
    return data
  };