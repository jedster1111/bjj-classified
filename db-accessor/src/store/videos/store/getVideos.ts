import { logger } from "../../../logger";
import { VideoDto } from "bjj-common";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { isError } from "util";
import { runGetVideos } from "../runs/runGetVideos";

export async function getVideos(): Promise<VideoDto[] | Error> {
  logger.info("Fetching videos.");

  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const result = await useSession(driver, "READ", (session) =>
    useTransaction(session, async (tx) => {
      return await runGetVideos(tx);
    })
  );

  if (isError(result)) return result;

  logger.info("Videos fetched.");
  return result;
}
