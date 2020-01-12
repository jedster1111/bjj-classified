import { VideoDTO } from "../../types";
import { hasStringProp } from "../../common/validation/hasStringProp";

export function isValidVideo(video: unknown): video is VideoDTO {
  return hasStringProp(video, "url");
}
