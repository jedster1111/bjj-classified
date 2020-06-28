import KoaRouter from "koa-router";
import { isError } from "bjj-common";

import { createMoveDtoValidator } from "../store/move/validators";
import { createMove } from "../store/move/store/createMove";
import { logger } from "../logger";
import { getMoves } from "../store/move/store/getMoves";
import { uuid } from "uuidv4";

const move = new KoaRouter();

move.get("getMoves", "/", async (ctx) => {
  const moves = await getMoves();

  if (isError(moves)) {
    logger.error(moves);
    ctx.throw("Failed to get moves.");
    return;
  }

  ctx.body = moves;
});

move.post("createMove", "/", async (ctx) => {
  const validationResult = createMoveDtoValidator(ctx.request.body);

  if (isError(validationResult)) {
    ctx.throw(400, validationResult);
    return;
  }

  const dbMoveDto = { id: uuid(), ...validationResult };
  const createdMove = await createMove(dbMoveDto);

  if (isError(createdMove)) {
    logger.error(createdMove);
    ctx.throw("Failed to create move.");
    return;
  }

  ctx.status = 201;
  ctx.body = createdMove;
});

export { move as moves };
