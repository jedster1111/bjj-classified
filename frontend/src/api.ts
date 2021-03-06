import {
  MoveDto,
  VideoDto,
  VideoEventDto,
  VideoWithEventsDto,
} from "bjj-common";
import axios from "axios";

export function getMoves() {
  return axios.get<MoveDto[]>("http://localhost:8000/moves");
}

export function getMoveVideos(moveId: string) {
  return axios.get<VideoWithEventsDto[]>(
    `http://localhost:8000/moves/${moveId}/videos`
  );
}

export function getVideo(videoId: string) {
  return axios.get<VideoDto>(`http://localhost:8000/videos/${videoId}`);
}

export function getVideoEvents(videoId: string) {
  return axios.get<VideoEventDto[]>(
    `http://localhost:8000/videos/${videoId}/events`
  );
}
