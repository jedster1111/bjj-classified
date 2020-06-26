import KoaRouter from "koa-router";

import { meaningOfLife } from "bjj-common";
import { moveStore } from "./store/move/moveStore";

const router = new KoaRouter();

router.get('meaningOfLife', "/meaningOfLife", ctx => {
  ctx.log.info("Someone's looking for the meaning of life?")
  ctx.body = `The meaning of life is ${meaningOfLife()}`
});

router.get('error', "/error", async ctx => {
  ctx.throw("This is an endpoint to test error handling!");
});

router.post('createMove', "/createMove", async ctx => {
  // TODO: Validate CreateMoveDto
  const result = await moveStore.createMove(ctx.request.body);

  if (result instanceof Error) {
    ctx.throw("Failed to create message.")
    return;
  }


  ctx.status = 201;
  ctx.body = result;
})

export { router };
