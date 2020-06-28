import * as t from "io-ts";

export type MoveDto = {
  name: string;
}

export const CreateMoveDtoCodec = t.type({
  name: t.string
})

export type CreateMoveDto = t.TypeOf<typeof CreateMoveDtoCodec>

export type DbMoveDto = {
  name: string;
}
