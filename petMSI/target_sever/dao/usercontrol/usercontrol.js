const mongoose = require("mongoose");





module.exports.obtains = async function ({currentPage, pageSize,value,text}) {
    console.log(value,text); 
      // 获取总条数
      const totalCount = await mongoose.model("adminsModel")
      .find({ position:"shops"})
      .find({ [value]: { $regex: text, $options: '$i' } })
      .countDocuments();
      // 总页数
      const totalPages = Math.ceil(totalCount / pageSize); //向上取整
      // 获取数据
      const accounts = await mongoose.model("adminsModel")
      .find({ position:"shops"})
      .find({ [value]: { $regex: text, $options: '$i' } })
          .limit(pageSize - 0)  // 查询(获取)条数
          .skip((currentPage - 1) * pageSize);  // 跳过条数

      return { currentPage, pageSize, totalCount, totalPages, accounts,value,text}
}


//删除
module.exports.remove_S = async function (xue) {
    const data = await mongoose.model("adminsModel").deleteOne(xue);
    return data;
}


//查看门店数据
module.exports.looks = async function (xue) {
      const lokkarr = await mongoose.model("shopsModel")
      .find({adminId:xue._id})
    //   console.log(lokkarr)
    return lokkarr;
}