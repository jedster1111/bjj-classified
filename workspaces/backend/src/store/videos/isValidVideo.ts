import { VideoStore } from "../../types";
import { hasStringProp } from "../../common/validation/hasStringProp";

export function isValidVideo(video: unknown): video is VideoStore {
  return hasStringProp(video, "url");
}
