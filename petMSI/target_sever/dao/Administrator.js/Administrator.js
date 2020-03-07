const mongoose = require("mongoose");



module.exports.obtains = async function ({currentPage, pageSize,value,text}) {
    console.log(value,text);
    
      // 获取总条数
      const totalCount = await mongoose.model("adminsModel")
      .find({ position:"controller"})
      .find({ [value]: { $regex: text, $options: '$i' } })
      .countDocuments();
      // 总页数
      const totalPages = Math.ceil(totalCount / pageSize); //向上取整
      // 获取数据
      const accounts = await mongoose.model("adminsModel")
      .find({ position:"controller"})
      .find({ [value]: { $regex: text, $options: '$i' } })
          .limit(pageSize - 0)  // 查询(获取)条数
          .skip((currentPage - 1) * pageSize);  // 跳过条数
   
      // console.log(accounts)
      return { currentPage, pageSize, totalCount, totalPages, accounts,value,text}
}

//删除
module.exports.remove_S = async function (xue) {
    const data = await mongoose.model("adminsModel").deleteOne(xue);
    return data;
}

//修改1
module.exports.amend_S = async function (xue) {
    // 获取数据
    const data = await mongoose.model("adminsModel").find(xue)
    return data
}

//修改2
module.exports.amend_Ss = async function (xue) {
    return await mongoose.model("adminsModel").update({ _id: xue._id }, { name: xue.name, age: xue.age, gender: xue.gender,  phone:xue.phone, status: xue.status, imageUrl:xue. imageUrl })
}
