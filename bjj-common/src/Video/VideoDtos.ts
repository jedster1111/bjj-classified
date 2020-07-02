import * as t from "io-ts";

export const CreateVideoDtoCodec = t.type({
  name: t.string,
  url: t.string,
});

export type CreateVideoDto = t.TypeOf<typeof CreateVideoDtoCodec>;

export type VideoDto = {
  id: string;
  name: string;
  url: string;
};
