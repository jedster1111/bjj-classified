import { VideoDTO } from "../../../types";
import { isValidVideo } from "./isValidVideo";

export function areValidVideos(videos: unknown[]): videos is VideoDTO[] {
  return videos.every(isValidVideo);
}
