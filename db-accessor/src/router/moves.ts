import KoaRouter from "koa-router";
import { isError, createMoveDtoValidator } from "bjj-common";

import { createMove } from "../store/move/store/createMove";
import { getMoves } from "../store/move/store/getMoves";
import { uuid } from "uuidv4";
import { getMove } from "../store/move/store/getMove";

export const movesRoutes = {
  getMoves: "getMoves",
  getMove: "getMove",
  createMove: "createMove",
} as const;

const moves = new KoaRouter();

moves.get(movesRoutes.getMoves, "/", async (ctx) => {
  const fetchedMoves = await getMoves();

  if (isError(fetchedMoves)) {
    ctx.throw("There was an error fetching the moves from the db.");
    return;
  }

  ctx.body = fetchedMoves;
});

moves.get(movesRoutes.getMove, "/:id", async (ctx) => {
  const { id } = ctx.params;
  const fetchedMove = await getMove(id);

  if (isError(fetchedMove)) {
    ctx.throw("There was an error fetching the move from the db.");
    return;
  }

  if (!fetchedMove) {
    ctx.status = 404;
    return;
  }

  ctx.body = fetchedMove;
});

moves.post(movesRoutes.createMove, "/", async (ctx) => {
  const validationResult = createMoveDtoValidator(ctx.request.body);

  if (isError(validationResult)) {
    ctx.throw(400, validationResult);
    return;
  }

  const dbMoveDto = { id: uuid(), ...validationResult };
  const createdMove = await createMove(dbMoveDto);

  if (isError(createdMove)) {
    ctx.throw("Failed to create move.");
    return;
  }

  ctx.status = 201;
  ctx.body = createdMove;
});

export { moves };
