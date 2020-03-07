const {
  addDao,
  getStartDao,
  deletePettDao,
  updataPettDao,
  searchPettDao,
  searchBy_shopIdDao,
  searchBy_petIdDao,
  closePetDao,
  tens,
  searchcommdityDao,
  commoditys,
  tens1,
  searchs
} = require("../../dao/commodityDao/commodityDao.js");

// 新增
module.exports.addService = async function(user) {
  let data = await addDao(user);
  if (data._id) {
    return true;
  } else {
    return false;
  }
};

//初始渲染
module.exports.getStartService = async function(pageData) {
  const data = await getStartDao(pageData);
  return data;
};

//删除
module.exports.deletePetService = async function(_id) {
  const data = await deletePettDao(_id);
  return data;
};
//修改
module.exports.updataPetService = async function(petdata) {
  const data = await updataPettDao(petdata);
  return data;
};
//查询
module.exports.searchPettService = async function(petdata) {
  const data = await searchPettDao(petdata);
  return data;
};
module.exports.searchcommdity = async function(petdata) {
  const data = await searchcommdityDao(petdata);
  return data;
};
//通过店铺id，获取所有商品
module.exports.searchBy_shopIdService = async function(petdata) {
  const data = await searchBy_shopIdDao(petdata);
  return data;
};

//通过商品id，获取商品信息
module.exports.searchBy_petIdService = async function(petdata) {
  const data = await searchBy_petIdDao(petdata);
  return data;
};

////店铺下架商品，商品信息改动
module.exports.closePetService = async function(petdata) {
  const data = await closePetDao(petdata);
  return data;
};


//获取lol个商品
module.exports.tens = async function(petdata) {
  const data = await tens(petdata);
  return data;
};


module.exports.commoditys = async function(petdata) {
  const data = await commoditys(petdata);
  return data;
};

// 分类拿数据
module.exports.tens1 = async function(petdata) {
  const data = await tens1(petdata);
  return data;
};


//搜索拿数据
module.exports.searchs = async function(petdata) {
  const data = await searchs(petdata);
  return data;
};
