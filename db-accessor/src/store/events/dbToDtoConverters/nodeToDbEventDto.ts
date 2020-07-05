import { MyNode } from "../../types";
import { DbEventDto } from "../EventDtos";

export function nodeToDbEventDto(videoNode: MyNode<DbEventDto>): DbEventDto {
  const { id } = videoNode.properties;
  return {
    id,
  };
}
