import Koa from "koa";
import koaLogger from "koa-pino-logger";

import { logger } from "./logger";
import { setUpNeo4jConnection, cleanUpNeo4jConnection } from "./neo4jDriver";
import { router } from "./router";

const port = 8000;

const app = new Koa();

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

app.on('error', (err: Error, ctx: Koa.ParameterizedContext) => {
  ctx.log.error(err)
})

app.use(router.routes()).use(router.allowedMethods());

function cleanup(signal: "SIGINT" | "SIGTERM") {
  logger.info("%s received, cleaning up.", signal);
  cleanUpNeo4jConnection().then(() => {
    process.exit(1)
  })

}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

function main() {
  logger.info("BJJ Classified: db-accessor initializing")
  setUpNeo4jConnection().then(() => {
    app.listen(port, () => logger.info(`Listening on port ${port}`));
  })
}

main()
