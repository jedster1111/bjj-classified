import KoaRouter from "koa-router";

import { meaningOfLife, isError } from "bjj-common";
import { createMove } from "./store/move/moveStore";
import { createMoveDtoValidator } from "./store/Dtos/validators";

const router = new KoaRouter();

router.get('meaningOfLife', "/meaningOfLife", ctx => {
  ctx.log.info("Someone's looking for the meaning of life?")
  ctx.body = `The meaning of life is ${meaningOfLife()}`
});

router.get('error', "/error", async ctx => {
  ctx.throw("This is an endpoint to test error handling!");
});

router.post('createMove', "/createMove", async ctx => {
  const validationResult = createMoveDtoValidator(ctx.request.body);

  if (isError(validationResult)) {
    ctx.throw(400, validationResult)
    return;
  }

  const createdMove = await createMove(validationResult);

  if (isError(createdMove)) {
    ctx.throw("Failed to create move.")
    return;
  }

  ctx.status = 201;
  ctx.body = createdMove;
})

export { router };
