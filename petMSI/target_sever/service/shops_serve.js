const { add_shops_dao,get_allshops_dao,get_byId_dao,delete_byId_dao} = require("../dao/shops_dao.js")
module.exports.add_shops = async function (data) {
    const addData=await add_shops_dao(data)
    return addData
}
module.exports.get_allshops=async function()
{
    return await get_allshops_dao()
}
module.exports.get_byId=async function(_id)
{
    return await get_byId_dao(_id)
}
module.exports.delete_byId=async function(data)
{
    return await delete_byId_dao(data)
}