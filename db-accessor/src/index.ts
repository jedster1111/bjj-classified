import Koa from "koa";
import KoaRouter from "koa-router";
import koaLogger from "koa-pino-logger";

import { logger } from "./logger";

import { meaningOfLife } from "bjj-common";
import { setUpNeo4jConnection, cleanUpNeo4jConnection } from "./neo4jDriver";

const port = 8000;

const app = new Koa();
const router = new KoaRouter();

app.use(koaLogger({
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

setUpNeo4jConnection().then(() => {
  app.listen(port, () => logger.info(`Listening on port ${port}`));
})

function cleanup(signal: "SIGINT" | "SIGTERM") {
  logger.info("%s received, cleaning up.", signal);
  cleanUpNeo4jConnection().then(() => {
    process.exit(1)
  })

}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
