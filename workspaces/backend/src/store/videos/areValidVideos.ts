import { VideoStore } from "../../types";
import { isValidVideo } from "./isValidVideo";

export function areValidVideos(videos: unknown[]): videos is VideoStore[] {
  return videos.every(isValidVideo);
}
