import { google } from "googleapis";
import { logger } from "./logger";

const youtubeApiKey = process.env.YOUTUBE_API_KEY;

if (!youtubeApiKey)
  logger.error(
    "No Youtube api key value found, have you set the YOUTUBE_API_KEY environment variable?"
  );

export const ytApi = google.youtube({ version: "v3", auth: youtubeApiKey });

type YoutubeVideoInfo = {
  key: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
};

export async function getVideoInfo(
  youtubeKey: string
): Promise<YoutubeVideoInfo | Error> {
  try {
    logger.info(
      "Fetching information about Youtube video with key: %s",
      youtubeKey
    );
    const response = await ytApi.videos.list({
      part: ["snippet"],
      id: [youtubeKey],
    });

    const snippet = response.data.items?.[0].snippet;

    const thumbnailUrl = snippet?.thumbnails?.high?.url;
    const title = snippet?.title;
    const publishedAt = snippet?.publishedAt;

    assertPropertyExists("thumbnailUrl", thumbnailUrl);
    assertPropertyExists("videoTitle", title);
    assertPropertyExists("publishedAt", publishedAt);

    return {
      key: youtubeKey,
      thumbnailUrl,
      title,
      publishedAt,
    };
  } catch (e) {
    logger.error(
      e as Error,
      "Failed to fetch info for video with key %s",
      youtubeApiKey
    );
    return e;
  }
}

function assertPropertyExists<T>(
  propertyName: string,
  propertyValue: T
): asserts propertyValue is NonNullable<T> {
  if (!propertyValue)
    throw new Error(
      `A youtube video property, ${propertyName}, was not found!`
    );
}
