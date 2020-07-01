import * as t from "io-ts";

export const CreateMoveDtoCodec = t.type({
  name: t.string,
});

export type CreateMoveDto = t.TypeOf<typeof CreateMoveDtoCodec>;

export type MoveDto = {
  id: string;
  name: string;
};
