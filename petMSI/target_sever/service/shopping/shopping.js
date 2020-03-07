

const {shopping,getshopping,adds,jians,deletes} = require("../../dao/shopping/shopping.js")


module.exports.shopping = async function(shuju) {
    let data = await shopping(shuju);
    if (data._id) {
      return true;
    } else {
      return false;
    }
  };


  
module.exports.getshopping = async function(shuju) {
    let data = await getshopping(shuju);
    return data
  };


//添加购物车数量
module.exports.adds = async function(shuju) {
    let data = await adds(shuju);
  };



module.exports.jians = async function(shuju) {
    let data = await jians(shuju);
  };

  
module.exports.deletes = async function(shuju) {
    let data = await deletes(shuju);
        console.log(data);
        if(data.deletedCount==1){
            return true
        }
        return false
  };