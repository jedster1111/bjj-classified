import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { clsProxifyKoaMiddleware } from "cls-proxify/integration/koa";
import { uuid } from "uuidv4";

import {
  setUpNeo4jConnection,
  cleanUpNeo4jConnection,
} from "./store/neo4jDriver";
import { router } from "./router";
import { retry } from "bjj-common";
import { logger, loggerKey, originalLogger } from "./logger";

const port = 8000;

const app = new Koa();

app.use(
  clsProxifyKoaMiddleware(loggerKey, (ctx) => {
    const traceId = ctx.request.header["X-TraceId"] || uuid();
    ctx.set("X-TraceId", traceId);
    const loggerProxy = originalLogger.child({ traceId: traceId });
    return loggerProxy;
  })
);

app.use(async (ctx, next) => {
  ctx.log = logger;
  const started = Date.now();
  logger.info("Request started");
  await next();
  const elapsed = Date.now() - started;
  ctx.set("X-ResponseTime", elapsed.toString());
  logger.info(
    "Request finished in %sms with %s.",
    elapsed,
    ctx.response.status
  );
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(err as Error, "Error encountered!");

    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

function cleanup(signal: "SIGINT" | "SIGTERM") {
  logger.info("%s received, cleaning up.", signal);
  cleanUpNeo4jConnection().then(() => {
    process.exit(1);
  });
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

async function main() {
  logger.info("BJJ Classified: db-accessor initializing");
  app.listen(port, () => logger.info(`Listening on port ${port}`));
  await retry(setUpNeo4jConnection, 5000);
}

main();
