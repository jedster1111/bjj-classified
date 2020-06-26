import Koa from "koa";
import koaLogger from "koa-pino-logger";
import bodyParser from "koa-bodyparser"

import { logger } from "./logger";
import { setUpNeo4jConnection, cleanUpNeo4jConnection } from "./store/neo4jDriver";
import { router } from "./router";
import { retry } from "bjj-common";

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

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

function cleanup(signal: "SIGINT" | "SIGTERM") {
  logger.info("%s received, cleaning up.", signal);
  cleanUpNeo4jConnection().then(() => {
    process.exit(1)
  })

}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

async function main() {
  logger.info("BJJ Classified: db-accessor initializing")
  app.listen(port, () => logger.info(`Listening on port ${port}`));
  await retry(setUpNeo4jConnection, 5000);
}

main()
