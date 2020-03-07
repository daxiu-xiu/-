//用于token的验证
//引入下载的依赖包express-jwt
const expressJWT = require("express-jwt");

const jwtAuth = expressJWT({
//     // secret参数是生成token的jwt.sign()方法里面的第二个参数（密匙）
//     secret: 'love',
//     credentialsRequired: true // false：不校验
// }).unless({ // unless 中放的就是不检验 token 的 api。   
//     //只有注册和登录的页面不用去验证账户是否已经在当前页面登录。其他都需要验证
//     path: [
//         //后台的注册登录
//         "/users/platformlogin", "/users/register",
//         '/users/repeatedverification', '/users/shoplogin',
//         '/users/islogin',
//         '/uploadPetImage/addImage',
//         '/uploadPetImage/addShopsImgs',
//         //小程序的登录和注册
//         '/users/islogin', '/appusers/login', '/appusers/register',
//         "/uploadPetImage/addImage",
//         "/uploadPetImage/addImageTrue",
        // "/heads/addImage",
        // "/heads/tupian",
        // /temp/,

//     ]
  // secret参数是生成token的jwt.sign()方法里面的第二个参数（密匙）
  secret: "love",
  credentialsRequired: true // false：不校验
}).unless({
  // unless 中放的就是不检验 token 的 api。
  //只有注册和登录的页面不用去验证账户是否已经在当前页面登录。其他都需要验证
  path: [
    //后台的注册登录
    "/users/platformlogin",
    "/users/register",
    "/users/repeatedverification",
    "/users/shoplogin",
    "/users/islogin",
    "/uploadPetImage/addImage",
    "/uploadPetImage/addShopsImgs",
    //小程序的登录和注册
    "/users/islogin",
    "/appusers/login",
    "/appusers/register",
    "/uploadPetImage/addImage",
    "/uploadPetImage/addImageTrue",
    "/uploadPetImage/updataPetTrue",
    "/uploadPetImage/changeImage",
    "/uploadPetImage/addImageTrue",
    "/heads/addImage",
    "/heads/tupian",
    /temp/,
  ]
});
//将封装的jwtAuth暴露出去
module.exports = jwtAuth;
