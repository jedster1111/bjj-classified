// import { createMove } from "./runs/createMove";

import { getDriver } from "../neo4jDriver"
import { logger } from "../../logger";
import { runCreateMove } from "./runs/runCreateMove";
import { useSession } from "../useSession";
import { useTransaction } from "../useTransaction";
import { MoveDto, CreateMoveDto } from "../Dtos/Move";

export async function createMove(createMoveDto: CreateMoveDto): Promise<MoveDto | Error> {
  logger.info("Creating a move.")
  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.")

  const result = await useSession(driver, "WRITE", (session) => 
    useTransaction(session, async (tx) => {
      const createdMove = await runCreateMove(tx, createMoveDto);
      return createdMove;
    })
  )

  if (result instanceof Error) {
    logger.error("Failed to create a move.")
    return result;
  }

  logger.info("Move created. %o", result)
  return result;
}
