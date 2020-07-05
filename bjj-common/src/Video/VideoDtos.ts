import * as t from "io-ts";

export const CreateVideoEvents = t.type({
  timestamp: t.number,
});

export const CreateVideoDtoCodec = t.type({
  youtubeKey: t.string,
  events: t.array(CreateVideoEvents),
});

export type CreateVideoDto = t.TypeOf<typeof CreateVideoDtoCodec>;

export type VideoEvent = {
  id: string;
  timestamp: number;
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
