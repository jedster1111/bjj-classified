import { Transaction } from "neo4j-driver";
import { DbVideoDto } from "../VideoDtos";
import { logger } from "../../../logger";
import { VideoWithEventsDto, CreateVideoEventDto } from "bjj-common";
import { queryResultToVideosById } from "../../queryResultToVideosById";

export async function runCreateVideoWithEvents(
  tx: Transaction,
  dbVideoDto: DbVideoDto,
  events: CreateVideoEventDto[]
): Promise<VideoWithEventsDto> {
  logger.info("Writing video to database with events");

  const queryResult = await tx.run(
    `
    UNWIND $events as eventDto
    MATCH (move:Move {id: eventDto.moveId})
    MERGE (video:Video {
      id: $videoDto.id,
      title: $videoDto.title,
      youtubeKey: $videoDto.youtubeKey,
      thumbnailUrl: $videoDto.thumbnailUrl,
      publishedAt: $videoDto.publishedAt
    })
    CREATE (video)<-[watchableIn:WATCHABLE_IN {timestamp: eventDto.timestamp}]-(event:Event {id: eventDto.id})
    CREATE (move)<-[:EXAMPLE_OF]-(event)
    RETURN *
  `,
    {
      videoDto: dbVideoDto,
      events,
    }
  );

  const reducedResult = queryResultToVideosById(queryResult);

  return reducedResult[dbVideoDto.id];
}
