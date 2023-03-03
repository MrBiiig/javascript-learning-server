const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");

const router = new Router({
  prefix: "/api",
});

const app = new Koa({
  // 代理
  // proxy: true
});
app.use(bodyParser()); // 解析request的body

// logger
app.use(async (ctx, next) => {
  console.log("--0-0--");
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`--0-1-- ${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  console.log("--1-0--");
  const start = new Date();
  await next();
  const ms = Date.now() - start;
  console.log("--1-1--");
  ctx.set("X-Response-Time", `${ms}ms`);
});

// response
router.get("/", async (ctx, next) => {
  // todo
  ctx.body = "api";
});

app.use(router.routes());

app.listen(3000);
console.log("app started at port 3000...");
