import { AthleteStore } from "../../types";
import { isValidAthlete } from "./isValidAthletes";

export function areValidAthletes(
  athletes: unknown[]
): athletes is AthleteStore[] {
  return athletes.every(isValidAthlete);
}
