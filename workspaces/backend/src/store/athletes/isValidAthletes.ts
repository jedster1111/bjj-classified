import { AthleteStore } from "../../types";
import { hasStringProp } from "../../common/validation/hasStringProp";

export function isValidAthlete(athlete: unknown): athlete is AthleteStore {
  return hasStringProp(athlete, "name");
}
