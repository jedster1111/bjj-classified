import { Session } from "neo4j-driver/types/v1";
import { resultToData } from "../neo4j/utils/resultToData";
import { VideoDTO } from "../types";
import { areValidVideos } from "./predicates/video/areValidVideos";

export async function getVideos(session: Session): Promise<VideoDTO[]> {
  const result = await session.run(`MATCH(videos:Video) RETURN videos`);
  const videos = resultToData(result);
  if (!areValidVideos(videos))
    throw new Error("Videos returned did not have the correct properties!");
  return videos;
}
