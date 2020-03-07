
// const { shopsByTarget, delShopByid, agreeTarget,rejectTarget ,getshops} = require('../../dao/PMS_Dao/PMS_Dao.js')
// const { shopsByTarget, delShopByid, 
    
//     searchdata,
//     agreeTarget,rejectTarget ,appPets,appshops,getshops} = require('../../dao/PMS_Dao/PMS_Dao.js')

// const { shopsByTarget, delShopByid, agreeTarget, rejectTarget, getshops } = require('../../dao/PMS_Dao/PMS_Dao.js')

const { shopsByTarget, delShopByid,
    searchdata,
    agreeTarget, rejectTarget, appPets, appshops, getshops,
    getpetById, getpetBypetId} = require('../../dao/PMS_Dao/PMS_Dao.js')

//根据状态获取渲染列表
module.exports.shopsByTarget = async function (shops) {
    const data = await shopsByTarget(shops);
    return data;
}
//根据id删除一个门店
module.exports.delShopByid = async function (shops) {
    const data = await delShopByid(shops)
    if (data.ok == 1) {
        return true;
    }
    return false;
}

//同意事件修改target
module.exports.agreeTarget = async function (targetID) {
    const data = await agreeTarget(targetID)
    return data
}


//拒绝事件修改target
module.exports.rejectTarget = async function (targetID) {
    const data = await rejectTarget(targetID)
    return data
}



//小程序渲染宠物
module.exports.appPets = async function (count) {
    const data = await appPets(count)
    return data
}
// 小程序渲染商店
module.exports.appshops = async function (count) {
    const data = await appshops(count)
    return data
}
//小程序的搜索事件

module.exports.searchdata = async function (searchconditional) {
    const data = await searchdata(searchconditional)
    return data
}
//小程序通过一个店铺的id来获取所有的动物
module.exports.getpetById = async function (_id) {
    const data = await getpetById(_id)
    return data
}

//小程序通过一个宠物的id来获取宠物的明细
module.exports.getpetBypetId = async function (_id) {
    const data = await getpetBypetId(_id)
    return data
}
//获取店铺数据
module.exports.getshops = async function (shuju) {
    const data = await getshops(shuju)
    return data
}
