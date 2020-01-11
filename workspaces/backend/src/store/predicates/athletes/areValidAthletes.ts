import { AthleteDTO } from "../../../types";
import { isValidAthlete } from "./isValidAthletes";

export function areValidAthletes(
  athletes: unknown[]
): athletes is AthleteDTO[] {
  return athletes.every(isValidAthlete);
}
