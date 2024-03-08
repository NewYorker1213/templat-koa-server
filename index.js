const Koa = require("koa");
const app = new Koa();
const logger = require("koa-logger");
const koaBody = require("koa-body").default;
const Router = require("koa-router");
const staticServe = require("koa-static");
const path = require('path')
const fs = require("fs")
const cors = require("@koa/cors");
const http = require("http");
const router = new Router();
const server = http.createServer(app.callback());
const apiRouterA = require("./apis/routerA.js"); //
const PORT = 3000;



/**
 * 使用中间接
 */
app.use(koaBody()); // 解析请求体
app.use(cors());
app.use(logger());
app.use(staticServe(__dirname + "/public"));
app.use(staticServe(__dirname + "/statics"));

router.get("/hello_world", async (ctx) => {
  ctx.body = "hello world";
});

router.use("/api", apiRouterA.routes(), apiRouterA.allowedMethods());// 访问routerA中的接口接上 /api-a/xxx
app.use(router.routes(), router.allowedMethods()); // app 注册路由

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


