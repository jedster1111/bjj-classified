import { Transaction } from "neo4j-driver";
import { DbVideoDto } from "../VideoDtos";
import { DbEventDto } from "../../events/EventDtos";
import { logger } from "../../../logger";
import { VideoWithEventsDto, CreateVideoEventDto, MoveDto } from "bjj-common";

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

  const reducedResult = queryResult.records.reduce<{
    [videoId: string]: VideoWithEventsDto;
  }>((accum, record) => {
    const video: DbVideoDto = record.get("video").properties;
    const watchableIn: { timestamp: number } = record.get("watchableIn")
      .properties;
    const event: DbEventDto = record.get("event").properties;
    const move: MoveDto = record.get("move").properties;

    const videoDto: VideoWithEventsDto = accum[video.id] || {
      ...video,
      events: [],
    };
    videoDto.events.push({
      ...event,
      timestamp: watchableIn.timestamp,
      moveId: move.id,
    });

    accum[video.id] = videoDto;

    return accum;
  }, {});

  return reducedResult[dbVideoDto.id];
}
