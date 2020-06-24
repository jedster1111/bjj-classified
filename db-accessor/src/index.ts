import Koa from "koa";
import KoaRouter from "koa-router";
import pino from "koa-pino-logger";

import { meaningOfLife } from "bjj-common";

const port = 8000;

const app = new Koa();
const router = new KoaRouter();

app.use(pino({
  prettyPrint: {
    colorize: true
  }
}));

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
})

app.on('error', (err: Error, ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>) => {
  ctx.log.error(err)
})

router.get('meaningOfLife', "/meaningOfLife", ctx => {
  ctx.log.info("Someone's looking for the meaning of life?")
  ctx.body = `The meaning of life is ${meaningOfLife()}`
});
router.get('error', "/error", async ctx => {
  ctx.throw(500, "This is an endpoint to test error handling!");
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log(`Listening on port ${port}`));
