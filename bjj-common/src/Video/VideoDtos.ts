import * as t from "io-ts";
import { MoveDto } from "../Move/MoveDtos";

export const CreateVideoEventsCodec = t.type({
  timestamp: t.number,
  moveId: t.string,
});

export const CreateVideoDtoCodec = t.type({
  youtubeKey: t.string,
  events: t.array(CreateVideoEventsCodec),
});

export type CreateVideoDto = t.TypeOf<typeof CreateVideoDtoCodec>;
export type CreateVideoEventDto = t.TypeOf<typeof CreateVideoEventsCodec>;

export type VideoEventDto = {
  id: string;
  timestamp: number;
  move: MoveDto;
};

export type VideoDto = {
  id: string;
  title: string;
  youtubeKey: string;
  thumbnailUrl: string;
  publishedAt: string;
};

export type VideoWithEventsDto = VideoDto & {
  events: VideoEventDto[];
};
