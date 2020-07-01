import { DbMoveDto } from "../MoveDtos";
import { MyNode } from "../../types";
import { MoveDto } from "bjj-common";

export function nodeToMoveDto(moveNode: MyNode<DbMoveDto>): MoveDto {
  // TODO: Need to validate this is what it says it is somehow
  return {
    id: moveNode.properties.id,
    name: moveNode.properties.name,
  };
}
