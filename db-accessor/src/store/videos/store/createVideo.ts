import { DbVideoDto } from "../VideoDtos";
import { logger } from "../../../logger";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { isError } from "util";
import { runCreateVideo } from "../runs/runCreateVideo";

export async function createVideo(
  videoDto: DbVideoDto
): Promise<DbVideoDto | Error> {
  logger.info("Creating a video.");
  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, "WRITE", (session) =>
    useTransaction(session, async (tx) => {
      const createdMove = await runCreateVideo(tx, videoDto);
      return createdMove;
    })
  );

  if (isError(result)) return result;

  logger.info("Video created. %o", result);
  return result;
}
