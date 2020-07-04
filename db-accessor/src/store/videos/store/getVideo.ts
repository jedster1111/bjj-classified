import { VideoDto } from "bjj-common";
import { logger } from "../../../logger";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { isError } from "util";
import { runGetVideo } from "../runs/runGetVideo";

export async function getVideo(id: string): Promise<VideoDto | null | Error> {
  logger.info("Fetching video with id: %s", id);

  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, "READ", (session) =>
    useTransaction(session, (tx) => runGetVideo(tx, id))
  );

  if (isError(result)) return result;

  result === null
    ? logger.info("Video with id %s not found.", id)
    : logger.info("Video with id %s found.", id);
  return result;
}
