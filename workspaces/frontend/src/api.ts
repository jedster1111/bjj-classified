import axios from "axios";
const backendUrl = "http://localhost:8000";

export async function getAthletes(): Promise<string[]> {
  return (await axios.get(`${backendUrl}/athletes`)).data;
}
