import { isError, VideoEventDto } from "bjj-common";
import { logger } from "../../../logger";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { runGetVideoEvents } from "../runs/runGetVideoEvents";

export async function getVideoEvents(
  id: string
): Promise<VideoEventDto[] | null | Error> {
  logger.info("Fetching events for video with id: %s", id);

  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, "READ", (session) =>
    useTransaction(session, (tx) => runGetVideoEvents(tx, id))
  );

  if (isError(result)) return result;

  result === null
    ? logger.info("Events for video with id %s not found.", id)
    : logger.info("Events for Video with id %s found.", id);

  return result;
}
