import Koa from "koa";
import bodyParser from "koa-bodyparser"
import { clsProxifyKoaMiddleware } from 'cls-proxify/integration/koa'
import {uuid} from "uuidv4"

// import { logger } from "./logger";
import { setUpNeo4jConnection, cleanUpNeo4jConnection } from "./store/neo4jDriver";
import { router } from "./router";
import { retry } from "bjj-common";
import { logger, loggerKey } from "./logger";

const port = 8000;

const app = new Koa();

app.use(
  clsProxifyKoaMiddleware(loggerKey, (ctx) => {
    const headerRequestId = ctx.request.header.traceparent || uuid()
    const loggerProxy = {
      info: (...args: any[]) => console.log(`${headerRequestId} proxy info`, ...args),
      error: (...args: any[]) => console.log(`${headerRequestId} proxy error`, ...args)
    }

    return loggerProxy
  })
)

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    logger.error(err)
    ctx.throw(err.status || 500, err.message)
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
