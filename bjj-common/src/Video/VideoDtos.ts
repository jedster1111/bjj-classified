import * as t from "io-ts";

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

export type VideoEvent = {
  id: string;
  timestamp: number;
  moveId: string;
};

export type VideoDto = {
  id: string;
  title: string;
  youtubeKey: string;
  thumbnailUrl: string;
  publishedAt: string;
};

export type VideoWithEventsDto = VideoDto & {
  events: VideoEvent[];
};
