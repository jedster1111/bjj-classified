import { MyNode } from "../../types";
import { DbVideoDto } from "../VideoDtos";

export function nodeToDbVideoDto(videoNode: MyNode<DbVideoDto>): DbVideoDto {
  const {
    id,
    publishedAt,
    thumbnailUrl,
    title,
    youtubeKey,
  } = videoNode.properties;
  return {
    id,
    youtubeKey,
    publishedAt,
    thumbnailUrl,
    title,
  };
}
