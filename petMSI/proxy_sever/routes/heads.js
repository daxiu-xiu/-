var express = require("express");
var router = express.Router();

const rq = require("request-promise");

const  {
  uploadFiles,
  moveFiles,
  removeFiles
} = require("../utils/uploadFiles.js");

const m = uploadFiles({
    path: "./public/heads/temp",
    key: "file"
  });

  //上传临时文件
router.post("/addImage", m, function (req, res, next) {
    console.log(888888);
 const data = req.files.map(item => item.filename);
    res.send(data);
  });

  //抽屉确认新增
  router.post('/tupian', async function (req, res, next) {
   const{amendarr}=req.body
   console.log(amendarr);
   
   const imageUrl1 =amendarr.imageUrl[0]
   if (amendarr.imageUrl == "") {
    const data = await rq({
        method: "put",
        url: "http://localhost:8080/Administrator",
        body: {
            amendarr:{...amendarr,imageUrl:""}
        },
        json: true
    })
    res.send(data);
}
else if(typeof amendarr.imageUrl=='string'){
    const data = await rq({
        method: "put",
        url: "http://localhost:8080/Administrator",
        body: {
            amendarr:{...amendarr,imageUrl:amendarr.imageUrl}
        },
        json: true
    })
    res.send(data);
}
else {
    //移动图片路径
    moveFiles({
        fromPath: './public/heads/temp',
        toPath: './public/heads/tupian',
        filename: amendarr.imageUrl[0]
    })

    const data = await rq({
        method: "put",
        url: "http://localhost:8080/Administrator",
        body: {
            amendarr:{...amendarr,imageUrl:imageUrl1}
        },
        json: true
    })
    // removeFiles('./public/heads/temp');
    res.send(data);
}
  })





  //弹窗确认修改
  router.post('/tupian1', async function (req, res, next) {
    const{arr,aa}=req.body
    console.log("++++++++++++++++++++",arr.imageUrl);
    // arr.hasOwnProperty('imageUrl') 判断对象中是否包含此数据

    if (arr.imageUrl == "") {
        console.log(1);
        
     const data = await rq({
         method: "put",
         url: "http://localhost:8080/APPLICATION",
         body: {
             arr:{...arr,imageUrl:""}
         },
         json: true
     })
     res.send(data);
 }
 else if(aa){
    const data = await rq({
        method: "put",
        url: "http://localhost:8080/APPLICATION",
        body: {
            arr:{...arr,imageUrl:arr.imageUrl}
        },
        json: true
    })
    res.send(data);
 }
 else {
     console.log(2);
     //移动图片路径
     moveFiles({
         fromPath: './public/heads/temp',
         toPath: './public/heads/tupian',
         filename: arr.imageUrl
     })
 
     const data = await rq({
         method: "put",
         url: "http://localhost:8080/APPLICATION",
         body: {
             arr:{...arr,imageUrl:arr.imageUrl}
         },
         json: true
     })
    //  removeFiles('./public/heads/temp');
     res.send(data);
 }
   })

module.exports = router;