import { MoveDto } from "bjj-common";
import axios from "axios";

export function getMoves() {
  return axios.get<MoveDto[]>("http://localhost:8000/moves");
}
