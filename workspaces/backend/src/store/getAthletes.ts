import { Session } from "neo4j-driver/types/v1";
import { hasStringProp } from "../common/validation/hasStringProp";

type Athlete = { name: string };

export async function getAthletes(session: Session): Promise<Athlete[]> {
  const result = await session.run(`MATCH(athletes:Athlete) RETURN athletes`);
  const athletes = result.records.map(record => record.get(0).properties);
  if (!areValidAthletes(athletes))
    throw new Error("Athletes returned did not have the correct properties!");
  return athletes;
}

function areValidAthletes(athletes: unknown[]): athletes is Athlete[] {
  return athletes.every(isValidAthlete);
}

function isValidAthlete(athlete: unknown): athlete is Athlete {
  return hasStringProp(athlete, "name");
}
