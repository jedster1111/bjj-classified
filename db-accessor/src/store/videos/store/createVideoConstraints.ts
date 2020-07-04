import { logger } from "../../../logger";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { runGetConstraints } from "../../constraints/run/runGetConstraints";
import { runCreateUniqueVideoYoutubeKeyConstraint } from "../runs/runCreateUniqueVideoYouTubeKeyConstraint";
import { runCreateUniqueVideoIdConstraints } from "../runs/runCreateUniqueVideoIdConstraint";
import { isError } from "util";

export async function createVideoConstraints(): Promise<void | Error> {
  logger.info("Creating Video constraints.");

  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, undefined, (session) =>
    useTransaction(session, async (tx) => {
      logger.info("Creating constraints");
      const constraints = await runGetConstraints(tx);

      logger.info("Existing constraints: %o", [...constraints.values()]);

      if (!constraints.has("uniqueVideoId")) {
        await runCreateUniqueVideoIdConstraints(tx);
      }

      if (!constraints.has("uniqueVideoYoutubeKey")) {
        await runCreateUniqueVideoYoutubeKeyConstraint(tx);
      }
    })
  );

  if (isError(result)) return result;

  logger.listenerCount("Created Video constraints");
}
