import { Integer } from "neo4j-driver/types/v1";

export type VideoStore = { url: string };

export type VideosResponse = { url: string }[];
export type VideoResponse = {
  url: string;
  events: { time: number; name: string }[];
};
export type VideoDbResponse = {
  url: string;
  time: Integer;
  technique: string;
}[];

export type AthleteStore = { name: string };

export type AthletesResponse = { name: string }[];
