import { isError, MoveDto } from "bjj-common";
import { logger } from "../../../logger";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { runGetMoves } from "../runs/runGetMoves";

export async function getMoves(): Promise<MoveDto[] | Error> {
  logger.info("Fetching moves.");

  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, "READ", (session) =>
    useTransaction(session, async (tx) => {
      return await runGetMoves(tx);
    })
  );

  if (isError(result)) return result;

  logger.info("Moves fetched.");
  return result;
}
