const mongoose = require("mongoose");

//新增
module.exports.addDao = async function (user) {
  const data = await mongoose.model("commodityModel").create(user);
  return data;
};

//初始渲染，获取所有
module.exports.getStartDao = async function ({
  currentPage,
  pageSize,
  adminID
}) {
  // //获取总条数
  // const totalCount = await mongoose.model("commodityModel").countDocuments();
  // //获取总页数
  // const totalPages = Math.ceil(totalCount / pageSize);
  //获取宠物信息
  const petData = await mongoose
    .model("commodityModel")
    .find({ adminID })
    .populate({
      path: "shopsID"
    })
    .limit(pageSize - 0) //返回查询pageSize条
    .skip((currentPage - 1) * pageSize); //跳过多少条，即跳过10条数据，取后10条数据
  const totalCount = petData.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  return { currentPage, pageSize, totalCount, totalPages, petData };
  // return await mongoose.model("commodityModel").find();
};

//删除
module.exports.deletePettDao = async function (_id) {
  return await mongoose.model("commodityModel").deleteOne(_id);
};
//修改
module.exports.updataPettDao = async function ({
  type,
  name,
  gender,
  color,
  age,
  price,
  image,
  inventory,
  imageName,
  shopsID,
  _id
}) {
  console.log(shopsID);

  return await mongoose.model("commodityModel").update(
    { _id },
    {
      type,
      shopsID,
      name,
      gender,
      color,
      age,
      price,
      image,
      inventory,
      imageName
    }
  );
};
//宠物页面查询
module.exports.searchPettDao = async function ({
  type,
  value,
  currentPage,
  pageSize
}) {
  const petData = await mongoose
    .model("commodityModel")
    .find({
      [type]: {
        $regex: value
      } //模糊查询，满足一个值就能找到
    })
    .limit(pageSize - 0) //返回查询pageSize条
    .skip((currentPage - 1) * pageSize); //跳过多少条，即跳过10条数据，取后10条数据
  const totalCount = petData.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  return { currentPage, pageSize, totalCount, totalPages, petData };
};
//店铺商品页面面查询
module.exports.searchcommdityDao = async function ({
  type,
  value,
  currentPage,
  pageSize,
  shopID
})
{
  console.log( type,
    value,
    currentPage,
    pageSize,
    shopID);
  const petData = await mongoose
    .model("commodityModel")
    .find({
      shopsID: { $elemMatch: { $eq: shopID } },
      [type]: {
        $regex: value
      } //模糊查询，满足一个值就能找到
    })
    .limit(pageSize - 0) //返回查询pageSize条
    .skip((currentPage - 1) * pageSize); //跳过多少条，即跳过10条数据，取后10条数据
  const totalCount = petData.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  return { currentPage, pageSize, totalCount, totalPages, petData };
};

//通过店铺id查询该店铺所有的商品
module.exports.searchBy_shopIdDao = async function ({
  currentPage,
  pageSize,
  shopID
}) {
  const petData = await mongoose
    .model("commodityModel")
    .find({
      //查询数组里面的
      shopsID: { $elemMatch: { $eq: shopID } }
      // shopsID: { $in: [shopID] }
    })
    .limit(pageSize - 0) //返回查询pageSize条
    .skip((currentPage - 1) * pageSize); //跳过多少条，即跳过10条数据，取后10条数据
  const totalCount = petData.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  // console.log(shopID);
  return { currentPage, pageSize, totalCount, totalPages, petData };
};

//通过商品id获取商品信息
module.exports.searchBy_petIdDao = async function ({ petID }) {
  const petData = await mongoose.model("commodityModel").find({ _id: petID });
  //获取第一个店铺的信息
  const shopid = petData[0].shopsID[0];
  const shopData = await mongoose.model("shopsModel").find({ _id: shopid });
  return { petData, shopData };
};

//店铺下架商品，商品信息改动(通过商品id和店铺id)
module.exports.closePetDao = async function ({ petID, shopID }) {
  //获取该商品信息
  const shops = await mongoose.model("commodityModel").find({ _id: petID });
  //获取店铺id
  const changeID = shops[0].shopsID;
  //将店铺id与传过来的比较，去重
  const id = changeID.filter(item => {
    return item != shopID;
  });

  //将新的id，放进去
  const petData = await mongoose
    .model("commodityModel")
    .update({ _id: petID }, { shopsID: [...id] });
  return { petData };
};



//获取lol个商品
module.exports.tens = async function ({start=0,count=5}) {
  
    // 获取数据
    const accounts = await mongoose.model("commodityModel")
    .find()
    .populate("shopsID") 
    .limit(count-0)
    // 获取总条数
    const total = await mongoose.model('commodityModel')
    .find()
    .count();
    
    return {accounts,total}

}

module.exports.commoditys = async function (petdata) {
  // console.log(petdata)
  return await mongoose.model("commodityModel").find(petdata).populate("shopsID") ;
}



module.exports.tens1 = async function ({start=0,count=5,name}) {
  if(name=="红"||name=="蓝"||name=="绿"){
    // console.log(name)
    // 获取数据
    const accounts = await mongoose.model("commodityModel")
    .find({color:name})
    .populate("shopsID") 
    .limit(count-0)
    return accounts
  }
  else{
    // console.log(name)
    // 获取数据
    const accounts = await mongoose.model("commodityModel")
    .find({type:name})
    .populate("shopsID") 
    .limit(count-0)
    return accounts
  }
}

//搜索拿数据
module.exports.searchs = async function (petdata) {
  const data = await mongoose.model("commodityModel")
  .find({
      $or:[
          {name:{ $regex: petdata.text, $options: '$i'}},
          {age:{ $regex: petdata.text, $options: '$i'}},
          {gender:{ $regex: petdata.text, $options: '$i'}},
          {type:{ $regex: petdata.text, $options: '$i'}},
      ]
  })
  const data1 = await mongoose.model("shopsModel")
  .find({
    $or:[
        {name:{ $regex: petdata.text, $options: '$i'}},
        {address:{ $regex: petdata.text, $options: '$i'}},
    ]
})

   return {data,data1}
}