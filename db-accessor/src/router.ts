import KoaRouter from "koa-router";

import { meaningOfLife } from "bjj-common";

const router = new KoaRouter();

router.get('meaningOfLife', "/meaningOfLife", ctx => {
  ctx.log.info("Someone's looking for the meaning of life?")
  ctx.body = `The meaning of life is ${meaningOfLife()}`
});

router.get('error', "/error", async ctx => {
  ctx.throw(500, "This is an endpoint to test error handling!");
});

export { router };
