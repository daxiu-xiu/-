const mongoose = require("mongoose");



module.exports.obtains = async function (xue) {
      // 获取数据
      const data = await mongoose.model("adminsModel")
      .find({_id:xue._id})
      return data
}

//修改
module.exports.amend_Ss = async function (xue) {
    return await mongoose.model("adminsModel").update({ _id: xue._id }, { name: xue.name, age: xue.age, gender: xue.gender,  phone:xue.phone, imageUrl:xue. imageUrl })
}