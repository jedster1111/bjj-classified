import { logger } from "../../../logger";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { isError } from "bjj-common";
import { runGetConstraints } from "../run/runGetConstraints";

export async function getConstraints(): Promise<Set<string> | Error> {
  logger.info("Fetching constraints.");
  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, "WRITE", (session) =>
    useTransaction(session, runGetConstraints)
  );

  if (isError(result)) return result;

  logger.info("Got constraints. %o", result);
  return result;
}
