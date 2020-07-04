import * as t from "io-ts";

export const CreateVideoDtoCodec = t.type({
  youtubeKey: t.string,
});

export type CreateVideoDto = t.TypeOf<typeof CreateVideoDtoCodec>;

export type VideoDto = {
  id: string;
  title: string;
  youtubeKey: string;
  thumbnailUrl: string;
  publishedAt: string;
};
