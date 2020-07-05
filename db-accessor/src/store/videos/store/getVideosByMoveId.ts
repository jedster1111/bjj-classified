import { VideoWithEventsDto } from "bjj-common";
import { logger } from "../../../logger";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { runGetVideosByMoveId } from "../runs/runGetVideosByMoveId";
import { isError } from "util";

export async function getVideosByMoveId(
  moveId: string
): Promise<VideoWithEventsDto[] | Error> {
  logger.info("Fetching videos for move with id: %s", moveId);

  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, "WRITE", (session) =>
    useTransaction(session, (tx) => runGetVideosByMoveId(tx, moveId))
  );

  if (isError(result)) return result;

  logger.info("Videos fetched.");
  return result;
}
