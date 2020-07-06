import { MoveDto, VideoWithEventsDto } from "bjj-common";
import axios from "axios";

export function getMoves() {
  return axios.get<MoveDto[]>("http://localhost:8000/moves");
}

export function getMoveVideos(moveId: string) {
  return axios.get<VideoWithEventsDto[]>(
    `http://localhost:8000/moves/${moveId}/videos`
  );
}
