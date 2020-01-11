import { AthleteDTO } from "../../../types";
import { hasStringProp } from "../../../common/validation/hasStringProp";

export function isValidAthlete(athlete: unknown): athlete is AthleteDTO {
  return hasStringProp(athlete, "name");
}
