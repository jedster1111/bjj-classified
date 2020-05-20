import axios from "axios";
const backendUrl = "http://localhost:8000";

async function makeGetRequest<T>(query: string): Promise<T> {
  return await (await axios.get(`${backendUrl}/${query}`)).data;
}

export async function getAthletes(): Promise<string[]> {
  return await makeGetRequest("athletes");
}
export async function getVideos(): Promise<string[]> {
  return await makeGetRequest("videos");
}
export async function getVideo(): Promise<{
  url: string;
  events: { name: string; time: number }[];
}> {
  return await makeGetRequest("video");
}
