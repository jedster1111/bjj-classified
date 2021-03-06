import { getDriver } from "../../neo4jDriver";
import { logger } from "../../../logger";
import { runCreateMove } from "../runs/runCreateMove";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { DbMoveDto } from "../MoveDtos";
import { isError } from "bjj-common";

export async function createMove(
  moveDto: DbMoveDto
): Promise<DbMoveDto | Error> {
  logger.info("Creating a move.");
  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, "WRITE", (session) =>
    useTransaction(session, async (tx) => {
      const createdMove = await runCreateMove(tx, moveDto);
      return createdMove;
    })
  );

  if (isError(result)) return result;

  logger.info("Move created. %o", result);
  return result;
}
