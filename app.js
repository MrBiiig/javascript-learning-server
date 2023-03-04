const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
//home的路由
let home = new Router();
home
  .get("/list", async (ctx) => {
    ctx.body = "Home list";
  })
  .get("/todo", async (ctx) => {
    ctx.body = "Home ToDo";
  });
//page的路由
let page = new Router();
page
  .get("/list", async (ctx) => {
    ctx.body = "Page list";
  })
  .get("/todo", async (ctx) => {
    ctx.body = "Page todo";
  });
//装载所有子路由
let router = new Router();
router.use("/home", home.routes(), home.allowedMethods());
router.use("/page", page.routes(), page.allowedMethods());
//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
