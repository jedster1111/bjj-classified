import { QueryResult } from "neo4j-driver";
import { DbVideoDto } from "./videos/VideoDtos";
import { DbEventDto } from "./events/EventDtos";
import { VideoWithEventsDto, MoveDto } from "bjj-common";

type VideoWithEventsDtoByVideoId = {
  [videoId: string]: VideoWithEventsDto;
};

export function queryResultToVideosById(
  queryResult: QueryResult
): VideoWithEventsDtoByVideoId {
  return queryResult.records.reduce<VideoWithEventsDtoByVideoId>(
    (accum, record) => {
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
    },
    {}
  );
}
