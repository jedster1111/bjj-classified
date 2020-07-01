import { logger } from "../../../logger";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { isError, MoveDto } from "bjj-common";
import { runGetMove } from "../runs/runGetMove";

export async function getMove(id: string): Promise<MoveDto | null | Error> {
  logger.info("Fetching move with id: %s.", id);

  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, "READ", (session) =>
    useTransaction(session, (tx) => runGetMove(tx, id))
  );

  if (isError(result)) return result;

  logger.info("Move with id %s found.", id);
  return result;
}
