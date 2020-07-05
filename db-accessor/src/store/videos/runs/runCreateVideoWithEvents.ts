import { Transaction } from "neo4j-driver";
import { DbVideoDto } from "../VideoDtos";
import { DbEventDto } from "../../events/EventDtos";
import { logger } from "../../../logger";
import { VideoWithEventsDto } from "bjj-common";

export async function createVideoWithEvents(
  tx: Transaction,
  dbVideoDto: DbVideoDto,
  events: { id: string; timestamp: number }[]
): Promise<VideoWithEventsDto> {
  logger.info("Writing video to database with events");

  const queryResult = await tx.run(
    `
    CREATE (video:Video $videoDto)
    FOREACH (
      eventDto in $events |
      CREATE (video)<-[:WATCHABLE_IN {timestamp: eventDto.timestamp}]-(event:Event {id: eventDto.id})
    )
    WITH video
    MATCH (video)<-[watchableIn:WATCHABLE_IN]-(event:Event)
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

    const videoDto: VideoWithEventsDto = accum[video.id] || {
      ...video,
      events: [],
    };
    videoDto.events.push({ ...event, timestamp: watchableIn.timestamp });

    accum[video.id] = videoDto;

    return accum;
  }, {});

  return reducedResult[dbVideoDto.id];
}
