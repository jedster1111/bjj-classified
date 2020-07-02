import { MyNode } from "../../types";
import { DbVideoDto } from "../VideoDtos";

export function nodeToDbVideoDto(videoNode: MyNode<DbVideoDto>): DbVideoDto {
  const { id, name, url } = videoNode.properties;
  return {
    id,
    name,
    url,
  };
}
