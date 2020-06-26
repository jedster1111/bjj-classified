import { MoveDto, DbMoveDto } from "../Dtos/Move";
import { MyNode } from "../types";

export function nodeToMoveDto(moveNode: MyNode<DbMoveDto>): MoveDto {
  // TODO: Need to validate this is what it says it is somehow
  return {
    name: moveNode.properties.name
  }
}