import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-body";
import CSRF from "koa-csrf";

import { logger } from "./middleware/logger";

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(new CSRF());

const router = new Router();
router.get("/*", async ctx => {
  ctx.body = "Hello World!";
});
app.use(router.routes());

app.listen(3000);

console.log("Server running on port 3000");
