const mongoose = require("mongoose");


module.exports.application = async function () {
    const data = await mongoose.model("adminsModel").find({status:"申请中"});
    return data;
}


//获取数据2
module.exports.application1 = async ({ currentPage, pageSize,value,text }) => {

    console.log("------------------",text);
    // console.log(currentPage, pageSize)
    

    if(value==""||value=="全部"){
          // 获取总条数
    const totalCount = await mongoose.model("adminsModel")
    .find({
        $or:[
            {name:{ $regex: text, $options: '$i'}},
            {age:{ $regex: text, $options: '$i'}},
            {gender:{ $regex: text, $options: '$i'}},
            {phone:{ $regex: text, $options: '$i'}},
        ]
    })
    .find({ status:"申请中"})
    .countDocuments();
    // 总页数
    const totalPages = Math.ceil(totalCount / pageSize); //向上取整
    // 获取学生数据
    const accounts = await mongoose.model("adminsModel")
    .find({
        $or:[
            //$regex: text 作用正则，如果text为""就请求全部，$options: '$i'不区分大小写
            {name:{ $regex: text, $options: '$i'}},
            {age:{ $regex: text, $options: '$i'}},
            {gender:{ $regex: text, $options: '$i'}},
            {phone:{ $regex: text, $options: '$i'}},
        ]
    })
    .find({ status:"申请中"})
        .limit(pageSize - 0)  // 查询(获取)条数
        .skip((currentPage - 1) * pageSize);  // 跳过条数

    console.log(accounts)
    return { currentPage, pageSize, totalCount, totalPages, accounts,value}
    }
    else{
   // 获取总条数
   const totalCount = await mongoose.model("adminsModel")
   .find({ status:"申请中"})
   .find({position:value})
   .find({
    $or:[
        //$regex: text 作用正则，如果text为""就请求全部，$options: '$i'不区分大小写
        {name:{ $regex: text, $options: '$i'}},
        {age:{ $regex: text, $options: '$i'}},
        {gender:{ $regex: text, $options: '$i'}},
        {phone:{ $regex: text, $options: '$i'}},
    ]
})
   .countDocuments();
   // 总页数
   const totalPages = Math.ceil(totalCount / pageSize); //向上取整
   // 获取学生数据
   const accounts = await mongoose.model("adminsModel")
   .find({ status:"申请中"})
   .find({position:value})
   .find({
    $or:[
        //$regex: text 作用正则，如果text为""就请求全部，$options: '$i'不区分大小写
        {name:{ $regex: text, $options: '$i'}},
        {age:{ $regex: text, $options: '$i'}},
        {gender:{ $regex: text, $options: '$i'}},
        {phone:{ $regex: text, $options: '$i'}},
    ]
})
       .limit(pageSize - 0)  // 查询(获取)条数
       .skip((currentPage - 1) * pageSize);  // 跳过条数

   // console.log(accounts)
   return { currentPage, pageSize, totalCount, totalPages, accounts,value,text}
    }
}



//同意
module.exports.amends = async function (argument) {
    console.log("+++++++++++++++++++++", argument);
    return await mongoose.model("adminsModel").update({ _id: argument._id }, {status:"已通过"})
}

//拒绝
module.exports.refusess = async function (argument) {
    return await mongoose.model("adminsModel").update({ _id: argument._id }, {status:"已拒绝"})
}