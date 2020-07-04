import { DbVideoDto } from "../VideoDtos";
import { logger } from "../../../logger";
import { getDriver } from "../../neo4jDriver";
import { useSession } from "../../useSession";
import { useTransaction } from "../../useTransaction";
import { isError } from "util";
import { runCreateVideo } from "../runs/runCreateVideo";
import { CreateVideoDto } from "bjj-common";
import { uuid } from "uuidv4";
import { getVideoInfo } from "../../../ytApi";

export async function createVideo(
  videoDto: CreateVideoDto
): Promise<DbVideoDto | Error> {
  logger.info("Creating a video.");
  const driver = getDriver();
  if (!driver) return new Error("Db driver does not exist.");

  const videoInfo = await getVideoInfo(videoDto.youtubeKey);
  if (isError(videoInfo)) return videoInfo;

  const result = await useSession(driver, "WRITE", (session) =>
    useTransaction(session, async (tx) => {
      const createdVideo = await runCreateVideo(tx, {
        id: uuid(),
        title: videoInfo.title,
        publishedAt: videoInfo.publishedAt,
        thumbnailUrl: videoInfo.thumbnailUrl,
        youtubeKey: videoInfo.key,
      });
      return createdVideo;
    })
  );

  if (isError(result)) return result;

  logger.info("Video created. %o", result);
  return result;
}
