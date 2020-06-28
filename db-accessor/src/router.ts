import KoaRouter from "koa-router";

import { meaningOfLife } from "bjj-common";
import { logger } from "./logger";
import { moves } from "./router/moves";

const router = new KoaRouter();

router.get("meaningOfLife", "/meaningOfLife", (ctx) => {
  logger.info("Someone's looking for the meaning of life?");
  ctx.body = `The meaning of life is ${meaningOfLife()}`;
});

router.get("error", "/error", async (ctx) => {
  ctx.throw("This is an endpoint to test error handling!");
});

router.use("/moves", moves.routes(), moves.allowedMethods());

export { router };
