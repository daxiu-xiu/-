const mongoose = require("mongoose");


// 平台管理的门店管理的

//查询和渲染列表
module.exports.shopsByTarget = async function (shop) {
    let { text, value, currentPage, pageSize, target } = shop
    //因为拒绝关店的也属于正在营业中，所以用户点击正在营业的时候，可以获取到拒绝关店的店铺
    if (target == '正在营业') {
        //获取总条数
        const totalCount = await mongoose.model('shopsModel')
            .find({ $or: [{ target }, { target: "拒绝删除" }] })
            .find({ [value]: { $regex: text, $options: '$i' } })
            .countDocuments();

        //获取总页数,向上取整   
        const totalPages = Math.ceil(totalCount / pageSize)
        //获取数据
        const shops = await mongoose.model('shopsModel')
            .find({ $or: [{ target }, { target: "拒绝删除" }] })
            .populate({
                path: "adminId",

            })
            .find({ [value]: { $regex: text, $options: '$i' } })
            .limit(pageSize - 0)//查询条数
            .skip((currentPage - 1) * pageSize);//跳过的条数
        console.log(totalCount)
        return { text, value, totalCount, currentPage, pageSize, target, shops, totalPages }
    }
    else {
        //获取总条数
        const totalCount = await mongoose.model('shopsModel')
            .find({ target })
            .find({ [value]: { $regex: text, $options: '$i' } })
            .countDocuments();

        //获取总页数,向上取整   
        const totalPages = Math.ceil(totalCount / pageSize)
        //获取数据
        const shops = await mongoose.model('shopsModel')
            .find({ target })
            .populate({
                path: "adminId",

            })
            .find({ [value]: { $regex: text, $options: '$i' } })
            .limit(pageSize - 0)//查询条数
            .skip((currentPage - 1) * pageSize);//跳过的条数
        return { text, value, totalCount, currentPage, pageSize, target, shops, totalPages }
    }


}

//根据id删除一个门店
module.exports.delShopByid = async function (shop) {
    const data = await mongoose.model("shopsModel").deleteOne(shop);
    return data;
}
//同意事件修改target
module.exports.agreeTarget = async function (targetID) {
    const { _id, target } = targetID
    // console.log(_id, target)
    if (target == '申请开店') {
        const data = await mongoose.model("shopsModel").update({ _id }, {
            target: '正在营业'
        })
        return data;
    } else {
        const data = await mongoose.model('shopsModel').deleteOne({ _id })
        return data
    }

}

//拒绝事件修改target
module.exports.rejectTarget = async function (targetID) {
    const { _id, target } = targetID
    console.log(_id, target)
    if (target == '申请开店') {
        const data = await mongoose.model("shopsModel").update({ _id }, {
            target: '拒绝开店'
        })
        return data;
    } else {
        const data = await mongoose.model("shopsModel").update({ _id }, {
            target: '拒绝删除'
        })
        return data;
    }
}


//app页面渲染宠物
module.exports.appPets = async function ({ start = 0, count = 9, target }) {
    start = ~~start
    count = ~~count

    //综合排序
    if (target == 'composite') {
        //总数
        const total = await mongoose.model('commodityModel').
            find({ shopsID: { $ne: null } }).count();
        const data = await mongoose.model('commodityModel')
            .find({ shopsID: { $ne: null } }).skip(start).limit(count)
        console.log(data)
        return { data, total }
    }
    //降序
    else if (target == 'descending') {
        //总数
        const total = await mongoose.model('commodityModel').
            find({ shopsID: { $ne: null } }).count();
        const data = await mongoose.model('commodityModel')
            .find({ shopsID: { $ne: null } })
            //将字符串的价格转换为数字的价格来排序
            .collation({"locale": "zh", numericOrdering:true})
            .sort({ price: -1 })
            .skip(start).limit(count)
        console.log(data)
        return { data, total }
    }
    else {
        //升序
        const total = await mongoose.model('commodityModel').
            find({ shopsID: { $ne: null } }).count();
        const data = await mongoose.model('commodityModel')
            .find({ shopsID: { $ne: null } })
            .collation({"locale": "zh", numericOrdering:true})
            .sort({ price: 1 })
            .skip(start).limit(count)
        // console.log(data)
        return { data, total }
    }

}

//app页面渲染宠物店
module.exports.appshops = async function ({ start = 0, count = 10 }) {
    start = ~~start
    count = ~~count
    //总数
    const total = await mongoose.model('shopsModel').
        find({ $or: [{ target: "正在营业" }, { target: "拒绝删除" }] }).count();
    const data = await mongoose.model('shopsModel')
        .find({ $or: [{ target: '正在营业' }, { target: "拒绝删除" }] }).skip(start).limit(count)

    // 通过店铺的id拿到该店铺所有的宠物
    let arr = []
    for (let i = 0; i < data.length; i++) {
        const data1 = await mongoose.model('commodityModel').find({ shopsID: { $all: [data[i]._id] } })
        arr.push({ shop: data[i], pet: data1 })
    }
    // console.log(arr)
    return { arr, total }
}
//小程序的查询事件
module.exports.searchdata = async function (searchconditional) {
    console.log(searchconditional)
    let { target, value } = searchconditional
    if (target == 'pets') {
        const data = await mongoose.model("commodityModel").find({ "name": { $regex: value, $options: 'i' } });
        return data
    } else {
        const data = await mongoose.model('shopsModel')
            .find({ $or: [{ target: '正在营业' }, { target: "拒绝删除" }] })
            .find({ "name": { $regex: value, $options: 'i' } })
        let arr = []
        for (let i = 0; i < data.length; i++) {
            const data1 = await mongoose.model('commodityModel').find({ shopsID: { $all: [data[i]._id] } })
            arr.push({ shop: data[i], pet: data1 })
        }
        return arr;
    }


}
//小程序通过一个店铺的id来获取所有的动物
module.exports.getpetById = async function (id) {
    let { _id } = id
    console.log(_id)
    const shop = await mongoose.model('shopsModel')
        .find({ _id: id })
    const data = await mongoose.model('commodityModel').find({ shopsID: { $all: [_id] } })
    return { shop, data };
}


//小程序通过一个宠物的id来获取宠物的明细
module.exports.getpetBypetId = async function (id) {
    const data = await mongoose.model("commodityModel").find(id);
    return data;
}





//获取店铺数据
module.exports.getshops = async function ({start=0,count=2}) {
    start = ~~start
    count = ~~count
    console.log(count)
    // 获取总数
    const total = await mongoose.model('shopsModel')
    .find({ $or: [{ target: "正在营业" }, { target: "拒绝删除" }] })
    .count();
    //获取店铺
    const data = await mongoose.model('shopsModel')
        .find({ $or: [{ target: '正在营业' }, { target: "拒绝删除" }] })
        .skip(start)
        .limit(count)
        // return {data,total}

        //拿到每个店铺内的商品
        let arr = []
        for(let i =0;i<data.length;i++){
            // 拿到在此店铺的商品数据    shopsID是一个数组   { shopsID: { $all: [data[i]._id] } }mongoose查找数组内数据的方法
            const data1 = await mongoose.model('commodityModel').find({ shopsID: { $all: [data[i]._id] } })  
            //把店铺和商品一起添加进数组
            arr.push({ shop: data[i], commodity: data1 })

        }
        return { arr, total }
}