const Router = require("koa-router");
const router = Router();
const fs = require('fs')
const path = require('path')
const Mock = require("mockjs");
const Random = Mock.Random;
const executeQuery = require('../config/mysql')

// router. all 全部请求 get get请求 post post 请求等等
router.all("/test/:id?", async (ctx) => {
  console.log("query data", ctx.request.query); // query 对象中为
  console.log("param data", ctx.request.params);
  console.log("post data:", ctx.request.body);
  console.log("file", ctx.request.files);



  ctx.body = {
    code: 200,
    message:"success",
    data:{}
  }
});

// mock 数据
router.all("/mock", async (ctx) => {
    let data = Array(10).fill(0).map((item,index)=>{
      return ({
        name:Random.name(),
        word:Random.word(),
        datetime:Random.datetime(),
      })
    })
    ctx.body={
      code:200,
      message:"success",
      data
    }
})

// 连接mysql 查表
router.all("/test-mysql", async(ctx)=>{
  let sql = "select * from blog_user"
  let result = await executeQuery(sql)
  console.log('result', result);
  ctx.body={
    code:200,
    message:"success",
    data:result ?? []
  }
})

module.exports = router;
