import { MoveDto, DbMoveDto } from "../Move";
import { MyNode } from "../../types";

export function nodeToMoveDto(moveNode: MyNode<DbMoveDto>): MoveDto {
  // TODO: Need to validate this is what it says it is somehow
  return {
    id: moveNode.properties.id,
    name: moveNode.properties.name,
  };
}
