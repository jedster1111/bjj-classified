import { logger } from "../../../logger";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { runGetConstraints } from "../../constraints/run/runGetConstraints";
import { runCreateUniqueMoveIdConstraints } from "../runs/runCreateUniqueMoveIdConstraint";
import { runCreateUniqueMoveNameConstraints } from "../runs/runCreateUniqueMoveNameConstraint";
import { isError } from "bjj-common";

export async function createMoveConstraints(): Promise<void | Error> {
  logger.info("Creating Move constraints.");

  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, "WRITE", (session) =>
    useTransaction(session, async (tx) => {
      logger.info("Creating constraints");
      const constraints = await runGetConstraints(tx);

      logger.info("Existing constraints: %o", [...constraints.values()]);

      if (!constraints.has("uniqueMoveId")) {
        await runCreateUniqueMoveIdConstraints(tx);
      }
      if (!constraints.has("uniqueMoveName"))
        await runCreateUniqueMoveNameConstraints(tx);
    })
  );

  if (isError(result)) return result;

  logger.info("Created Move constraints.");
}
