const mongoose = require("mongoose");
module.exports.add_shops_dao = async function (shops) {
    console.log(shops);
    if (shops._id) {
        const { name,    // 名称
            address, // 地址
            telephone, // 电话
            desc,
            imageName,
            _id
        } = shops;
        const data = await mongoose.model("shopsModel").update({ _id }, {
            name,    // 名称
            address, // 地址
            telephone, // 电话
            desc,
            imageName,
        });
        return data
    }
    else {
        const data = await mongoose.model("shopsModel").create(shops);
        return data;
    }
}
module.exports.get_allshops_dao = async function () {
    return await mongoose.model("shopsModel").find();
}
module.exports.get_byId_dao = async function ({
    //   条数
    pagesize,
    // 当前页
    currentPage,
    _id }) {

    // console.log(data);
    // 获取总条数
    // const totalCount = await mongoose.model("shopsModel").countDocuments();
    // 获取商铺总条数
    const totalCount = await mongoose.model("shopsModel").find({ adminId: _id }).countDocuments();
    // 总页数  
    const totalPages = Math.ceil(totalCount / pagesize);
    const data = await mongoose.model("shopsModel").find({ adminId: _id }).limit(pagesize - 0).skip(((currentPage - 1) * pagesize))
    // console.log(data)
    return {
        totalCount,
        totalPages,
        ShopsData: data,
        pagesize,
        currentPage
    }
}
module.exports.delete_byId_dao = async function (data) {
    return await mongoose.model("shopsModel").update({ _id: data._id }, { target: data.newtarget }, (err, data) => { });
}